def getBuildTarget() {
  def branch = env.GIT_BRANCH
  def name = branch.substring(branch.indexOf('/') + 1)
  if (name == 'master') return 'prod';
  if (name == 'dev') return 'demo';
  throw new Exception('Invalid build target: ' + branch)
}

pipeline {

  agent any

  environment {
    BUILD_TARGET = getBuildTarget()
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
          sh "scp -o StrictHostKeyChecking=no -r ./build/* evkk@praktika2.cs.tlu.ee:/opt/evkk2"
        }
      }
    }

    stage('Deploy') {
      steps {
        sshagent (credentials: ['deploy']) {
          sh "ssh -o StrictHostKeyChecking=no evkk@praktika2.cs.tlu.ee 'cd /opt/evkk2/ && ./run.sh'"
        }
      }
    }

  }

}

/*

  pipeline {

    agent any

    parameters {
      string(defaultValue: "dev", description: "Branch to check out", name: "branch")
      choice(choices: ["demo", "prod"], description: "Environment to build", name: "env_name")
    }

    stages {

      stage("Clone sources") {
        steps {
          git url: "https://github.com/centre-for-educational-technology/evkk.git", branch: "${params.branch}"
        }
      }

      stage("Cleanup build") {
        steps {
          dir ("./dist") {deleteDir()}
          dir ("./ui/build") {deleteDir()}
        }
      }

      stage("Build") {
        steps {
          sh "./gradlew bootJar"
          sh "yarn --cwd=./ui install && yarn --cwd=./ui build && mv ./ui/build/ ./dist/ui"
        }
      }

      stage("Copy lib") {
        steps {
          sh "cp -r ./lib/ ./dist/lib"
        }
      }

      stage("Copy conf") {
        steps {
          sh "mkdir -p ./dist/conf/ && find ./conf/ -type f -name \"${params.env_name}_*.env\" -exec cp {} ./dist/conf/ \\;"
          dir ("./dist/conf") {
            sh "for file in ${params.env_name}_*; do mv \"\$file\" \"\${file#${params.env_name}_}\"; done;"
          }
        }
      }

      stage("Stop services") {
        steps {
          sshagent (credentials: ['deploy']) {
            sh "ssh -o StrictHostKeyChecking=no evkk@127.0.0.1 'sudo systemctl stop evkkapi.service'"
            sh "ssh -o StrictHostKeyChecking=no evkk@127.0.0.1 'sudo systemctl stop evkkdaemon.service'"
            sh "ssh -o StrictHostKeyChecking=no evkk@127.0.0.1 'sudo systemctl stop evkkcharcounter.service'"
            sh "ssh -o StrictHostKeyChecking=no evkk@127.0.0.1 'sudo systemctl stop evkkclusterfinder.service'"
          }
        }
      }

      stage("Remove current services") {
        steps {
          sshagent (credentials: ['deploy']) {
            sh "ssh -o StrictHostKeyChecking=no evkk@127.0.0.1 'rm -rf /opt/evkk/*'"
          }
        }
      }

      stage("Copy files to server") {
        steps {
          sshagent (credentials: ['deploy']) {
            sh "scp -o StrictHostKeyChecking=no -r ./dist/* evkk@127.0.0.1:/opt/evkk"
          }
        }
      }

      stage("Run database migrations") {
        steps {
          sshagent (credentials: ['deploy']) {
            sh "ssh -o StrictHostKeyChecking=no evkk@127.0.0.1 'java -DenvFiles=/opt/evkk/conf/db.env,/opt/evkk/conf/common.env -jar /opt/evkk/service/db/db.jar clean migrate seed'"
          }
        }
      }

      stage("Start services") {
        steps {
          sshagent (credentials: ['deploy']) {
            sh "ssh -o StrictHostKeyChecking=no evkk@127.0.0.1 'sudo systemctl start evkkapi.service'"
            sh "ssh -o StrictHostKeyChecking=no evkk@127.0.0.1 'sudo systemctl start evkkdaemon.service'"
            sh "ssh -o StrictHostKeyChecking=no evkk@127.0.0.1 'sudo systemctl start evkkcharcounter.service'"
            sh "ssh -o StrictHostKeyChecking=no evkk@127.0.0.1 'sudo systemctl start evkkclusterfinder.service'"
          }
        }
      }

    }

  }

*/
