import { useState } from "react";

export const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
  const newErrors = {};
  
  if (!name) newErrors.name = "Name is required";
  else if (name.trim().length < 3) newErrors.name = "Name must be at least 3 letters";

  if (!email) newErrors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    newErrors.email = "Invalid email format";

  if (!password) newErrors.password = "Password is required";
  else if (password.length < 7)
    newErrors.password = "Password must be at least 7 characters";

  if (password !== confirmPassword)
    newErrors.confirmPassword = "Passwords do not match";

  return newErrors;
};


  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // TODO: Send to backend
    console.log("Signup submitted:", { name, email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div>
        <label>Email:</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <div>
        <label>Confirm Password:</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
      </div>

      <button type="submit">Signup</button>
    </form>
  );
};
