# ScamBaiter - Next.js Application
## DevOps Intern Assignment

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 DevOps Assignment Overview

This project has been prepared for a DevOps internship assignment that involves:
- Dockerizing the application
- Deploying to AWS EC2
- Implementing basic automation
- Documenting the entire process

### Assignment Deliverables

1. ✅ **GitHub Repository** - This repository
2. ✅ **Dockerfile** - Optimized for production deployment
3. ✅ **Local Docker Testing** - Scripts and instructions provided
4. ✅ **AWS EC2 Deployment** - Complete guide with automation
5. ✅ **Documentation** - Comprehensive step-by-step instructions

## 📋 Quick Start

### Prerequisites
- Node.js 18+ 
- Docker
- AWS Account (for deployment)

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🐳 Docker Deployment

### Automated Deployment Script

We've created an automated deployment script for easy local testing:

```bash
# Make the script executable
chmod +x deploy.sh

# Run complete deployment (build + run)
./deploy.sh

# Or run individual steps:
./deploy.sh build    # Build Docker image only
./deploy.sh run      # Run container only
./deploy.sh cleanup  # Clean up containers
```

### Manual Docker Commands

```bash
# Build the Docker image
docker build -t scambaiter-app .

# Run the container
docker run -p 3000:3000 \
  -e MONGODB_URI="mongodb+srv://rizwanpatelmalipatel:rizwan123@scambaiterscluster.4mqao.mongodb.net" \
  scambaiter-app
```

## ☁️ AWS EC2 Deployment

### Quick Deployment Steps

1. **Follow the complete guide**: [AWS_DEPLOYMENT_GUIDE.md](./AWS_DEPLOYMENT_GUIDE.md)
2. **Use cloud-init automation**: Copy contents of `cloud-init.yml` to EC2 user data
3. **Manual deployment**: Use the commands in the deployment guide

### Key Files for AWS Deployment

- `cloud-init.yml` - Automated EC2 setup
- `deploy.sh` - Local deployment script
- `AWS_DEPLOYMENT_GUIDE.md` - Complete step-by-step guide

## 📸 Assignment Screenshots Required

1. **Local Docker Testing** - App running at `http://localhost:3000`
2. **EC2 Dashboard** - AWS Console showing running instance
3. **SSH Terminal** - Connected to EC2 instance
4. **Public IP Access** - App accessible via EC2 public IP

## 🛠️ Project Structure

```
scambaiter/
├── src/                    # Application source code
├── public/                 # Static assets
├── Dockerfile             # Production Docker configuration
├── deploy.sh              # Local deployment automation
├── cloud-init.yml         # EC2 automation script
├── AWS_DEPLOYMENT_GUIDE.md # Complete deployment guide
└── README.md              # This file
```

## 🔧 Technical Details

### Docker Configuration
- Multi-stage build for optimized production image
- Standalone Next.js output for minimal container size
- Non-root user for security
- Health checks and restart policies

### AWS Configuration
- Amazon Linux 2023 AMI
- t2.micro instance (free tier eligible)
- Security groups configured for HTTP/SSH access
- Cloud-init automation for zero-touch deployment

### Environment Variables
- `MONGODB_URI` - MongoDB Atlas connection string
- `NODE_ENV` - Set to production in Docker
- `PORT` - Application port (3000)

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Docker Documentation](https://docs.docker.com/)
- [AWS EC2 Documentation](https://docs.aws.amazon.com/ec2/)
- [DevOps Best Practices](https://aws.amazon.com/devops/)

## 🤝 Contributing

This project is part of a DevOps internship assignment. All deployment configurations and documentation have been prepared to demonstrate:

- Infrastructure as Code principles
- Automated deployment processes
- Cloud-native application deployment
- DevOps best practices

## 📄 License

This project is created for educational purposes as part of a DevOps internship assignment.

---

## 🎯 Assignment Checklist

- [x] GitHub repository created and code pushed
- [x] Dockerfile created and optimized
- [x] Local deployment script created
- [x] AWS deployment guide written
- [x] Cloud-init automation configured
- [x] Documentation completed
- [ ] Screenshots taken (to be completed by student)
- [ ] AWS EC2 deployment completed (to be completed by student)
- [ ] Assignment submitted (to be completed by student)

**Next Steps**: Follow the [AWS_DEPLOYMENT_GUIDE.md](./AWS_DEPLOYMENT_GUIDE.md) to complete the assignment!
