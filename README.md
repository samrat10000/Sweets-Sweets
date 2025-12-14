# Sweet Shop Application

A full-stack e-commerce application for selling sweets. Built with React (Vite) and Express (Node.js).

## Setup Instructions

### Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Testing

### Running Tests
- **Backend**: Run `npm test` in the `backend` directory.
- **Frontend**: Run `npm test` in the `frontend` directory.

## My Development Approach

This project was primarily developed by me as part of my full-stack learning journey.

### Backend Development
- The complete backend (Node.js, Express, MongoDB) was designed and implemented by me.
- Authentication, authorization, role-based access control (admin/user), REST APIs, and database models were written manually.
- Special focus was given to security, ensuring that admin-only routes are properly protected and cannot be accessed by normal users.

### Frontend Development
- The frontend was built using React (Vite).
- Most of the component logic, routing, and API integration was done independently.
- Some minor help from ChatGPT was taken to improve CSS styling and UI aesthetics.

### Testing
- Basic guidance was taken from ChatGPT for setting up backend and frontend tests.
- Test logic and integration were understood and adapted manually as per project needs.

### Reflection
This project helped me strengthen my understanding of full-stack development, especially authentication, authorization, RESTful API design, and role-based access control. Limited AI assistance was used only as a learning aid, not as a replacement for implementation.

## Features
- User Authentication (Register/Login)
- Product Management (Admin)
- Shopping Cart
- Order Management
