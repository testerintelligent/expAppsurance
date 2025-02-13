pipeline {
    agent  { label 'Linux-agent' }
    environment {
        GIT_REPO_URL = 'https://github.com/testerintelligent/appInsurance.git/'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: "${env.GIT_REPO_URL}"
            }
        }

        stage('Build and Run Containers') {
            steps {
                script {
                    sh """
                     sudo docker-compose down || true
                     sudo docker-compose up --build -d
                    """
                }
            }
        }

        stage('Display URL') {
            steps {
                script {
                    def url = "10.192.190.148:3000"
                    echo "Application is running at ${url}"
                }
            }
        }
    }
}
