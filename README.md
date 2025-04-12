# AI Teacher Platform

A full-stack AI-powered tutoring platform built with React, Node.js, and MongoDB.

## Current Status

The project is in development with the following components running:
- Backend server running on port 5001
- Frontend development server (with some configuration issues)
- MongoDB connection established

## Known Issues

1. Frontend PostCSS Configuration:
   - Missing `postcss-flexbugs-fixes` plugin
   - Error: `Loading PostCSS "postcss-flexbugs-fixes" plugin failed: Cannot find module 'postcss-flexbugs-fixes'`
   - Solution: Run `npm install --save-dev postcss-flexbugs-fixes postcss-preset-env`

2. Port Conflict:
   - Frontend development server default port (3000) is in use
   - Error: `Error: listen EADDRINUSE: address already in use :::3000`
   - Solution: Update webpack.config.js to use port 3001

3. Backend Vulnerabilities:
   - 3 high severity vulnerabilities reported
   - Run `npm audit fix --force` in backend directory to address

## Tech Stack

### Frontend
- React 18 with TypeScript
- TailwindCSS for styling
- Webpack 5 for bundling
- React Router v6 for navigation
- Framer Motion for animations
- Axios for API calls

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- Nodemon for development

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd ai-teacher
```

2. Install backend dependencies:
```bash
cd backend
npm install
npm audit fix --force  # Fix security vulnerabilities
```

3. Install frontend dependencies:
```bash
cd ../ai-tutor
npm install
npm install --save-dev postcss-flexbugs-fixes postcss-preset-env  # Fix PostCSS issues
```

4. Set up environment variables:
   - Copy `.env.example` to `.env` in the backend directory
   - Update the values with your own:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
PORT=5001
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```
The backend will run on http://localhost:5001

2. In a new terminal, start the frontend development server:
```bash
cd ai-tutor
npm start
```
The frontend will run on http://localhost:3000 (or 3001 if 3000 is in use)

## Project Structure

```
ai-teacher/
├── backend/                 # Backend server code
│   ├── models/             # MongoDB models (User.js, etc.)
│   ├── routes/             # API routes (adminRoutes.js, userRoutes.js)
│   ├── middleware/         # Custom middleware (auth.js, adminAuth.js)
│   └── server.js          # Server entry point
│
├── ai-tutor/               # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── auth/     # Authentication components
│   │   │   └── layout/   # Layout components
│   │   ├── pages/        # Page components
│   │   ├── contexts/     # React contexts
│   │   └── services/     # API services
│   └── public/           # Static files
```

## Development Notes

1. Environment Variables:
   - Backend uses PORT 5001
   - MongoDB connection requires valid Atlas credentials
   - JWT secret should be updated for production

2. Frontend Configuration:
   - PostCSS and Tailwind need proper setup
   - Webpack configured for hot reloading
   - TypeScript strict mode enabled

## Security Notes

- The `.env` file containing sensitive information is not included in the repository
- Make sure to update the MongoDB connection string and JWT secret before deploying
- All passwords are hashed using bcrypt before storing
- JWT is used for secure authentication
- Role-based access control implemented for admin features

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details



