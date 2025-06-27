# AWS EC2 Deployment Guide for ScamBaiter
## DevOps Intern Assignment

This guide provides step-by-step instructions for deploying the ScamBaiter application on AWS EC2.

### Prerequisites
- AWS Account (free-tier eligible)
- GitHub repository with your code
- Basic knowledge of AWS Console

### Step 1: Local Docker Testing

Before deploying to AWS, test your application locally:

```bash
# Make the deployment script executable
chmod +x deploy.sh

# Run the deployment script
./deploy.sh

# Or run individual commands:
./deploy.sh build    # Build Docker image only
./deploy.sh run      # Run container only
./deploy.sh cleanup  # Clean up containers
```

**Take a screenshot** of your application running at `http://localhost:3000`

### Step 2: AWS EC2 Instance Setup

#### 2.1 Launch EC2 Instance

1. **Login to AWS Console**
   - Go to [AWS Console](https://console.aws.amazon.com/)
   - Navigate to EC2 service

2. **Launch Instance**
   - Click "Launch Instance"
   - Choose "Quick Start" tab
   - Select "Amazon Linux 2023" (free tier eligible)
   - Choose "t2.micro" instance type
   - Click "Next: Configure Instance Details"

3. **Configure Instance Details**
   - Number of instances: 1
   - Network: Default VPC
   - Subnet: Default subnet
   - **Advanced Details**: Paste the contents of `cloud-init.yml` in the "User data" field
   - Click "Next: Add Storage"

4. **Storage**
   - Keep default 8GB storage
   - Click "Next: Add Tags"

5. **Tags** (Optional)
   - Key: Name
   - Value: ScamBaiter-DevOps-Assignment
   - Click "Next: Configure Security Group"

6. **Security Group**
   - Create a new security group
   - Name: ScamBaiter-SG
   - Description: Security group for ScamBaiter application
   - **Add Rules**:
     - Type: SSH, Port: 22, Source: My IP
     - Type: HTTP, Port: 80, Source: Anywhere (0.0.0.0/0)
     - Type: Custom TCP, Port: 3000, Source: Anywhere (0.0.0.0/0)
   - Click "Review and Launch"

7. **Review and Launch**
   - Review your configuration
   - Click "Launch"

8. **Key Pair**
   - Create a new key pair or select existing one
   - Download the `.pem` file
   - **Important**: Keep this file secure!

#### 2.2 Connect to EC2 Instance

**For Windows (PowerShell):**
```powershell
# Navigate to your key file directory
cd "C:\path\to\your\key"

# Set permissions (if needed)
icacls your-key.pem /inheritance:r
icacls your-key.pem /grant:r "$($env:USERNAME):(R)"

# Connect via SSH
ssh -i your-key.pem ec2-user@YOUR_EC2_PUBLIC_IP
```

**For Mac/Linux:**
```bash
# Navigate to your key file directory
cd /path/to/your/key

# Set permissions
chmod 400 your-key.pem

# Connect via SSH
ssh -i your-key.pem ec2-user@YOUR_EC2_PUBLIC_IP
```

### Step 3: Manual Deployment (Alternative to Cloud-init)

If cloud-init doesn't work or you prefer manual deployment:

```bash
# Update system
sudo yum update -y

# Install Docker
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -a -G docker ec2-user

# Logout and login again, or run:
newgrp docker

# Install Git
sudo yum install -y git

# Clone your repository
git clone https://github.com/yourusername/scambaiter.git
cd scambaiter

# Build and run Docker container
docker build -t scambaiter-app:latest .
docker run -d --name scambaiter-app -p 80:3000 --restart unless-stopped \
  -e MONGODB_URI="mongodb+srv://rizwanpatelmalipatel:rizwan123@scambaiterscluster.4mqao.mongodb.net" \
  scambaiter-app:latest
```

### Step 4: Verify Deployment

1. **Check if container is running:**
   ```bash
   docker ps
   ```

2. **Check application logs:**
   ```bash
   docker logs scambaiter-app
   ```

3. **Test the application:**
   - Open your browser
   - Go to `http://YOUR_EC2_PUBLIC_IP`
   - The application should be accessible

### Step 5: Required Screenshots

Take screenshots of:

1. **EC2 Dashboard** - Showing your running instance
2. **SSH Terminal Session** - Connected to your EC2 instance
3. **Application Running** - Browser showing your app at the EC2 public IP

### Step 6: Cleanup (Optional)

To avoid charges after the assignment:

```bash
# Stop and terminate EC2 instance
# Go to EC2 Console → Instances → Select instance → Actions → Instance State → Terminate
```

### Troubleshooting

#### Common Issues:

1. **Can't connect via SSH:**
   - Check security group rules
   - Verify key file permissions
   - Ensure instance is running

2. **Application not accessible:**
   - Check if container is running: `docker ps`
   - Check container logs: `docker logs scambaiter-app`
   - Verify security group allows HTTP traffic

3. **Docker permission issues:**
   ```bash
   sudo usermod -a -G docker ec2-user
   newgrp docker
   ```

4. **Port already in use:**
   ```bash
   docker stop scambaiter-app
   docker rm scambaiter-app
   # Then run the container again
   ```

### Bonus Features

#### IAM Role for S3 Access (Optional)

1. Create IAM Role with S3 access
2. Attach role to EC2 instance
3. Use AWS SDK in your application to access S3

#### Automated Deployment Script

The `deploy.sh` script can be modified for EC2 deployment:

```bash
# Copy deploy.sh to EC2
scp -i your-key.pem deploy.sh ec2-user@YOUR_EC2_PUBLIC_IP:~/

# Run on EC2
ssh -i your-key.pem ec2-user@YOUR_EC2_PUBLIC_IP
chmod +x deploy.sh
./deploy.sh
```

### Assignment Checklist

- [ ] GitHub repository created and code pushed
- [ ] Dockerfile created and tested locally
- [ ] Screenshot of app running locally in Docker
- [ ] EC2 instance launched with proper configuration
- [ ] Screenshot of EC2 dashboard
- [ ] Screenshot of SSH terminal session
- [ ] Screenshot of app running via public EC2 IP
- [ ] README updated with deployment steps
- [ ] All files committed to repository

### Files Created for Assignment

1. `Dockerfile` - Optimized for production
2. `deploy.sh` - Local deployment script
3. `cloud-init.yml` - EC2 automation
4. `AWS_DEPLOYMENT_GUIDE.md` - This guide
5. Updated `README.md` - Project documentation

### Next Steps

1. Follow this guide step by step
2. Take screenshots at each milestone
3. Document any issues and solutions
4. Upload everything to Google Drive with open access
5. Submit your GitHub repository link and Drive link

Good luck with your DevOps assignment! 🚀 