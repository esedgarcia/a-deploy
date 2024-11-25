# Deploying a Node.js Application on an EC2 Instance Using GitHub Actions

This document outlines the steps to deploy a Node.js application on an AWS EC2 instance, including key considerations for using GitHub Actions.

## **Prerequisites**

1. An AWS account with a configured EC2 instance.
2. A Node.js application prepared for production.
3. A GitHub repository containing the application.
4. SSH access to the EC2 instance.
5. GitHub Actions set up in your repository.

---

## **Steps**

### **1. Create and Configure the EC2 Instance**

1. Log in to AWS and create an EC2 instance:
   - Recommended OS: Amazon Linux 2.
   - Assign a key pair for SSH access.

2. Configure the instance's security group:
   - Open necessary ports, such as `22` (SSH) and the application’s port (e.g., `1000`).

3. Connect to the EC2 instance via SSH:
   ```bash
   ssh -i "your-key.pem" ec2-user@your-ec2-public-ip
   ```

### **2. Set Up the EC2 Environment**
1. Update the system packages and Install Git and Node.js:
   ```bash
   sudo yum update -y
   sudo yum install git -y
   curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
   sudo yum install nodejs -y
   ```

### **3. Set Up Deployment with GitHub Actions**
   ```bash
   name: Deploy Application

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Deploy to EC2
      uses: appleboy/ssh-action@v0.1.6
      with:
        host: ${{ secrets.EC2_HOST }}
        username: ec2-user
        key: ${{ secrets.EC2_SSH_KEY }}
        script: |
          cd /path-to-your-repo
          git pull
          npm install
          npm start

   ```