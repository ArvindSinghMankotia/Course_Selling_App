
# Course Selling Application 

## Overview

This is the backend for a Course Selling application that includes user authentication, course management, and the ability for admins to manage and sell courses. The app allows users to sign up, log in, purchase courses, and admins to create and manage the courses they offer.

### Features

- User sign up and login with JWT authentication.
- Admin sign up and login with JWT authentication.
- Add, update, delete, and fetch courses for admins.
- Users can purchase courses and view their purchased courses.
- Password hashing for security.
- All sensitive data such as JWT keys, DB URL, and port number are stored in the `.env` file.

## Tech Stack

- **Node.js**: JavaScript runtime used for backend.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database to store user and course data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Bcryptjs**: Library for hashing passwords.
- **jsonwebtoken (JWT)**: For user authentication and token management.
- **Zod**: For validating incoming request data.

## Installation

### 1. Clone the repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/blogging-app-backend.git
```

### 2. Install dependencies

Navigate to the project directory and install the dependencies using npm:

```bash
cd blogging-app-backend
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root directory of the project and add the following variables:

```bash
PORT=5000
JWT_KEY=your_jwt_secret_key
DB_URL=mongodb://localhost:27017/bloggingAppDB
```

Replace the values with your own. **Do not** commit the `.env` file to your version control system. It should be kept private.

### 4. Start the server

After setting up the `.env` file, you can start the server by running:

```bash
npm start
```

The server will be running on `http://localhost:5000` by default. (Port may vary depending on your `.env` configuration.)

## Environment Variables

Ensure you set up the following environment variables in your `.env` file:

- `PORT`: The port number where the application will run (default: `5000`).
- `JWT_KEY`: Secret key used for signing JWT tokens.
- `DB_URL`: MongoDB connection string to connect to your database.

**Note**: Do not expose your `.env` file or its contents publicly, as it contains sensitive information like your JWT secret and database credentials.

## API Endpoints

### User Routes

1. **POST /signup**
   - Endpoint to sign up a new user.
   - Request body:
     ```json
     {
       "FirstName": "John",
       "LastName": "Doe",
       "Email": "john.doe@example.com",
       "Password": "strongpassword123"
     }
     ```

2. **POST /login**
   - Endpoint to log in an existing user.
   - Request body:
     ```json
     {
       "Email": "john.doe@example.com",
       "Password": "strongpassword123"
     }
     ```

3. **GET /purchases**
   - Endpoint to fetch all courses purchased by the user.

---

### Admin Routes

1. **POST /admin/signup**
   - Endpoint to sign up a new admin.

2. **POST /admin/login**
   - Endpoint to log in an existing admin.

3. **POST /admin/addcourse**
   - Endpoint for admins to add a new course.

4. **POST /admin/deleteacourse**
   - Endpoint for admins to delete an existing course by its ID.

---

### Course Routes

1. **GET /courses/**
   - Endpoint to fetch all available courses.
   - **Populated with creator admin data.**

2. **POST /courses/purchase**
   - Endpoint to purchase a course by the user.

## How to Contribute

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.


## Notes

- **.env File**: All sensitive information, such as the `JWT_KEY` and `DB_URL`, should be placed in the `.env` file. Make sure to **never** push this file to GitHub or any version control system.
- **Security**: Passwords are hashed using `bcryptjs` before saving to the database. JWT tokens are used for user and admin authentication.
- **Database**: The app uses MongoDB as its database. Ensure you have a running instance of MongoDB or use a cloud service like MongoDB Atlas.

---

**Thank you for using  Course Selling Application Backend!**
