pipeline {
    agent {
        label 'master'
    }

    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                script {
                    sh 'npm test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t danielshane861/big-imagination-small-stories-ui:latest_ui .'
            }
        }
        
        stage('Push Docker Image') {
            steps {
                 withCredentials([usernamePassword(credentialsId: 'DockerHub', passwordVariable: 'dockerHubPwd', usernameVariable: 'dockerHubUsername')]) {
                    sh "docker login -u ${dockerHubUsername} -p ${dockerHubPwd}"
               }   
               sh 'docker push danielshane861/big-imagination-small-stories-ui:latest_ui'
            }
        }

        stage('Deploy') {
            steps {
                script {
                    def dockerStop = 'docker stop big-imagination-small-stories-ui'
                    def dockerRm = 'docker rm big-imagination-small-stories-ui'
                    def dockerRmi = 'docker rmi big-imagination-small-stories-ui:latest_ui'
                    def dockerRun = 'docker run -d -p 3000:3000 --name=big-imagination-small-stories-ui danielshane861/big-imagination-small-stories-ui:latest_ui'
                     sshagent(['AWS']) {
                        // sh "ssh -o StrictHostKeyChecking=no ec2-user@ec2-18-220-242-141.us-east-2.compute.amazonaws.com ${dockerStop}"
                        // sh "ssh -o StrictHostKeyChecking=no ec2-user@ec2-18-220-242-141.us-east-2.compute.amazonaws.com ${dockerRm}"  
                        // sh "ssh -o StrictHostKeyChecking=no ec2-user@ec2-18-220-242-141.us-east-2.compute.amazonaws.com ${dockerRmi}"
                        sh "ssh -o StrictHostKeyChecking=no ec2-user@ec2-18-220-242-141.us-east-2.compute.amazonaws.com ${dockerRun}"
                    }   
                }
            }
        }

        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }
    }
}