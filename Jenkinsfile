pipeline {
  agent any

  tools {
    nodejs "NodeJS24"
  }

  environment {
    NODE_ENV = 'development'
  }

  stages {
    stage('Checkout') {
      steps {
        echo '🔄 Cloning the repo...'
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        echo '📦 Installing dependencies...'
        sh 'npm install'
      }
    }

    stage('Run Tests') {
      steps {
        echo '🧪 Running tests...'
        sh 'npm test'
      }
    }

    stage('Build App') {
      steps {
        echo '🏗️ Building the app...'
        sh 'npm run build'
      }
    }

    stage('Done') {
      steps {
        echo '✅ Build finished successfully!'
      }
    }
  }

  post {
    success {
      echo '🎉 SUCCESS: Pipeline completed!'
    }
    failure {
      echo '❌ ERROR: Pipeline failed!'
    }
  }
}
