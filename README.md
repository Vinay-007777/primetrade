 # PrimeTrade

A full-stack task management dashboard application built with React, Node.js, Express, and MongoDB.
<img width="1707" height="912" alt="image" src="https://github.com/user-attachments/assets/1535e4c5-f791-40a6-902b-637882131250" />


## Features
- **Authentication**: Secure Login and Registration using JWT.
- **Dashboard**: Protected route displaying user profile and tasks.
- **Task Management**: Create, Read, Update, and Delete (CRUD) tasks.
- **Responsive UI**: Modern interface built with Tailwind CSS.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, React Router, Axios, React Toastify.
- **Backend**: Node.js, Express.js, Mongoose.
- **Database**: MongoDB.

## Getting Started

### Prerequisites
- Node.js installed.
- MongoDB connection string (or local MongoDB).

### 1. Backend Setup
Navigate to the `server` directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
MONGODB_URL=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
```

Start the backend server:
```bash
npm run dev
```
The server will run on `http://localhost:5000`.

### 2. Frontend Setup
Open a new terminal, navigate to the `client` directory and install dependencies:
```bash
cd client
npm install
```

Start the frontend development server:
```bash
npm run dev
```
The application will run on `http://localhost:5173` (or similar).



