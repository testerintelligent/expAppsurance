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
                        echo "P@ssw0rd" | sudo -S docker-compose down
                        docker-compose up --build -d
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
