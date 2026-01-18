import React, { createContext, useState, useContext } from 'react';

const translations = {
  bg: {
    nav_dashboard: "Табло",
    nav_calendar: "Календар",
    nav_stats: "Статистика",
    nav_report: "Отчет",
    nav_profile: "Профил",
    nav_logout: "Изход",
    
    balance: "Баланс",
    income: "Приходи",
    expense: "Разходи",
    history: "История на транзакциите",
    no_transactions: "Няма скорошни транзакции.",
    
    personal_info: "Лична информация",
    reg_date: "Дата на регистрация",
    user_id: "Потребителско ID",
    password: "Парола",
    pro_member: "Pro Член",
    
    financial_analysis: "Финансов Анализ",
    financial_report: "Финансов Отчет",
    expenses_by_category: "Разходи по категории",
    top_categories: "Топ Категории",
    distribution: "Разпределение",
    total: "Общо",
    details: "Детайлен отчет",
    no_data: "Няма данни за разходи.",
    
    calendar_title: "Финансов Календар",
    transactions_for: "Транзакции за",
    no_records_day: "Няма записи за този ден.",
    
    // Filters and Report
    balance_period: "Баланс (Период)",
    period_details: "Детайли за периода",
    today: "Днес",
    week: "7 Дни",
    month: "Месец",
    year: "Година",
    all: "Всички",
    
    save: "Запази",
    cancel: "Отказ",
    edit: "Редактирай",
    delete: "Изтрий",

    // Transaction Form
    add_transaction_title: "Добави транзакция",
    select_category_placeholder: "Избери категория...",
    amount_placeholder: "Сума",
    note_placeholder: "Бележка (по желание)",
    btn_add: "Добави",
    select_income_title: "Избери Приход",
    select_expense_title: "Избери Разход",
    
    // Categories
    cat_Food: "Храна",
    cat_Transport: "Транспорт",
    cat_Rent: "Наем",
    cat_Bills: "Сметки",
    cat_Entertainment: "Забавление",
    cat_Health: "Здраве",
    cat_Shopping: "Пазаруване",
    cat_Other: "Други",
    cat_Salary: "Заплата",
    cat_Bonus: "Бонус",
    cat_Gift: "Подарък",
    cat_Sale: "Продажба"
  },
  en: {
    nav_dashboard: "Dashboard",
    nav_calendar: "Calendar",
    nav_stats: "Statistics",
    nav_report: "Report",
    nav_profile: "Profile",
    nav_logout: "Logout",
    
    balance: "Balance",
    income: "Income",
    expense: "Expenses",
    history: "Transaction History",
    no_transactions: "No recent transactions.",

    personal_info: "Personal Info",
    reg_date: "Registration Date",
    user_id: "User ID",
    password: "Password",
    pro_member: "Pro Member",

    financial_analysis: "Financial Analysis",
    financial_report: "Financial Report",
    expenses_by_category: "Expenses by Category",
    top_categories: "Top Categories",
    distribution: "Distribution",
    total: "Total",
    details: "Detailed Report",
    no_data: "No expense data available.",

    calendar_title: "Financial Calendar",
    transactions_for: "Transactions for",
    no_records_day: "No records for this day.",

    // Filters & Report
    balance_period: "Balance (Period)",
    period_details: "Period Details",
    today: "Today",
    week: "7 Days",
    month: "Month",
    year: "Year",
    all: "All",

    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",

    // Transaction Form
    add_transaction_title: "Add Transaction",
    select_category_placeholder: "Select category...",
    amount_placeholder: "Amount",
    note_placeholder: "Note (optional)",
    btn_add: "Add",
    select_income_title: "Select Income",
    select_expense_title: "Select Expense",

    // Categories
    cat_Food: "Food",
    cat_Transport: "Transport",
    cat_Rent: "Rent",
    cat_Bills: "Bills",
    cat_Entertainment: "Entertainment",
    cat_Health: "Health",
    cat_Shopping: "Shopping",
    cat_Other: "Other",
    cat_Salary: "Salary",
    cat_Bonus: "Bonus",
    cat_Gift: "Gift",
    cat_Sale: "Sale"
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("bg");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "bg" ? "en" : "bg"));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext);