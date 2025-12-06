# 📝 RBAC Todo App (Role-Based Access Control, Protective & Responsive )

## 📸 Screenshots

> Replace `./screenshots/image1.png` with your actual screenshot paths.

### ➕ Register Page
![Todo Form](https://github.com/ShivamThakur121/rbac_todo_app/blob/f9f6d8778094686f8b4db08809ad666bd637ff27/Screenshot%20(251).png)

### 🔐 Login Page
![Login Page](https://github.com/ShivamThakur121/rbac_todo_app/blob/f9f6d8778094686f8b4db08809ad666bd637ff27/Screenshot%20(248).png)

### 📝 Dashboard (User View)
![Dashboard](https://github.com/ShivamThakur121/rbac_todo_app/blob/f9f6d8778094686f8b4db08809ad666bd637ff27/Screenshot%20(249).png)

### 🛂 Admin Panel
![Admin Dashboard](https://github.com/ShivamThakur121/rbac_todo_app/blob/f9f6d8778094686f8b4db08809ad666bd637ff27/Screenshot%20(250).png)

---

A full-stack MERN (MongoDB, Express, React, Node.js) application featuring:

- 🔐 User Authentication (JWT)
- 🛂 Role-Based Access Control (User/Admin)
- ✅ Todo Management (CRUD)
- 🎨 Modern UI with Tailwind CSS
- ☁️ Fully Deployable (Render + Vercel)

---

## 🚀 Live Demo Links (If applicable)

Frontend (Vercel):  
👉 *Add your link here*

Backend (Render):  
👉 https://rbac-todo-app.onrender.com

---

## 📂 GitHub Repository

🔗 https://github.com/ShivamThakur121/rbac_todo_app

---

## 🧩 Features

### 🔐 **Authentication**
- Register using email, username, and password
- Secure password hashing (bcrypt)
- Login with JWT token stored in localStorage
- Auto-persist login (no re-login on refresh)

### 🛂 **Role-Based Access Control**
- `user` → Can manage only their own todos  
- `admin` → Can view/edit/delete todos of all users  
- Admin dashboard to view:
  - All users
  - All todos  
  - Promote/demote roles

### 📝 **Todo Management**
- Create, Read, Update, Delete Todos
- Fields: title, description, due date, category, completed
- Category: Urgent / Non-Urgent
- Completed status toggle

### 🎨 **Frontend**
- Built with React + Vite
- Tailwind CSS for styling
- Glassmorphism UI elements
- Axios API integration

### 🖥️ **Backend**
- Express.js server
- MongoDB (Mongoose)
- Middleware:
  - Auth guard (JWT)
  - Admin guard (role-based)
  - Input validation
- REST APIs

---

## 🛠️ Tech Stack

### **Frontend**
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router

### **Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Bcrypt

### **Deployment**
- Backend → Render  
- Frontend → Vercel  

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ShivamThakur121/rbac_todo_app.git
cd rbac_todo_app
