node('agent-node-test') {

  env.NODE_ENV = 'development'

  def nodeHome = tool 'NodeJS24'
  env.PATH = "${nodeHome}/bin:${env.PATH}"

  try {
    stage('Checkout') {
      echo 'Cloning the repo...'
      checkout scm
    }

    stage('Install Dependencies') {
      echo 'Installing dependencies...'
      sh 'npm install'
    }

    stage('Run Tests') {
      echo 'Running tests...'
      sh 'npm test'
    }

    stage('Build App') {
      echo 'Building the app...'
      sh 'npm run build'
    }

    stage('Done') {
      echo 'Build finished successfully!'
    }

    echo 'SUCCESS: Pipeline completed!'
  } catch (err) {
    echo "ERROR: Pipeline failed! Reason: ${err}"
    currentBuild.result = 'FAILURE'
    throw err
  }
}
