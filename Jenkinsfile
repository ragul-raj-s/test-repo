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
                    instanceType: 't3.large',
                    amiId: 'ami-0cfb5dc6083f5748e',
                    awsRegion: 'us-east-1',
                    subnetId: 'subnet-e0b930ad',
                    securityGroupIds: ['sg-a55cbf85'],
                    keyName: 'learning-key',
                    iamInstanceProfile: 'arn:aws:iam::511345548959:instance-profile/Speedrun-test-ec2-role',
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
                            order: 2
                        ]
                    ],
                    platform: 'Win64',
                    configuration: 'Development',
                    s3Bucket: 'my-unreal-builds',
                    backendApiUrl: 'http://localhost:3000',
                    backendApiKey: credentials('backend-api-key'),
                    jenkinsUrl: 'https://unexposable-marquerite-carpologically.ngrok-free.dev',
                    jenkinsUser: 'ragul',
                    jenkinsApiToken: credentials('jenkins-api-token'),
                    s3Bucket: 'speedrun-ci-tf-state',
                    scmType: 'git',
                    gitUrl: 'git@github.com:ayeletstudioindia/ue5-test.git',
                    gitBranch: 'main',
                    gitCredentials: 'github-ue5-ssh',
                    gitSubmodules: true,
                    gitLFS: true,
                    gitShallowClone: true,
                    gitCloneDepth: 1,
                    cleanWorkspace: true,
                    platform: 'Win64',
                    configuration: 'Development',
                    enginePath: 'D:/Engine/UnrealEngine_5_6/Windows/Engine/Build/BatchFiles/RunUAT.bat',
                    projectPath: 'MyProject2/MyProject2.uproject',
                    runTests: false,
                ])
                }
            }
        }
    }
}
