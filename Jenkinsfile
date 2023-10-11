pipeline {
  agent any
  
  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }
  
  tools {
    nodejs "meuNode"
  }
  
  environment {
    HEROKU_API_KEY = credentials('heroku-api-key')
    IMAGE_NAME = 'taniziafagundes/gittech'
    IMAGE_TAG = 'latest'
    APP_NAME = 'gittech'
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
    stage('Login') {
      steps {
        sh 'echo $HEROKU_API_KEY | docker login --username=_ --password-stdin registry.heroku.com'
      }
    }
    stage('Push to Heroku registry') {
      steps {
        sh '''
          docker tag $IMAGE_NAME:$IMAGE_TAG registry.heroku.com/$APP_NAME/web
          docker push registry.heroku.com/$APP_NAME/web
        '''
      }
    }
    stage('Release the image') {
      steps {
        sh '''
          heroku container:release web --app=$APP_NAME
        '''
      }
    }  
    stage('Test') { 
      steps {
        sh 'docker run registry.heroku.com/gittech/web sh -c "cd /app && npm test"' 
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
  }
}
