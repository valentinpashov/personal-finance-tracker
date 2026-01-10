# 💰 Personal Finance Tracker

A full-stack application for tracking personal finances. Users can manage their income and expenses, view their balance history, and track spending habits via a calendar view.

## ✨ Key Features

* **🔐 Authentication:** Secure Login and Registration (JWT & bcrypt).
* **📊 Dashboard:** Real-time overview of Total Balance, Income, and Expenses.
* **📝 Transaction Management:**
    * Add income or expenses with specific **Categories** .
    * **Edit** and **Delete** existing transactions.
    * Visual split between Income and Expense history.
* **📅 Financial Calendar:** Interactive calendar view to track spending 
* **📱 Responsive Design:** Works on desktop and mobile.

## 🚀 Tech Stack

* **Frontend:** React.js (Vite), React Router, React Calendar
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL
* **Authentication:** JSON Web Tokens (JWT)
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
