# 🔐 Authentication & User Management System

A secure and scalable **RESTful backend API** for authentication and user management, built with **Node.js, Express.js, MongoDB, and Mongoose**.

The system provides user registration, login/logout, JWT-based authentication, profile management, password updates, role-based access control, and admin user management.

## 🛠️ Technologies Used

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge\&logo=express\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8.x-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-8.x-880000?style=for-the-badge\&logo=mongoose\&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge\&logo=jsonwebtokens\&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-Password%20Hashing-003B57?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)
![REST API](https://img.shields.io/badge/API-REST-FF6C37?style=for-the-badge)
![Postman](https://img.shields.io/badge/Postman-API%20Testing-FF6C37?style=for-the-badge\&logo=postman\&logoColor=white)

---

## 📸 Screenshots

> Add screenshots of your API testing, MongoDB users collection, or admin/user-management interface here.

### API — User Registration

```md
![User Registration API](./screenshots/register.png)
```

### API — User Login

```md
![User Login API](./screenshots/login.png)
```

### API — Current User

```md
![Current User API](./screenshots/current-user.png)
```

### API — Admin User Management

```md
![Admin User Management](./screenshots/admin-users.png)
```

### MongoDB — Users Collection

```md
![MongoDB Users](./screenshots/mongodb-users.png)
```

> **Screenshot folder structure**

```text
screenshots/
├── register.png
├── login.png
├── current-user.png
├── admin-users.png
└── mongodb-users.png
```

---

## ✨ Features

### 🔑 Authentication

* User registration
* User login
* User logout
* JWT-based authentication
* HTTP-only authentication cookies
* Password hashing using bcrypt
* Authentication middleware
* Current authenticated user endpoint
* Account status validation

### 👤 User Management

* View current profile
* Update profile information
* Change password
* Avatar support
* User account activation/deactivation

### 🛡️ Role-Based Access Control

The application supports:

* `user`
* `admin`

Admin-only routes are protected using dedicated authorization middleware.

### 👨‍💼 Admin User Management

Administrators can:

* View all users
* Search users
* Paginate users
* View individual users
* Update user information
* Change user roles
* Activate/deactivate accounts
* Delete users

### 🔒 Security

* bcrypt password hashing
* JWT authentication
* HTTP-only cookies
* Helmet security headers
* CORS configuration
* Authentication rate limiting
* Environment variables
* Centralized error handling
* Passwords excluded from normal API responses

---

## 📁 Project Structure

```text
mern-auth-user-management-backend/
│
├── src/
│   ├── config/
│   │   ├── cookie.js
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── notFound.js
│   │
│   ├── models/
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── utils/
│   │   └── token.js
│   │
│   └── server.js
│
├── .env.example
├── .gitignore
├── package.json
├── postman_collection.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mern-auth-user-management-backend.git
```

```bash
cd mern-auth-user-management-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```env
NODE_ENV=development
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/mern_auth

JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

CLIENT_URL=http://localhost:5173

COOKIE_SECURE=false
COOKIE_SAME_SITE=lax
```

### 4. Start the development server

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:5000
```

### 5. Production

```bash
npm start
```

---

## 🩺 API Health Check

```http
GET /api/health
```

Example response:

```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2026-10-01T00:00:00.000Z"
}
```

---

# 🔑 Authentication API

## Register

```http
POST /api/auth/register
```

### Request

```json
{
  "name": "Ajinkya",
  "email": "ajinkya@example.com",
  "password": "StrongPassword123"
}
```

### Response

```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "name": "Ajinkya",
    "email": "ajinkya@example.com",
    "role": "user",
    "isActive": true
  }
}
```

The authentication JWT is automatically stored in an **HTTP-only cookie**.

---

## Login

```http
POST /api/auth/login
```

### Request

```json
{
  "email": "ajinkya@example.com",
  "password": "StrongPassword123"
}
```

---

## Get Current User

```http
GET /api/auth/me
```

Authentication required.

Example:

```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "name": "Ajinkya",
    "email": "ajinkya@example.com",
    "role": "user",
    "isActive": true
  }
}
```

---

## Logout

```http
POST /api/auth/logout
```

The authentication cookie is cleared.

---

# 👤 User API

## Update Profile

```http
PATCH /api/users/profile
```

Authentication required.

### Request

```json
{
  "name": "Ajinkya Developer",
  "avatar": "https://example.com/avatar.jpg"
}
```

---

## Change Password

```http
PATCH /api/users/change-password
```

Authentication required.

### Request

```json
{
  "currentPassword": "StrongPassword123",
  "newPassword": "NewStrongPassword123"
}
```

---

# 👨‍💼 Admin API

All admin endpoints require:

```text
Authentication + admin role
```

## Get Users

```http
GET /api/users
```

### Pagination

```http
GET /api/users?page=1&limit=10
```

### Search

```http
GET /api/users?search=ajinkya
```

---

## Get Single User

```http
GET /api/users/:id
```

---

## Update User

```http
PATCH /api/users/:id
```

Example:

```json
{
  "name": "Updated Name",
  "role": "admin",
  "isActive": true
}
```

---

## Delete User

```http
DELETE /api/users/:id
```

An administrator cannot delete their own account through this endpoint.

---

# 📋 API Endpoints

| Method   | Endpoint                     | Authentication | Description        |
| -------- | ---------------------------- | -------------- | ------------------ |
| `POST`   | `/api/auth/register`         | ❌              | Register user      |
| `POST`   | `/api/auth/login`            | ❌              | Login user         |
| `POST`   | `/api/auth/logout`           | ❌              | Logout user        |
| `GET`    | `/api/auth/me`               | ✅              | Get current user   |
| `PATCH`  | `/api/users/profile`         | ✅              | Update own profile |
| `PATCH`  | `/api/users/change-password` | ✅              | Change password    |
| `GET`    | `/api/users`                 | 🔐 Admin       | List users         |
| `GET`    | `/api/users/:id`             | 🔐 Admin       | Get user           |
| `PATCH`  | `/api/users/:id`             | 🔐 Admin       | Update user        |
| `DELETE` | `/api/users/:id`             | 🔐 Admin       | Delete user        |

---

# 🗄️ User Model

The MongoDB `User` document contains:

```js
{
  name: String,
  email: String,
  password: String,
  role: "user" | "admin",
  isActive: Boolean,
  avatar: String,
  createdAt: Date,
  updatedAt: Date
}
```

Passwords are automatically hashed before being stored in MongoDB.

---

# 🔐 Authentication Flow

```text
             ┌─────────────────┐
             │     React App   │
             └────────┬────────┘
                      │
                      │ Register / Login
                      ▼
             ┌─────────────────┐
             │ Express REST API│
             └────────┬────────┘
                      │
                      ▼
             ┌─────────────────┐
             │ Authentication  │
             │   Controller    │
             └────────┬────────┘
                      │
             ┌────────▼────────┐
             │     bcrypt      │
             │ Password Hash   │
             └────────┬────────┘
                      │
                      ▼
             ┌─────────────────┐
             │     MongoDB     │
             └─────────────────┘

                      │
                      ▼
             ┌─────────────────┐
             │   JWT Token     │
             │ HTTP-only Cookie│
             └─────────────────┘
```

---

# 🔒 Protected Request Flow

```text
React Client
     │
     │ HTTP Request + Cookie
     ▼
Express Server
     │
     ▼
Authentication Middleware
     │
     ├── Invalid Token ──► 401 Unauthorized
     │
     ▼
Find User
     │
     ├── Disabled ───────► 403 Forbidden
     │
     ▼
Role Middleware
     │
     ├── Non-admin ──────► 403 Forbidden
     │
     ▼
Controller
     │
     ▼
MongoDB
```

---

# 👑 Creating an Admin User

Register a normal user first:

```http
POST /api/auth/register
```

Then update the user's role in MongoDB:

```js
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

The user can now access the admin endpoints.

---

# 🧪 Testing with Postman

A Postman collection is included in the project:

```text
postman_collection.json
```

Import it into Postman and set:

```text
baseUrl = http://localhost:5000
```

Test the flow in this order:

```text
1. Register
2. Login
3. Get Current User
4. Update Profile
5. Change Password
6. Logout
```

For admin functionality:

```text
1. Create user
2. Promote user to admin in MongoDB
3. Login again
4. List users
5. Update user
6. Delete user
```

---

# 🌐 Connecting a React Frontend

For `fetch`:

```js
const response = await fetch(
  "http://localhost:5000/api/auth/me",
  {
    credentials: "include"
  }
);
```

For Axios:

```js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});

