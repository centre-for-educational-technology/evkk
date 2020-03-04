pipeline {

  agent any

  parameters {
    string(defaultValue: "dev", description: "Branch to check out", name: "branch")
  }

  stages {

    stage("Clone sources") {
      steps {
        git url: "https://github.com/centre-for-educational-technology/evkk.git", branch: "${params.branch}"
      }
    }

    stage("Build") {
      steps {
        sh "./gradlew bootJar"
        sh "yarn --cwd=./ui install && yarn --cwd=./ui start"
      }
    }

    stage("Foo") {
      steps {
        echo "branch: ${params.branch}"
      }
    }
  }

}
