# CRM System

A comprehensive Customer Relationship Management (CRM) system built with React TypeScript frontend and Node.js Express backend with MySQL database.

## Features

- **User Authentication**: Secure login and registration system
- **Protected Routes**: Access control based on user authentication
- **Customer Management**: Add, edit, delete, and view customers
- **Interaction Tracking**: Record and manage customer interactions (calls, emails, meetings, notes)
- **Dashboard**: Real-time statistics and upcoming interactions
- **Search & Filter**: Find customers and interactions quickly
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- React 19 with TypeScript
- Material-UI (MUI) for UI components
- React Router for navigation
- JWT for authentication
- Local Storage for session management

### Backend
- Node.js with Express
- MySQL database with mysql2
- JWT Authentication
- bcryptjs for password hashing
- RESTful API design
- CORS enabled for frontend integsrc
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
# Create .env file with the following content:
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm start
```

The frontend will be running on `http://localhost:3000`

