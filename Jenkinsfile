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

        // stage('Build Docker Image') {
        //     steps {
        //         sh 'docker build -t danielshane861/tic-tac-toe-ui .'
        //     }
        // }
        
        // stage('Push Docker Image') {
        //     steps {
        //          withCredentials([string(credentialsId: 'docker-pwd', variable: 'dockerHubPwd')]) {
        //             sh "docker login -u danielshane861 -p ${dockerHubPwd}"
        //        }   
        //        sh 'docker push danielshane861/tic-tac-toe-ui'
        //     }
        // }

        // stage('Deploy') {
        //     steps {
        //         sh 'docker rmi danielshane861/tic-tac-toe-ui'
        //         script {
        //             def dockerStop = 'docker stop tic-tac-toe-ui'
        //             def dockerRm = 'docker rm tic-tac-toe-ui'
        //             def dockerRmi = 'docker rmi danielshane861/tic-tac-toe-ui'
        //             def dockerRun = 'docker run -d -p 8080:3000 --name=tic-tac-toe-ui danielshane861/tic-tac-toe-ui'
        //              sshagent(['TicTacToe-UI-Server']) {
        //                 sh "ssh -o StrictHostKeyChecking=no ec2-user@172.31.4.203 ${dockerStop}"
        //                 sh "ssh -o StrictHostKeyChecking=no ec2-user@172.31.4.203 ${dockerRm}"  
        //                 sh "ssh -o StrictHostKeyChecking=no ec2-user@172.31.4.203 ${dockerRmi}"
        //                 sh "ssh -o StrictHostKeyChecking=no ec2-user@172.31.4.203 ${dockerRun}"
        //             }   
        //         }
        //     }
        // }

        // stage('Clean Workspace') {
        //     steps {
        //         cleanWs()
        //     }
        // }
    }
}