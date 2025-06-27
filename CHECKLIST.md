# DevOps Assignment Checklist

## 📋 Pre-Assignment Setup

### Prerequisites Installation
- [ ] **Docker Desktop** installed and running
  - [ ] Windows: Download from Docker Desktop for Windows
  - [ ] Mac: Download from Docker Desktop for Mac
  - [ ] Linux: Follow installation commands in SETUP_GUIDE.md
- [ ] **Git** installed and configured
- [ ] **Node.js** installed (if testing without Docker)
- [ ] **AWS Account** created (free tier eligible)

## 🐳 Task 1: Local Docker Testing

### Docker Installation Verification
- [ ] Run `docker --version` (should show Docker version)
- [ ] Run `docker run hello-world` (should show success message)

### Application Testing
- [ ] **Option A: With Docker**
  - [ ] Run `docker build -t scambaiter-app .`
  - [ ] Run `docker run -p 3000:3000 -e MONGODB_URI="mongodb+srv://rizwanpatelmalipatel:rizwan123@scambaiterscluster.4mqao.mongodb.net" scambaiter-app`
  - [ ] Open http://localhost:3000 in browser
  - [ ] **Take screenshot** of application running

- [ ] **Option B: Without Docker**
  - [ ] Run `npm install`
  - [ ] Create `.env.local` file with MongoDB URI
  - [ ] Run `npm run dev`
  - [ ] Open http://localhost:3000 in browser
  - [ ] **Take screenshot** of application running

### Screenshots Required
- [ ] **Screenshot 1**: Application running at http://localhost:3000
- [ ] **Screenshot 2**: Terminal showing successful build/run commands

## ☁️ Task 2: AWS EC2 Setup

### AWS Account Setup
- [ ] AWS account created and verified
- [ ] AWS Console accessed
- [ ] EC2 service navigated to

### EC2 Instance Launch
- [ ] **Instance Configuration**
  - [ ] AMI: Amazon Linux 2023
  - [ ] Instance Type: t2.micro (free tier)
  - [ ] Key Pair: Created and downloaded .pem file
  - [ ] Security Group: Configured with SSH (22), HTTP (80), Custom TCP (3000)

- [ ] **Advanced Configuration**
  - [ ] User Data: Pasted contents of `cloud-init.yml`
  - [ ] Storage: 8GB (default)
  - [ ] Tags: Name = "ScamBaiter-DevOps-Assignment"

### Instance Verification
- [ ] Instance shows "running" status in EC2 dashboard
- [ ] **Take screenshot** of EC2 dashboard showing running instance

## 🔗 Task 3: SSH Connection

### Key File Setup
- [ ] **Windows**: Key file permissions set correctly
  ```powershell
  icacls your-key.pem /inheritance:r
  icacls your-key.pem /grant:r "$($env:USERNAME):(R)"
  ```
- [ ] **Mac/Linux**: Key file permissions set correctly
  ```bash
  chmod 400 your-key.pem
  ```

### SSH Connection
- [ ] Successfully connected to EC2 instance
- [ ] **Take screenshot** of SSH terminal session
- [ ] Verified Docker is installed: `docker --version`
- [ ] Verified application is running: `docker ps`

## 🌐 Task 4: Application Deployment

### Deployment Verification
- [ ] **Container Status**: `docker ps` shows scambaiter-app running
- [ ] **Application Logs**: `docker logs scambaiter-app` shows no errors
- [ ] **Port Mapping**: Container mapped to port 80:3000

### Public Access Testing
- [ ] **Get Public IP**: Copied EC2 instance public IP
- [ ] **Browser Test**: Opened http://YOUR_EC2_PUBLIC_IP in browser
- [ ] **Application Access**: ScamBaiter application loads successfully
- [ ] **Take screenshot** of application running via public EC2 IP

## 📚 Task 5: Documentation

### Screenshot Collection
- [ ] **Screenshot 1**: Local application running (Docker or Node.js)
- [ ] **Screenshot 2**: EC2 dashboard showing running instance
- [ ] **Screenshot 3**: SSH terminal connected to EC2
- [ ] **Screenshot 4**: Application accessible via EC2 public IP

### Google Drive Setup
- [ ] Created Google Drive folder for assignment
- [ ] Uploaded all screenshots
- [ ] Set folder permissions to "Anyone with link can view"
- [ ] Tested link access

### Repository Updates
- [ ] All files committed to Git repository
- [ ] Repository is public or accessible to reviewers
- [ ] README.md contains clear instructions

## 🎯 Task 6: Assignment Submission

### Final Verification
- [ ] **GitHub Repository**: Link is working and accessible
- [ ] **Google Drive**: Link is working and accessible
- [ ] **Screenshots**: All 4 required screenshots included
- [ ] **Documentation**: All guides and instructions included

### Submission Checklist
- [ ] GitHub repository link ready
- [ ] Google Drive documentation link ready
- [ ] All screenshots taken and uploaded
- [ ] Assignment requirements met

## 🆘 Troubleshooting Checklist

### Common Issues
- [ ] **Docker not working**: Restart Docker Desktop, check virtualization
- [ ] **Can't connect to EC2**: Check security groups, key file permissions
- [ ] **Application not loading**: Check container logs, port mappings
- [ ] **Permission denied**: Check file permissions, user groups

### Help Resources
- [ ] `SETUP_GUIDE.md` - Prerequisites and troubleshooting
- [ ] `AWS_DEPLOYMENT_GUIDE.md` - Step-by-step AWS guide
- [ ] AWS Documentation - Official AWS guides
- [ ] Docker Documentation - Official Docker guides

## ✅ Final Assignment Checklist

### Required Deliverables
- [ ] ✅ GitHub repository link
- [ ] ✅ Dockerfile (optimized and working)
- [ ] ✅ Screenshot of app running locally in Docker
- [ ] ✅ Screenshot of EC2 dashboard
- [ ] ✅ Screenshot of SSH terminal session
- [ ] ✅ Screenshot of app running via public EC2 IP
- [ ] ✅ Clear steps in README including commands used

### Bonus Features (If Time Allows)
- [ ] ✅ Cloud-init automation implemented
- [ ] ✅ Deployment script (deploy.sh) created
- [ ] ✅ Comprehensive documentation provided
- [ ] ✅ IAM roles guide included (optional)

## 🎉 Assignment Complete!

Once all checkboxes are marked, your assignment is ready for submission!

**Submission Format:**
```
GitHub Repository: [Your GitHub repo link]
Google Drive Documentation: [Your Google Drive link]

Screenshots Included:
1. Local Docker testing
2. EC2 dashboard
3. SSH terminal session
4. Public IP access
```

**Good luck with your DevOps assignment! 🚀** 