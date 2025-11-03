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
                        // EC2 Configuration
                        instanceType: 't3.large',
                        amiId: 'ami-0cfb5dc6083f5748e',
                        awsRegion: 'us-east-1',
                        subnetId: 'subnet-e0b930ad',
                        securityGroupIds: ['sg-a55cbf85'],
                        keyName: 'learning-key',
                        iamInstanceProfile: 'arn:aws:iam::511345548959:role/ayelet-ec2-instance-profile-role',
                        snapshotConfigs: [
                            [
                                snapshotId: 'snap-02fc82895afb49aa7',
                                deviceName: '/dev/sdf',  // Will be D: drive
                                volumeType: 'gp3',
                                iops: 5000,
                                order: 1
                            ],
                            [
                                snapshotId: 'snap-0c9a6bfbc8fa18b83',
                                deviceName: '/dev/sdg',  // Will be E: drive
                                volumeType: 'gp3',
                                iops: 3000,
                                order: 2
                            ]
                        ],
                    
                        // Jenkins Swarm Configuration (runs on C: drive - always available)
                        jenkinsUrl: 'https://flavia-unforlorn-unrubrically.ngrok-free.dev',
                        jenkinsUser: 'ragul',
                        jenkinsApiToken: credentials('jenkins-api-token'),
                        checkoutDir: 'E:/TestRepo',
                    
                        // SCM Configuration
                        scmType: 'git',
                        gitUrl: 'https://github.com/ayeletstudioindia/ue5-test.git',
                        gitBranch: 'main',
                        gitCredentials: 'github-ue5-ssh',
                        gitSubmodules: true,
                        gitLFS: true,
                        gitShallowClone: true,
                        gitCloneDepth: 1,
                        cleanWorkspace: true,
                        gitPATCredentialId: 'github-pat',
                    
                        // Unreal Engine Configuration
                        platform: 'Win64',
                        configuration: 'Development',
                    
                        enginePath: 'D:/Engine/UnrealEngine_5_6/Windows',
                        projectPath: "E:/workspace/${env.JOB_NAME}/MyProject2/MyProject2.uproject",
                        runTests: false,
                        ignoreExitCode1: true,
                    
                        // S3 Configuration
                        s3Bucket: 'speedrun-ci-tf-state',
                        s3ArtifactBucket: 'speedrun-artifacts',
                    
                        // Backend API Configuration
                        backendApiUrl: 'http://localhost:3000',
                        backendApiKey: credentials('backend-api-key')
                    ])

                }
            }
        }
    }
}
