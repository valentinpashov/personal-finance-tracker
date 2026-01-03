import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css"; 

const Register = () => {
  const navigate = useNavigate();

  // Form state
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: ""
  });

  // Msg state with type - success or error
  const [message, setMessage] = useState(null);

  // Function to track input changes
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  // Function to handle form submission
  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs)
      });

      const parseRes = await response.json();

      if (response.ok) {
        // SUCCESS: Green message
        setMessage({ text: "Успешна регистрация! Пренасочване...", type: "success" });
        
        setTimeout(() => {
          navigate("/login");
        }, 1500);   // 1,5 seconds
      } else {
        // ERROR: Red message
        setMessage({ text: parseRes.message || "Грешка при регистрация", type: "error" });
      }
    } catch (err) {
      console.error(err.message);
      // SERVER ERROR: Red message
      setMessage({ text: "Сървърът не отговаря!", type: "error" });
    }
  };

  return (
    <div className="auth-container">
      <h1>Finance Tracker</h1>
      <h2>Създай профил</h2>
      
      <form onSubmit={onSubmitForm}>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Име (Username)"
            value={inputs.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Имейл адрес"
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
        
        <button type="submit" className="btn-submit">Регистрирай се</button>
      
      </form>

      {/* Message display */}
      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <p style={{ marginTop: "20px", fontSize: "14px" }}>Вече имаш акаунт? <Link to="/login">Влез тук</Link></p>
    </div>
  );
};

export default Register;