# 💰 Personal Finance Tracker

A full-stack web application for tracking personal income and expenses. This project is currently under development.

## 🚀 Tech Stack
* **Frontend:** React.js (Vite), Chart.js
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL 
* **Authentication:** JWT & bcrypt

## 🛠️ Getting Started

### Prerequisites
* Node.js installed
* PostgreSQL installed and running

### 1. Database Setup
Create a PostgreSQL database named `financetracker` and run the SQL commands to create `users` and `transactions` tables.

### 2. Backend Setup
```bash
cd server
npm install
# Create a .env file with DB_PASSWORD and JWT_SECRET
npx nodemon index.js
```

### 3. Frontend Setup
```
cd client
npm install
npm run dev
```
