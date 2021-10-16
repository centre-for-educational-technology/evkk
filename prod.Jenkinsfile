pipeline {

  agent any

  options {
    ansiColor('xterm')
  }

  environment {
    BUILD_TARGET = 'prod'
  }

  stages {

    stage('Build') {
      steps {
        sh './build.sh'
      }
    }

    stage('Copy files') {
      steps {
        sshagent (credentials: ['deploy']) {
          sh "scp -o StrictHostKeyChecking=no -r ./build/* evkk@praktika2.cs.tlu.ee:/opt/evkk"
        }
      }
    }

    stage('Deploy') {
      steps {
        sshagent (credentials: ['deploy']) {
          sh "ssh -o StrictHostKeyChecking=no evkk@praktika2.cs.tlu.ee 'docker system prune -f && cd /opt/evkk/ && ./run.sh'"
        }
      }
    }

  }

}
