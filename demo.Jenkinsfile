pipeline {

  agent any

  options {
    ansiColor('xterm')
  }

  environment {
    BUILD_TARGET = 'demo'
  }

  stages {

    stage('Notify') {
      steps {
        slackSend (message: "Build Started - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)", color: "good")
      }
    }

    stage('Build') {
      steps {
        sh './build.sh'
      }
    }

    stage('Copy files') {
      steps {
        sh 'rm -rf /opt/evkk/* && cp -r ./build/* /opt/evkk'
      }
    }

    stage('Deploy') {
      steps {
        sh 'cd /opt/evkk && ./run.sh'
      }
    }

  }

  //post {

  //  success {

  //  }

  //  failure {

  //  }

  //}

}
