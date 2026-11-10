pipeline {
    agent { label 'LinuxAgent' }

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['Prod', 'Dev'], description: 'Dev = all URLs point to localhost (.env.development), Prod = URLs from .env.production')
    }

    environment {
        // Maps the Dev/Prod choice to the .env.<name> file used by the Docker builds
        APP_ENV = "${params.ENVIRONMENT == 'Dev' ? 'development' : 'production'}"

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

                echo "Building and starting containers for APP_ENV=$APP_ENV..."
                docker compose up -d --build
                '''
            }
        }

        stage('Display URL') {
            steps {
                script {
                    def host = (params.ENVIRONMENT == 'Dev') ? 'localhost' : '10.192.190.158'
                    echo "Application (${params.ENVIRONMENT}) is running at http://${host}:3000"
                }
            }
        }
    }
}