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
* Node.js (v14 or higher)
* PostgreSQL installed and running

### 1. Database Setup
Create a PostgreSQL database named `financetracker` and run the following SQL commands to create the necessary tables:

```sql
CREATE DATABASE financetracker;

\c financetracker;

CREATE TABLE users(
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE transactions(
    id SERIAL PRIMARY KEY,
    user_id UUID,
    description VARCHAR(255),
    amount NUMERIC,
    type VARCHAR(10), -- 'income' or 'expense'
    category VARCHAR(50),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