export default api;
```

Then:

```js
const { data } = await api.get("/auth/me");
```

---

# 🔧 Environment Variables

| Variable           | Description               |
| ------------------ | ------------------------- |
| `NODE_ENV`         | Application environment   |
| `PORT`             | Backend server port       |
| `MONGO_URI`        | MongoDB connection string |
| `JWT_SECRET`       | Secret used to sign JWTs  |
| `JWT_EXPIRES_IN`   | JWT expiration time       |
| `CLIENT_URL`       | Frontend URL              |
| `COOKIE_SECURE`    | Secure cookie setting     |
| `COOKIE_SAME_SITE` | SameSite cookie setting   |

---

# 🛡️ Security Features

### Password Security

Passwords are hashed using:

```text
bcrypt
```

The application never returns password hashes in normal API responses.

### JWT Security

Authentication tokens are stored using:

```text
HTTP-only cookies
```

This prevents JavaScript from directly accessing the authentication cookie.

### Rate Limiting

Authentication routes have request-rate limiting to reduce automated abuse.

### Helmet

Helmet adds common HTTP security headers.

### CORS

Only the configured frontend origin is allowed to make credentialed requests.

---

# 📦 Dependencies

### Production

```text
express
mongoose
bcryptjs
jsonwebtoken
cookie-parser
cors
dotenv
helmet
express-rate-limit
morgan
```

### Development

```text
nodemon
```

---

# 🚀 Future Improvements

Potential extensions for the project include:

* Email verification
* Forgot/reset password
* Refresh-token rotation
* OAuth / Google authentication
* Two-factor authentication
* Email notifications
* Profile image upload with Cloudinary
* Audit logs
* Admin dashboard
* User activity tracking
* Redis-based rate limiting
* Automated tests with Jest/Supertest
* Docker deployment
* CI/CD pipeline

---

# 📄 License

This project is available for educational and portfolio purposes.

---

## 👨‍💻 Author

**Ajinkya Dhatrak**

Github : ```https://github.com/ajinkya029```

---

⭐ If you find this project useful, consider giving the repository a star!
