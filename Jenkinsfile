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

    stage("Remove build") {
      steps {
        dir ("./dist") {deleteDir()}
        dir ("./ui/build") {deleteDir()}
      }
    }

    stage("Build") {
      steps {
        sh "./gradlew bootJar"
        sh "yarn --cwd=./ui install && yarn --cwd=./ui build"
      }
    }

    stage("Foo") {
      steps {
        echo "branch: ${params.branch}"
      }
    }
  }

}
