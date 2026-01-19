import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = ({ setAuth }) => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState(null);

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
        // save token and user to localStorage
        localStorage.setItem("token", parseRes.token);
        localStorage.setItem("user", JSON.stringify(parseRes.user));

        // update auth state- we're authenticated
        setAuth(true);
        setMessage({ text: "Успешен вход!", type: "success" });
        navigate("/dashboard");
        
      } else {
        setMessage({ text: parseRes.message || "Грешка при вход", type: "error" }); 
        setAuth(false);  
      }
    } catch (err) {
      console.error(err.message);
      setMessage({ text: "Сървърна грешка", type: "error" });
    }
  };

  return (
    <div className="auth-container">
      <h1>💰 Finance Tracker</h1>
      <h2>Login</h2>
      
      <form onSubmit={onSubmitForm}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={inputs.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={inputs.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-submit">Log in</button>
      </form>

      {message && (
        <div className={`message ${message.type}`}> {message.text} </div>
      )}

     {/* Link to register */}
      <p style={{ marginTop: "20px", fontSize: "14px" }}>
        Don't have an account? <Link to="/register" style={{ color: "#2e7d32", fontWeight: "bold" }}>Register here</Link>
      </p>
    </div>
  );
};

export default Login;