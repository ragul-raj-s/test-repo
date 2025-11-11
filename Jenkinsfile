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
                    // useExistingNode: true,
                    // existingInstanceId: 'i-0f66384461d9f74ad',
                    // existingNodeName: 'unreal-build-160-1762429691062',
                    // skipCheckout: true,
                    // skipBuild: true,
                        
                    instanceType: 'c6i.8xlarge',
                    amiId: 'ami-0a9975464df03b84e',
                    awsRegion: 'us-east-1',
                    subnetId: 'subnet-e0b930ad',
                    securityGroupIds: ['sg-a55cbf85'],
                    keyName: 'learning-key',
                    iamInstanceProfile: 'arn:aws:iam::511345548959:instance-profile/ayelet-ec2-instance-profile-role',
                    snapshotConfigs: [
                        [
                            snapshotId: 'snap-02fc82895afb49aa7',
                            deviceName: '/dev/sdf',
                            volumeType: 'gp3',
                            iops: 5000,
                            order: 1
                        ],
                        [
                            snapshotId: 'snap-0c9a6bfbc8fa18b83',
                            deviceName: '/dev/sdg',
                            volumeType: 'gp3',
                            iops: 3000,
                            volumeSize: 500,
                            order: 2
                        ]
                    ],
                
                    // Jenkins Swarm Configuration (runs on C: drive - always available)
                    jenkinsUrl: 'https://flavia-unforlorn-unrubrically.ngrok-free.dev',
                
                    // SCM Configuration
                    // scmType: 'git',
                    // gitUrl: 'https://github.com/ayeletstudioindia/ue5-test.git',
                    // gitPATCredentialId: 'github-pat',
                    // gitBranch: 'main',
                    // gitSubmodules: true,
                    // gitLFS: true,
                    // gitShallowClone: true,
                    // gitCloneDepth: 1,
                    // cleanWorkspace: true,

                    scmType: 'plasticscm',
                    plasticServer: 'ayeletstudio@cloud',
                    plasticRepository: 'UETCIIPOC',
                    plasticBranch: '/main/Development',
                    plasticCredentials: 'plastic-scm-credentials',
                
                    // Unreal Engine Configuration
                    platform: 'Win64',
                    configuration: 'Development',
                
                    enginePath: 'D:/Engine/UnrealEngine_5_6/Windows',
                    projectPath: "E:/workspace/${env.JOB_NAME}/POC/POC.uproject",
                    runTests: false,
                    ignoreExitCode1: true,
                
                    // S3 Configuration
                    s3Bucket: 'speedrun-ci-tf-state',
                    s3ArtifactBucket: 'speedrun-artifacts',
                    s3BuildLogBucket: 'speedrun-log-artifacts',
                
                    // Backend API Configuration
                    backendApiUrl: 'https://unexposable-marquerite-carpologically.ngrok-free.dev',
                ])
                }
            }
        }
    }
}
