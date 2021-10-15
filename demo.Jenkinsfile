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

  }

}
