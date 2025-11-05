const express = require('express');
const router = express.Router();
const Jenkins = require('jenkins');
const dotenv = require('dotenv');
dotenv.config();

// Jenkins config
const jenkins = new Jenkins({
    baseUrl: process.env.JENKINS_BASE_URL || `http://${process.env.JENKINS_USER}:${process.env.JENKINS_API_TOKEN}@localhost:8080`,
    crumbIssuer: true,
    promisify: true
});

const PIPELINE_MAP = {
    "dev": "test_job_01",
    "main": "test_job_02",
};

// Route to trigger Jenkins pipeline based on branch
router.post('/run-pipeline', async (req, res) => {
    try {
        const event = req.headers["x-github-event"];
        if (event !== "push") {
            return res.status(200).json({ message: "Ignored non-push event" });
        }
        const branch = req.body.ref.split('/').pop();
        const PIPELINE_NAME = PIPELINE_MAP[branch];
        if (!PIPELINE_NAME) {
            return res.status(200).json({ error: 'No pipeline configured for this branch' });
        }

        await jenkins.job.build(PIPELINE_NAME);
        console.log(`Triggered pipeline ${PIPELINE_NAME}`);
        res.status(200).json({
            success: true,
            message: `Build for job ${PIPELINE_NAME} successfully queued.`,
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        res.status(500).json({ error: 'Unexpected error triggering pipeline' });
    }
});

// UPDATED: Route to receive build artifact update data with separate archive paths
router.post('/build-artifact-update', async (req, res) => {
    try {
        const { run_id, name, type, archive_file_path, archive_log_path } = req.body;

        // Validate required fields
        if (!run_id || !name || !type || !archive_file_path || !archive_log_path) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields',
                required: ['run_id', 'name', 'type', 'archive_file_path', 'archive_log_path'],
                received: req.body
            });
        }

        // Parse S3 paths to extract bucket and key
        const parseS3Path = (s3Path) => {
            if (!s3Path || !s3Path.startsWith('s3://')) {
                return { bucket: null, key: null };
            }
            const parts = s3Path.replace('s3://', '').split('/');
            return {
                bucket: parts[0],
                key: parts.slice(1).join('/')
            };
        };

        const buildArchive = parseS3Path(archive_file_path);
        const logArchive = parseS3Path(archive_log_path);

        // Log the received data with enhanced formatting
        const timestamp = new Date().toISOString();
        console.log('\n' + '='.repeat(70));
        console.log(`[${timestamp}] BUILD ARTIFACT UPDATE RECEIVED`);
        console.log('='.repeat(70));
        console.log(`Run ID:              ${run_id}`);
        console.log(`Job Name:            ${name}`);
        console.log(`Type:                ${type}`);
        console.log(`Archive File Path:   ${archive_file_path}`);
        console.log(`Archive Log Path:    ${archive_log_path}`);
        console.log('='.repeat(70));
        console.log('\nS3 Details:');
        console.log('  Build Artifacts:');
        console.log(`    Bucket: ${buildArchive.bucket}`);
        console.log(`    Key:    ${buildArchive.key}`);
        console.log('  Log Artifacts:');
        console.log(`    Bucket: ${logArchive.bucket}`);
        console.log(`    Key:    ${logArchive.key}`);
        console.log('='.repeat(70) + '\n');

        // Optional: Store in database here
        // await storeBuildArtifact({ run_id, name, type, archive_file_path, archive_log_path, timestamp });

        res.status(200).json({
            success: true,
            message: 'Build artifact update received successfully',
            data: {
                run_id,
                name,
                type,
                archive_file_path,
                archive_log_path,
                s3_details: {
                    build: buildArchive,
                    logs: logArchive
                },
                received_at: timestamp
            }
        });

    } catch (err) {
        console.error('Error processing build artifact update:', err);
        res.status(500).json({
            success: false,
            error: 'Error processing build artifact update',
            details: err.message
        });
    }
});

router.get('/pipelines', async (req, res) => {
    try {
        const jobs = await jenkins.job.list();
        jobs.forEach(job => {
            console.log(`- ${job.name} (${job.url})`);
        });
        res.status(200).json(jobs);
    } catch (err) {
        console.error('Error fetching jobs:', err);
        res.status(500).json({ error: 'Error fetching jobs' });
    }
});

router.get('/pipeline/:id', async (req, res) => {
    try {
        const jobName = req.params.id;
        const jobInfo = await jenkins.job.get(jobName);
        res.status(200).json(jobInfo);
    } catch (err) {
        console.error('Error fetching job info:', err);
        res.status(500).json({ error: 'Error fetching job info' });
    }
});

module.exports = router;