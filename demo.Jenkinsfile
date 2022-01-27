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
        slackSend (message: "Build Started - ${env.JOB_NAME} ${env.BUILD_NUMBER}: ${env.BRANCH_NAME} (<${env.BUILD_URL}|Jenkins>)", color: "good")
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

  post {

    success {
      slackSend (message: "Build Success - ${env.JOB_NAME} ${env.BUILD_NUMBER}: ${env.BRANCH_NAME} (<http://pratkika1.cs.tlu.ee:9999|pratkika1.cs.tlu.ee>)", color: "good")
    }

    failure {
      slackSend (message: "Build Failure - ${env.JOB_NAME} ${env.BUILD_NUMBER}: ${env.BRANCH_NAME} (<${env.BUILD_URL}|Jenkins>)", color: "danger")
    }

  }

}
