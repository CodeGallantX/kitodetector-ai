# KitoDetector AI

KitoDetector AI is a modern web application that uses artificial intelligence to detect and analyze images. It provides a user-friendly interface for uploading images, processing them through AI models, and viewing detailed results.

## Features

- 🖼️ Image Upload and Processing
- 🤖 AI-Powered Image Analysis
- 📊 Detailed Analytics Dashboard
- 🌓 Dark Mode Support
- 🔐 Secure Authentication
- 📱 Responsive Design
- 📈 Real-time Statistics

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Python (FastAPI)
- **Authentication**: JWT
- **Database**: PostgreSQL
- **AI Model**: Custom-trained image detection model

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Python (v3.9 or higher)
- PostgreSQL

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/kitodetector-ai.git
   cd kitodetector-ai
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Install backend dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   DATABASE_URL=postgresql://user:password@localhost:5432/kitodetector
   JWT_SECRET=your_jwt_secret
   ```

5. Start the development servers:
   ```bash
   # Frontend
   npm run dev
   # or
   yarn dev

   # Backend (in a separate terminal)
   cd backend
   uvicorn main:app --reload
   ```

## Project Structure

```
kitodetector-ai/
├── app/                    # Next.js application
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── components/        # Reusable components
│   ├── dashboard/         # Dashboard pages
│   └── lib/               # Utility functions
├── backend/               # Python backend
│   ├── api/              # API endpoints
│   ├── models/           # Database models
│   └── services/         # Business logic
├── public/               # Static assets
└── tests/               # Test files
```

## Authentication

The application uses JWT (JSON Web Tokens) for authentication. The authentication flow includes:

1. User registration
2. Email verification
3. Login with email/password
4. Token-based API access
5. Password reset functionality

## API Documentation

### Authentication Endpoints

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user

### Image Processing Endpoints

- `POST /api/images/upload` - Upload and process image
- `GET /api/images/{id}` - Get image analysis results
- `GET /api/images/history` - Get user's image history

### Dashboard Endpoints

- `GET /api/dashboard/stats` - Get user statistics
- `GET /api/dashboard/activity` - Get recent activity

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@kitodetector.com or join our [Discord community](https://discord.gg/kitodetector).

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
