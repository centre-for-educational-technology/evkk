pipeline {

  agent any

  parameters {
    string(defaultValue: "dev", description: "Branch to check out", name: "branch")
    choice(choices: ['demo', 'prod'], description: 'Environment to build', name: 'env_name')
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
      }
    }

  }

}
