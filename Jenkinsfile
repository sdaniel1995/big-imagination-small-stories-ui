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
                    sh 'npm run test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t danielshane861/big-imagination-small-stories-ui .'
            }
        }
        
        stage('Push Docker Image') {
            steps {
                 withCredentials([usernamePassword(credentialsId: 'DockerHub', passwordVariable: 'dockerHubPwd', usernameVariable: 'dockerHubUsername')]) {
                    sh "docker login -u ${dockerHubUsername} -p ${dockerHubPwd}"
               }   
               sh 'docker push danielshane861/big-imagination-small-stories-ui'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker rmi danielshane861/big-imagination-small-stories-ui'
                script {
                    def dockerStop = 'docker stop big-imagination-small-stories-ui'
                    def dockerRm = 'docker rm big-imagination-small-stories-ui'
                    def dockerRmi = 'docker rmi danielshane861/big-imagination-small-stories-ui'
                    def dockerRun = 'docker run -d -p 8081:3000 --name=big-imagination-small-stories-ui danielshane861/big-imagination-small-stories-ui'
                     sshagent(['AWS']) {
                        sh "ssh -o StrictHostKeyChecking=no ec2-user@ec2-18-220-242-141.us-east-2.compute.amazonaws.com ${dockerStop}"
                        sh "ssh -o StrictHostKeyChecking=no ec2-user@ec2-18-220-242-141.us-east-2.compute.amazonaws.com ${dockerRm}"  
                        sh "ssh -o StrictHostKeyChecking=no ec2-user@ec2-18-220-242-141.us-east-2.compute.amazonaws.com ${dockerRmi}"
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