#!/bin/bash

# DevOps Intern Assignment - ScamBaiter Deployment Script
# This script automates the deployment of the ScamBaiter application

set -e  # Exit on any error

echo "🚀 Starting ScamBaiter Deployment Process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
check_docker() {
    print_status "Checking Docker installation..."
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    print_success "Docker is installed"
}

# Build Docker image
build_image() {
    print_status "Building Docker image..."
    docker build -t scambaiter-app:latest .
    print_success "Docker image built successfully"
}

# Run container locally for testing
run_local() {
    print_status "Running container locally for testing..."
    docker run -d --name scambaiter-local -p 3000:3000 \
        -e MONGODB_URI="${MONGODB_URI:-mongodb+srv://rizwanpatelmalipatel:rizwan123@scambaiterscluster.4mqao.mongodb.net}" \
        scambaiter-app:latest
    
    print_success "Container started locally"
    print_status "Application should be available at http://localhost:3000"
    print_status "To stop the container: docker stop scambaiter-local"
    print_status "To remove the container: docker rm scambaiter-local"
}

# Stop and remove existing containers
cleanup() {
    print_status "Cleaning up existing containers..."
    docker stop scambaiter-local 2>/dev/null || true
    docker rm scambaiter-local 2>/dev/null || true
    print_success "Cleanup completed"
}

# Main deployment function
main() {
    print_status "Starting deployment process..."
    
    check_docker
    cleanup
    build_image
    run_local
    
    print_success "Deployment completed successfully!"
    print_status "Next steps:"
    print_status "1. Test the application at http://localhost:3000"
    print_status "2. Take a screenshot for the assignment"
    print_status "3. Proceed to AWS EC2 deployment"
}

# Parse command line arguments
case "${1:-all}" in
    "build")
        check_docker
        build_image
        ;;
    "run")
        run_local
        ;;
    "cleanup")
        cleanup
        ;;
    "all"|*)
        main
        ;;
esac 