pipeline {
    agent { label 'LinuxAgent' }

    environment {
        GIT_REPO_URL = 'https://github.com/testerintelligent/expAppsurance.git'
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()   // ✅ clears old files
            }
        }

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: "${env.GIT_REPO_URL}"
            }
        }
      
        stage('Build and Run Containers') {
            steps {
                sh '''
                echo "Stopping existing containers..."
                docker compose down --timeout 5 || true

                echo "Removing stopped containers..."
                docker container prune -f || true

                echo "Building and starting containers..."
                docker compose up -d --build
                '''
            }
        }

        stage('Display URL') {
            steps {
                echo "Application is running at http://10.192.190.158:3000"
            }
        }
    }
}