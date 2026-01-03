import { useState } from "react";

const Register = () => {
  // form input state
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
      // Send the registration data to the server
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs) 
      });

      const parseRes = await response.json();

      if (response.ok) {
        setMessage("Успешна регистрация! Токен: " + parseRes.token.slice(0, 10) + "...");
        console.log("Успех:", parseRes);
      } else {
        setMessage(parseRes.message || "Грешка при регистрация");
      }
    } catch (err) {
      console.error(err.message);
      setMessage("Сървърът не отговаря!");
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", maxWidth: "400px" }}>
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
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Регистрирай се
        </button>
      </form>
      
      {message && <p style={{ color: message.includes("Успех") ? "green" : "red" }}>{message}</p>}
    </div>
  );
};

export default Register;