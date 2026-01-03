import { useState } from "react";

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
        setMessage("Успешен вход!");
        // Later we will save the token -JWB
        console.log("Token:", parseRes.token);
      } else {
        setMessage(parseRes.message || "Грешка при вход");
      }
    } catch (err) {
      console.error(err.message);
      setMessage("Сървърна грешка");
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", maxWidth: "400px", marginTop: "20px" }}>
      <h2>Вход</h2>
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="Имейл"
          value={inputs.email}
          onChange={handleChange}
          required
          style={{ display: "block", margin: "10px 0", padding: "8px", width: "100%" }}
        />
        <input
          type="password"
          name="password"
          placeholder="Парола"
          value={inputs.password}
          onChange={handleChange}
          required
          style={{ display: "block", margin: "10px 0", padding: "8px", width: "100%" }}
        />
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>Влез</button>
      </form>
      {message && <p style={{ color: message.includes("Успешен") ? "green" : "red" }}>{message}</p>}
    </div>
  );
};

export default Login;