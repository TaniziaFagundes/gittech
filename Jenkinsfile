pipeline {
  agent any
  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }
  tools {
    nodejs "meuNode"
  }
  environment {
    IMAGE_NAME = 'taniziafagundes/gittech'
    IMAGE_TAG = 'latest'
  }
  stages {
    stage('Node') {
      steps {
        sh "which node"
        sh "node --version"
      }
    }
    
    stage('Build') {
      steps {
        sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
      }
    }
    
     stage('Test') { 
      steps {
        sh 'npm test' 
      }
    }
  }
  post {
    success {
      echo 'Build successful!'
    }
    failure {
      echo 'Build failed!'
    }
    always {
      sh 'docker logout'
    }
  }
}