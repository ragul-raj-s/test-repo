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
                        existingNodeName: 'unreal-build-131-1762242290891',
                        existingInstanceId: 'i-0d9b15a8c6ec9492e',
                        skipCheckout: true,
                        skipBuild: true,
                        archivePath: 'E:/workspace/test_job_02/Build',
                        s3Bucket: 'speedrun-artifacts',
                        s3BuildLogBucket: 'speedrun-log-artifacts',
                        s3ArtifactBucket: 'speedrun-artifacts',
                        awsRegion: 'us-east-1',
                        failOnS3Error: true,
                        backendApiUrl: 'https://unexposable-marquerite-carpologically.ngrok-free.dev',
                    ])
                }
            }
        }
    }
}
