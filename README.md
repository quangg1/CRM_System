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
- CORS enabled for frontend integration

## Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Authentication

The system includes a complete authentication system:

### Demo Login Credentials
- **Email**: admin@crm.com
- **Password**: admin123

### User Roles
- **admin**: Full access to all features
- **sales**: Access to customer management and interactions
- **support**: Access to customer support features

### Features
- User registration and login
- JWT-based authentication
- Protected routes
- Logout functionality
- Password hashing with bcryptjs

## Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd CRM_System
```

### 2. Database Setup

1. Start your MySQL server
2. Create a new database:
```sql
CREATE DATABASE crm_system;
```

3. Import the database schema:
```bash
mysql -u root -p crm_system < database.sql
```

### 3. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
# Create .env file with the following content:
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=crm_system
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=24h
```

4. Start the backend server:
```bash
npm run dev
```

The backend will be running on `http://localhost:5000`

### 4. Frontend Setup

1. Open a new terminal and navigate to the project root:
```bash
cd CRM_System
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

## API Endpoints

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get customer by ID
- `GET /api/customers/status/:status` - Get customers by status
- `GET /api/customers/search?q=query` - Search customers
- `GET /api/customers/stats` - Get customer statistics
- `POST /api/customers` - Create new customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Interactions
- `GET /api/interactions` - Get all interactions
- `GET /api/interactions/:id` - Get interaction by ID
- `GET /api/interactions/customer/:customerId` - Get interactions by customer
- `GET /api/interactions/type/:type` - Get interactions by type
- `GET /api/interactions/status/:status` - Get interactions by status
- `GET /api/interactions/upcoming` - Get upcoming interactions
- `GET /api/interactions/stats` - Get interaction statistics
- `POST /api/interactions` - Create new interaction
- `PUT /api/interactions/:id` - Update interaction
- `DELETE /api/interactions/:id` - Delete interaction

## Project Structure

```
CRM_System/
├── backend/                 # Backend API
│   ├── config/             # Database configuration
│   ├── controllers/        # API controllers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── server.js          # Main server file
│   └── package.json
├── src/                   # Frontend React app
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── types/            # TypeScript interfaces
│   └── ...
├── database.sql          # Database schema
└── README.md
```

## Usage

1. **Dashboard**: View overall statistics and upcoming interactions
2. **Customers**: Manage customer information and status
3. **Interactions**: Track all customer interactions and communications

## Development

### Backend Development
```bash
cd backend
npm run dev  # Start with nodemon for auto-reload
```

### Frontend Development
```bash
npm start    # Start React development server
```

## Production Build

### Frontend
```bash
npm run build
```

### Backend
```bash
cd backend
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
