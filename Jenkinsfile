@Library('speedrun-shared-library@feature/revamped-library-code-testing') _

pipeline {
    agent any
    
    environment {
        AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
        AWS_DEFAULT_REGION = 'us-east-1'
    }
    
    stages {
        stage('Build with AWS') {
            steps {
                script {
                    buildUnrealGameWithAWS([
                        useExistingNode: true,
                        existingNodeName: 'unreal-build-124-1762175358402',
                        existingInstanceId: 'i-0abc123def456789',
                        skipCheckout: true,
                        skipBuild: true,
                        archivePath: 'E:/workspace/test_job_02/Build',
                        s3Bucket: 'speedrun-artifacts',
                        s3ArtifactBucket: 'speedrun-artifacts',
                        awsRegion: 'us-east-1'.
                        failOnS3Error: true
                    ])
                }
            }
        }
    }
}
