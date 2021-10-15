pipeline {

  agent any

  environment {
    BUILD_TARGET = 'demo'
  }

  stages {

    stage('Build') {
      steps {
        sh './build.sh'
      }
    }

    stage('Copy files') {
      steps {
        sh 'cp -r ./build/* /opt/evkk'
      }
    }

    stage('Deploy') {
      steps {
        sh 'cd /opt/evkk && ./run.sh'
      }
    }

  }

}
