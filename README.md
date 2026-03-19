# Employee Management System (EMS)

A fullstack Employee Management System built with Next.js and Node.js, featuring JWT authentication and role-based access control.

## Tech Stack

**Frontend**
- Next.js 16
- Tailwind CSS
- Shadcn/ui
- Lucide React

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

## Features

- User Registration & Login
- JWT Authentication (Access Token + Refresh Token)
- HTTP-only cookie for refresh token
- Password hashing with SHA-256
- Role-based access (Admin / Employee)
- Admin Dashboard
- Employee Dashboard
- Protected Routes

## Project Structure

```
EMS/
  ├── frontend/         # Next.js app
  │   ├── app/
  │   │   ├── auth/
  │   │   │   ├── login/
  │   │   │   └── register/
  │   │   ├── admin/
  │   │   │   └── dashboard/
  │   │   ├── employee/
  │   │   │   └── dashboard/
  │   │   └── components/
  │   └── components/
  │       └── ui/       # Shadcn components
  │
  └── backend/          # Express app
      ├── config/
      ├── controller/
      ├── middleware/
      ├── models/
      ├── routes/
      └── utils/
```

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```env
PORT=3001
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:
```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will run on `http://localhost:3000`  
The backend will run on `http://localhost:3001`

## Authentication Flow

1. User registers or logs in with email and password
2. Backend hashes password and verifies credentials
3. Backend generates Access Token (15m) and Refresh Token (7d)
4. Refresh Token is stored in HTTP-only cookie
5. Access Token is used for protected API requests
6. User is redirected based on their role

## Author

Built with while learning fullstack development
