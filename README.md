# Restaurant ECS Project

## Project Overview

This project demonstrates a complete DevOps deployment pipeline using:

* Terraform
* Docker
* AWS ECS
* AWS ECR
* Application Load Balancer (ALB)
* Flask Backend
* Express Frontend

The application is a restaurant web application containing:

* Login Page
* Signup Page
* Restaurant Dashboard
* Menu Display
* Backend APIs

The infrastructure is deployed on AWS using Terraform modules.

---

# Project Architecture

```text
User Browser
     |
     v
Application Load Balancer (ALB)
     |
     v
ECS Cluster (Fargate)
 ┌──────────────┬──────────────┐
 |              |              |
 v              v
Frontend      Backend
(Express)     (Flask)
```

---

# Technologies Used

| Technology | Purpose                 |
| ---------- | ----------------------- |
| Terraform  | Infrastructure as Code  |
| AWS ECS    | Container Orchestration |
| AWS ECR    | Docker Image Storage    |
| Docker     | Containerization        |
| Flask      | Backend Application     |
| Express.js | Frontend Server         |
| ALB        | Load Balancing          |
| VPC        | Networking              |

---

# Folder Structure

```text
restaurant-ecs-project/
│
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── app.py
│   └── templates/
│       ├── login.html
│       ├── signup.html
│       └── dashboard.html
│
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   └── public/
│       ├── index.html
│       ├── login.html
│       ├── signup.html
│       ├── dashboard.html
│       ├── style.css
│       └── script.js
│
├── terraform/
│   ├── provider.tf
│   ├── variables.tf
│   ├── outputs.tf
│   ├── main.tf
│   ├── terraform.tfvars
│   │
│   └── modules/
│       ├── vpc/
│       ├── ecs/
│       ├── alb/
│       └── ecr/
│
├── .gitignore
└── README.md
```

---

# Backend Explanation (Flask)

## app.py

Main backend application.

Responsibilities:

* Handles login requests
* Handles signup requests
* Runs Flask APIs
* Sends JSON responses

Important APIs:

| API     | Method | Purpose      |
| ------- | ------ | ------------ |
| /       | GET    | Health check |
| /signup | POST   | User signup  |
| /login  | POST   | User login   |

---

## requirements.txt

Contains Python dependencies.

Example:

```text
Flask
flask-cors
```

---

## Dockerfile (Backend)

Creates Docker image for Flask backend.

Responsibilities:

* Uses Python base image
* Installs dependencies
* Copies source code
* Starts Flask server

---

# Frontend Explanation (Express)

## server.js

Main Express server.

Responsibilities:

* Serves frontend pages
* Handles frontend routing
* Connects frontend with backend APIs

---

## package.json

Contains Node.js dependencies.

Example:

```json
{
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

---

## public/

Contains static frontend files.

| File           | Purpose             |
| -------------- | ------------------- |
| index.html     | Landing page        |
| login.html     | Login form          |
| signup.html    | Signup form         |
| dashboard.html | User dashboard      |
| style.css      | Styling             |
| script.js      | Frontend JavaScript |

---

## Dockerfile (Frontend)

Creates Docker image for Express frontend.

Responsibilities:

* Uses Node.js base image
* Installs packages
* Runs Express server

---

# Terraform Explanation

Terraform is used to create AWS infrastructure.

---

## provider.tf

Defines:

* AWS provider
* AWS region

Example:

```hcl
provider "aws" {
  region = "ap-south-1"
}
```

---

## variables.tf

Contains reusable variables.

Examples:

* Region
* VPC CIDR
* Docker image URLs
* Ports

---

## main.tf

Main Terraform configuration.

Responsibilities:

* Calls Terraform modules
* Creates infrastructure
* Connects resources together

---

## outputs.tf

Displays outputs after deployment.

Example:

* ALB DNS URL
* ECS Cluster name

---

## terraform.tfvars

Contains actual variable values.

Example:

```hcl
region = "ap-south-1"
```

Important:

Do NOT push this file to GitHub if it contains secrets.

---

# Terraform Modules Explanation

---

## modules/vpc

Creates networking resources.

Resources:

* VPC
* Public Subnets
* Internet Gateway
* Route Tables

Purpose:

Provides networking for ECS services.

---

## modules/ecr

Creates ECR repositories.

Repositories:

* restaurant-backend
* restaurant-frontend

Purpose:

Stores Docker images.

---

## modules/alb

Creates Application Load Balancer.

Responsibilities:

* Routes traffic
* Exposes public URL
* Connects to ECS services

---

## modules/ecs

Creates ECS infrastructure.

Resources:

* ECS Cluster
* ECS Task Definitions
* ECS Services

Purpose:

Runs Docker containers.

---

# Docker Workflow

## Step 1: Build Images

### Backend

```bash
docker build -t restaurant-backend .
```

### Frontend

```bash
docker build -t restaurant-frontend .
```

---

## Step 2: Push Images to ECR

### Login to ECR

```bash
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com
```

---

### Push Backend

```bash
docker push ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/restaurant-backend:latest
```

---

### Push Frontend

```bash
docker push ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/restaurant-frontend:latest
```

---

# Terraform Deployment Steps

## Initialize Terraform

```bash
terraform init
```

---

## Validate

```bash
terraform validate
```

---

## Plan

```bash
terraform plan
```

---

## Apply

```bash
terraform apply
```

Type:

```text
yes
```

---

# Access Application

After deployment:

```bash
terraform output
```

Example:

```text
alb_dns_name = restaurant-alb.ap-south-1.elb.amazonaws.com
```

Open in browser:

```text
http://ALB-DNS-NAME
```

---

# Features

## Frontend Features

* Restaurant UI
* Login Page
* Signup Page
* Dashboard
* Responsive Design

---

## Backend Features

* REST APIs
* Authentication APIs
* JSON Responses
* CORS Support

---

# Security Features

* Security Groups
* VPC Isolation
* ALB Public Access
* ECS Private Networking

---

# Common Issues

## Docker Not Running

Error:

```text
failed to connect to docker daemon
```

Fix:

Start Docker Desktop.

---

## IAM Permission Errors

Error:

```text
AccessDeniedException
```

Fix:

Attach:

```text
AdministratorAccess
```

to IAM user.

---

## ECR Repository Not Empty

Error:

```text
RepositoryNotEmptyException
```

Fix:

Delete images manually or use:

```hcl
force_delete = true
```

---

# Future Improvements

* Add RDS Database
* Add CI/CD Pipeline
* Add HTTPS using ACM
* Add Route53 Domain
* Add Auto Scaling
* Add Monitoring using CloudWatch

---

# Author

Pavan

---

# Conclusion

This project demonstrates a complete containerized cloud-native deployment using:

* Terraform
* Docker
* AWS ECS
* AWS ECR
* Flask
* Express
* ALB

It follows modern DevOps and Infrastructure as Code practices.

