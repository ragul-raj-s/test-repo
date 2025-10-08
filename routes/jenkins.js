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

const PIPELINE_NAME = 'test_job_01';

// Route to trigger Jenkins pipeline
router.post('/run-pipeline', async (req, res) => {
  try {
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

module.exports = router;
