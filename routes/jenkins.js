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

// Route to trigger Jenkins pipeline
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
