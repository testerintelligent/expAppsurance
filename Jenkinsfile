pipeline {
    agent  { label 'LinuxAgent' }
    environment {
        GIT_REPO_URL = 'https://github.com/testerintelligent/expAppsurance.git'
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
                   sh '''
            echo "Stopping existing containers..."
            echo "P@ssw0rd" | sudo -S docker-compose down --timeout 5 || true

            echo "Removing any stopped containers..."
            echo "P@ssw0rd" | sudo -S docker container prune -f

            echo "Building and starting containers..."
            echo "P@ssw0rd" | sudo -S docker-compose up -d --build
            '''
                }
            }
        }

        stage('Display URL') {
            steps {
                script {
                    def url = "10.192.190.158:3000"
                    echo "Application is running at ${url}"
                }
            }
        }
    }
}
