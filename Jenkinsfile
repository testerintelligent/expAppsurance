pipeline {
    agent { label 'Linux' }
    environment {
        DOCKER_IMAGE = "reactapplication:latest"
        CONTAINER_NAME = "reactcontainer"
        GIT_REPO_URL = 'https://github.com/Mageshpoopathi/MERN.git'
        APP_PORT = '3000'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: "${env.GIT_REPO_URL}"
            }
        }
 
        stage('Build Docker Image') {
            steps {
                script {

                    sh "sudo docker build -t ${env.DOCKER_IMAGE} ."

                }

            }

        }
 
        stage('Run Docker Container') {

            steps {

                script {

                    sh """

                    sudo docker stop ${env.CONTAINER_NAME} || true

                    sudo docker rm ${env.CONTAINER_NAME} || true

                    sudo docker run -d --name ${env.CONTAINER_NAME} -p ${env.APP_PORT}:${env.APP_PORT} ${env.DOCKER_IMAGE}

                    """

                }

            }

        }
 
        stage('Display URL') {

            steps {

                script {

                    def url = "192.168.99.141:${env.APP_PORT}"
                    echo "Application is running at ${url}"
                }

            }

        }

    }

}
 
