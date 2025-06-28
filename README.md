# 🛡️ ScamBaiter

A modern fraud prevention and community platform built with Next.js 15, featuring AI-powered content summarization, real-time search, and responsive design.

![ScamBaiter](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0-green?style=for-the-badge&logo=mongodb)
![Docker](https://img.shields.io/badge/Docker-Container-blue?style=for-the-badge&logo=docker)
![AWS](https://img.shields.io/badge/AWS-EC2-orange?style=for-the-badge&logo=amazon-aws)

## ✨ Features

### 🤖 AI-Powered Content Summarization
- **Gemini API Integration**: Intelligent content summarization using Google's Gemini AI
- **Modal Interface**: Clean modal display showing original vs summarized content
- **Rate Limiting**: Client-side protection against API abuse
- **Error Handling**: Graceful fallbacks for API failures

### 🔍 Real-Time Search
- **Title-Based Search**: Find posts by keywords in titles
- **Case-Insensitive**: Search works regardless of case
- **Enter Key Trigger**: Search only executes when user presses Enter
- **Live Results**: Instant display of search results with count

### 📱 Responsive Design
- **Mobile-First**: Optimized for all device sizes
- **Tailwind CSS**: Modern, utility-first styling
- **Dark Mode**: Built-in dark theme support
- **Loading Skeletons**: Smooth loading experience with animated placeholders

### 🏗️ Modern Architecture
- **Next.js 15**: Latest React framework with App Router
- **TypeScript**: Full type safety and better development experience
- **MongoDB**: NoSQL database with Mongoose ODM
- **Component-Based**: Reusable, modular components

### 🚀 Deployment Ready
- **Docker Containerization**: Easy deployment and scaling
- **AWS EC2**: Cloud deployment with automated scripts
- **Environment Variables**: Secure configuration management
- **Production Optimized**: Built for high performance

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB, Mongoose
- **AI**: Google Gemini API
- **Deployment**: Docker, AWS EC2
- **Development**: ESLint, PostCSS, Autoprefixer

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB instance
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/scambaiter.git
   cd scambaiter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Add your configuration:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Creating Posts
1. Navigate to the post creation page
2. Fill in title, content, and select community
3. Optionally upload media files
4. Submit to create your post

### Searching Content
1. Use the search bar on the home page
2. Type keywords related to post titles
3. Press Enter to execute search
4. View filtered results

### AI Summarization
1. Click the "Summarize" button on any post
2. Wait for AI processing
3. View original vs summarized content in modal
4. Close modal to return to feed

### Joining Communities
1. Click "Join" button on community posts
2. Become a member to interact with community content
3. View community-specific posts

## 🏗️ Project Structure

```
scambaiter/
├── src/
│   ├── app/
│   │   ├── api/                 # API routes
│   │   │   ├── search/          # Search functionality
│   │   │   ├── summarize/       # AI summarization
│   │   │   └── post/           # Post management
│   │   ├── components/ui/      # Reusable components
│   │   │   ├── PostCard.tsx    # Post display component
│   │   │   ├── MainContent.tsx # Main feed component
│   │   │   └── SummaryModal.tsx # AI summary modal
│   │   ├── Models/             # MongoDB schemas
│   │   └── lib/                # Database utilities
│   └── public/                 # Static assets
├── Dockerfile                  # Container configuration
├── cloud-init.yml             # AWS deployment script
└── deploy.sh                  # Deployment automation
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `GEMINI_API_KEY` | Google Gemini API key | Yes |

### API Endpoints

- `GET /api/post/postdata` - Fetch all posts
- `GET /api/search?q=query` - Search posts by title
- `POST /api/summarize` - Generate AI summary
- `POST /api/post/likes` - Handle post likes
- `POST /api/user/join` - Join communities

## 🐳 Docker Deployment

### Build the image
```bash
docker build -t scambaiter .
```

### Run the container
```bash
docker run -p 3000:3000 --env-file .env.local scambaiter
```

## ☁️ AWS EC2 Deployment

1. **Launch EC2 instance** with Ubuntu
2. **Upload project files** to instance
3. **Run deployment script**:
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```
4. **Access application** at your EC2 public IP

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Google Gemini](https://ai.google.dev/) for AI capabilities
- [Tailwind CSS](https://tailwindcss.com/) for beautiful styling
- [MongoDB](https://www.mongodb.com/) for the database solution

## 📞 Support

For support, email support@scambaiter.com or create an issue in this repository.

---

**Built with ❤️ for the community**
