import { useState } from "react";
import "./Login.css";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs)
      });

      const parseRes = await response.json();

      if (response.ok) {
        setMessage({ text: "Успешен вход!", type: "success" });
        console.log("Token:", parseRes.token);
        // Here we can later save the token
      } else {
        setMessage({ text: parseRes.message || "Грешка при вход", type: "error" });
      }
    } catch (err) {
      console.error(err.message);
      setMessage({ text: "Сървърна грешка", type: "error" });
    }
  };

  return (
    <div className="auth-container">
      <h1>Personal Finance Tracker</h1>
      <h2>Вход в системата</h2>
      
      <form onSubmit={onSubmitForm}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Имейл"
            value={inputs.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Парола"
            value={inputs.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="btn-submit">Влез</button>
      </form>

      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default Login;