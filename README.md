# 💰 Personal Finance Tracker

A full-stack application for tracking personal finances. Users can manage their income and expenses, view their balance history, and track spending habits via a calendar view.

## ✨ Key Features

* **🔐 Authentication:** Secure Login and Registration (JWT & bcrypt).
* **📊 Dynamic Dashboard:** Real-time overview of Total Balance, Income, and Expenses.
* **📈 Financial Analytics:** Visual charts (Doughnut & Bar charts) for category analysis.
* **📝 Transaction Management:**
    * Add income or expenses with specific **Categories** .
    * **Edit** and **Delete** existing transactions.
    * Visual split between Income and Expense history.
* **📅 Financial Calendar:** Interactive calendar view to track spending 
* **📱 Responsive Design:** Works on desktop and mobile.
* **🌍 Multi-language Support:** Seamlessly switch between English and Bulgarian.

## 🚀 Tech Stack

* **Frontend:** React.js (Vite), React Router, React Calendar
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL
* **Authentication:** JSON Web Tokens (JWT)

## 📂 Project Structure

The project is organized into a monolithic repository structure with separate directories for the **client** and **server**.

```text
PERSONAL-FINANCE-TRACKER/
├── client/                      # Frontend (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/          # UI Components & Pages
│   │   │   ├── CalendarPage.jsx # Transaction Calendar View
│   │   │   ├── Dashboard.jsx    # Main Stats & Balance
│   │   │   ├── InputTransaction.jsx # Add Income/Expense Form
│   │   │   ├── ListTransactions.jsx # Transaction History List
│   │   │   ├── StatsPage.jsx    # Charts & Analysis (Chart.js)
│   │   │   ├── ReportPage.jsx   # Detailed Financial Reports
│   │   │   ├── ProfilePage.jsx  # User Profile Info
│   │   │   ├── Navbar.jsx       # Navigation & Language Toggle
│   │   │   ├── Layout.jsx       # Main Page Wrapper
│   │   │   ├── Login.jsx        # Auth: Login Page
│   │   │   ├── Register.jsx     # Auth: Register Page
│   │   │   └── ... (CSS files for each component)
│   │   ├── App.jsx              # Main App Routing
│   │   ├── LanguageContext.jsx  # Context for BG/EN Translation
│   │   └── main.jsx             # React Entry Point
│   ├── index.html
│   └── vite.config.js
│
├── server/                      # Backend (Node.js + Express)
│   ├── db.js                    # PostgreSQL Connection Config
│   ├── index.js                 # API Routes & Server Logic
│   └── .env                     # Environment Variables (Ignored)
│
└── README.md                    # Project Documentation
```

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
```

### 2. Backend Setup
Navigate to the server folder and install dependencies:
```
cd server
npm install
```

Create a .env file in the server folder with your configuration:
```
PG_USER=postgres
PG_PASSWORD=your_db_password
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=financetracker
jwtSecret=your_secret_key_here
```

Start the server:
```
npx nodemon index.js
```
### 3. Frontend Setup
Navigate to the client folder:
```
cd client
npm install
```
Start the React application:
```
npm run dev
```
