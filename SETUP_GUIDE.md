# Setup Guide for ScamBaiter DevOps Assignment

This guide will help you set up everything needed to complete the DevOps internship assignment.

## 🛠️ Prerequisites Installation

### 1. Install Docker Desktop

#### For Windows:
1. **Download Docker Desktop**
   - Go to [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)
   - Download the installer
   - Run the installer as administrator

2. **System Requirements**
   - Windows 10/11 Pro, Enterprise, or Education (64-bit)
   - WSL 2 feature enabled
   - Virtualization enabled in BIOS

3. **Installation Steps**
   ```powershell
   # After installation, restart your computer
   # Then start Docker Desktop from the Start menu
   ```

4. **Verify Installation**
   ```powershell
   docker --version
   docker run hello-world
   ```

#### For Mac:
1. **Download Docker Desktop**
   - Go to [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)
   - Download the installer
   - Run the installer

2. **Verify Installation**
   ```bash
   docker --version
   docker run hello-world
   ```

#### For Linux (Ubuntu):
```bash
# Update package index
sudo apt-get update

# Install prerequisites
sudo apt-get install apt-transport-https ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io

# Add user to docker group
sudo usermod -aG docker $USER

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Verify installation
docker --version
docker run hello-world
```

### 2. Install Git (if not already installed)

#### For Windows:
- Download from [Git for Windows](https://git-scm.com/download/win)
- Use default settings during installation

#### For Mac:
```bash
# Using Homebrew
brew install git

# Or download from https://git-scm.com/download/mac
```

#### For Linux:
```bash
sudo apt-get install git  # Ubuntu/Debian
sudo yum install git      # CentOS/RHEL
```

### 3. Install Node.js (if not already installed)

#### For Windows:
- Download from [Node.js](https://nodejs.org/)
- Choose LTS version

#### For Mac:
```bash
# Using Homebrew
brew install node

# Or download from https://nodejs.org/
```

#### For Linux:
```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## 🚀 Local Testing Without Docker (Alternative)

If you can't install Docker immediately, you can test the application locally:

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Environment Variables
Create a `.env.local` file in the project root:
```env
MONGODB_URI=mongodb+srv://rizwanpatelmalipatel:rizwan123@scambaiterscluster.4mqao.mongodb.net
```

### 3. Run the Application
```bash
npm run dev
```

### 4. Test the Application
- Open [http://localhost:3000](http://localhost:3000)
- Take a screenshot for the assignment

## 🐳 Docker Testing (Once Docker is Installed)

### 1. Build the Docker Image
```bash
# Make sure you're in the project directory
cd scambaiter

# Build the image
docker build -t scambaiter-app .
```

### 2. Run the Container
```bash
# Run the container
docker run -p 3000:3000 \
  -e MONGODB_URI="mongodb+srv://rizwanpatelmalipatel:rizwan123@scambaiterscluster.4mqao.mongodb.net" \
  scambaiter-app
```

### 3. Test the Application
- Open [http://localhost:3000](http://localhost:3000)
- Take a screenshot for the assignment

### 4. Using the Deployment Script
```bash
# Make the script executable (Linux/Mac)
chmod +x deploy.sh

# Run the deployment script
./deploy.sh

# For Windows PowerShell, you can run the script directly:
bash deploy.sh
```

## ☁️ AWS Setup

### 1. Create AWS Account
1. Go to [AWS Console](https://aws.amazon.com/)
2. Click "Create an AWS Account"
3. Follow the registration process
4. **Important**: Use a credit card that supports international transactions

### 2. Access AWS Console
1. Login to [AWS Console](https://console.aws.amazon.com/)
2. Navigate to EC2 service
3. You'll see a dashboard with your instances (empty initially)

### 3. Create Key Pair
1. In EC2 Console, go to "Key Pairs" under "Network & Security"
2. Click "Create Key Pair"
3. Name it "scambaiter-key"
4. Download the `.pem` file
5. **Important**: Keep this file secure!

## 📸 Screenshot Checklist

Take screenshots of the following:

### Local Testing
- [ ] Application running at `http://localhost:3000` (with or without Docker)
- [ ] Terminal showing successful build/run commands

### AWS Deployment
- [ ] EC2 Dashboard showing running instance
- [ ] SSH terminal connected to EC2
- [ ] Application accessible via EC2 public IP

## 🔧 Troubleshooting

### Docker Issues
1. **Docker not starting**
   - Restart your computer
   - Check if virtualization is enabled in BIOS
   - For Windows: Ensure WSL 2 is installed

2. **Permission denied**
   - For Linux: Add user to docker group and restart
   - For Windows: Run Docker Desktop as administrator

3. **Port already in use**
   ```bash
   # Find process using port 3000
   netstat -ano | findstr :3000  # Windows
   lsof -i :3000                 # Mac/Linux
   
   # Kill the process or use different port
   docker run -p 3001:3000 scambaiter-app
   ```

### AWS Issues
1. **Can't connect via SSH**
   - Check security group rules
   - Verify key file permissions
   - Ensure instance is running

2. **Application not accessible**
   - Check security group allows HTTP traffic
   - Verify container is running on EC2
   - Check application logs

## 📚 Next Steps

1. **Complete Local Testing**
   - Install Docker or test without Docker
   - Take screenshots of local testing

2. **Deploy to AWS**
   - Follow [AWS_DEPLOYMENT_GUIDE.md](./AWS_DEPLOYMENT_GUIDE.md)
   - Take screenshots of AWS deployment

3. **Document Everything**
   - Create a Google Drive folder
   - Upload all screenshots and documentation
   - Set folder to "Anyone with link can view"

4. **Submit Assignment**
   - GitHub repository link
   - Google Drive link with documentation

## 🆘 Getting Help

If you encounter issues:

1. **Check the logs**
   ```bash
   docker logs <container_name>
   ```

2. **Common error solutions**
   - Restart Docker Desktop
   - Restart your computer
   - Check internet connection
   - Verify all prerequisites are installed

3. **AWS Support**
   - Use AWS documentation
   - Check AWS status page
   - Use AWS forums for community help

Good luck with your DevOps assignment! 🚀 