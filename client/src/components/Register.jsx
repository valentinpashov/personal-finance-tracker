import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  // form state
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  // function to handle input changes
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  // function to handle form submission
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
        // Successful case
        setMessage("Успешна регистрация! Пренасочване...");
        
        // Wait 1.5 seconds and redirect
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        // Error case (e.g., email taken)
        setMessage(parseRes.message || "Грешка при регистрация");
      }
    } catch (err) {
      console.error(err.message);
      setMessage("Сървърът не отговаря!");
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Регистрация</h2>
      <form onSubmit={onSubmitForm}>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Име (Username)"
            value={inputs.username}
            onChange={handleChange}
            required
            style={{ display: "block", margin: "10px 0", padding: "8px", width: "100%" }}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Имейл"
            value={inputs.email}
            onChange={handleChange}
            required
            style={{ display: "block", margin: "10px 0", padding: "8px", width: "100%" }}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Парола"
            value={inputs.password}
            onChange={handleChange}
            required
            style={{ display: "block", margin: "10px 0", padding: "8px", width: "100%" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer", width: "100%" }}>
          Регистрирай се
        </button>
      </form>

      {/* Message for error or success */}
      {message && (
        <p style={{ color: message.includes("Успеш") ? "green" : "red", marginTop: "10px" }}>
          {message}
        </p>
      )}

      {/* Link to login page */}
      <p style={{ marginTop: "15px", fontSize: "14px" }}>
        Вече имаш акаунт? <Link to="/login" style={{ color: "blue" }}>Влез тук</Link>
      </p>
    </div>
  );
};

export default Register;