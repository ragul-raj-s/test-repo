@Library('speedrun-shared-library@feature/revamped-library-code-testing') _

buildUnrealGameWithAWS([
    instanceType: 't3.micro',
    amiId: 'ami-0cfb5dc6083f5748e',
    awsRegion: 'us-east-1',
    snapshotTags: [
        'Environment': 'Production',
        'Game': 'MyGame',
        'Type': 'UnrealEngine'
    ],
    platform: 'Win64',
    configuration: 'Development',
    s3Bucket: 'my-unreal-builds',
    backendApiUrl: 'http://localhost:3000',
    backendApiKey: credentials('backend-api-key')
])
