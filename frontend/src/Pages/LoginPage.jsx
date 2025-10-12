import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./LoginPage.css";

export function LoginPage() {
  const { setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState({});

  // Signup state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupErrors, setSignupErrors] = useState({});

  const [successMessage, setSuccessMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate single field (onBlur)
  const validateField = (form, field, value) => {
    let message = "";

    if (form === "signup") {
      if (field === "name") {
        if (!value.trim()) message = "Name is required";
        else if (value.trim().length < 3) message = "Name must be at least 3 letters";
      }
      if (field === "email") {
        if (!value.trim()) message = "Email is required";
        else if (!emailRegex.test(value)) message = "Invalid email format";
      }
      if (field === "password") {
        if (!value) message = "Password is required";
        else if (value.length < 7) message = "Password must be at least 7 characters";
      }
      setSignupErrors((prev) => ({ ...prev, [field]: message }));
    }

    if (form === "login") {
      if (field === "email") {
        if (!value.trim()) message = "Email is required";
        else if (!emailRegex.test(value)) message = "Invalid email format";
      }
      if (field === "password") {
        if (!value) message = "Password is required";
      }
      setLoginErrors((prev) => ({ ...prev, [field]: message }));
    }
  };

  // Validate all fields (on submit)
  const validateAll = () => {
    const newErrors = {};
    if (isSignup) {
      if (!signupName.trim()) newErrors.name = "Name is required";
      else if (signupName.trim().length < 3) newErrors.name = "Name must be at least 3 letters";

      if (!signupEmail.trim()) newErrors.email = "Email is required";
      else if (!emailRegex.test(signupEmail)) newErrors.email = "Invalid email format";

      if (!signupPassword) newErrors.password = "Password is required";
      else if (signupPassword.length < 7) newErrors.password = "Password must be at least 7 characters";
    } else {
      if (!loginEmail.trim()) newErrors.email = "Email is required";
      else if (!emailRegex.test(loginEmail)) newErrors.email = "Invalid email format";

      if (!loginPassword) newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoginErrors({});
    setSignupErrors({});
    setSuccessMessage("");

    const newErrors = validateAll();
    if (Object.keys(newErrors).length > 0) {
      if (isSignup) setSignupErrors(newErrors);
      else setLoginErrors(newErrors);
      return;
    }

    try {
      const url = isSignup
        ? "http://localhost:5000/api/users/signup"
        : "http://localhost:5000/api/users/login";

      const body = isSignup
        ? { name: signupName, email: signupEmail, password: signupPassword }
        : { email: loginEmail, password: loginPassword };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        if (isSignup) setSignupErrors({ general: data.message || "Something went wrong" });
        else setLoginErrors({ general: data.message || "Something went wrong" });
        return;
      }

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

   setSuccessMessage(isSignup ? "Signup successful!" : "Login successful!");
navigate("/");

    } catch (err) {
      console.error(err);
      if (isSignup) setSignupErrors({ general: "Network error" });
      else setLoginErrors({ general: "Network error" });
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>

        {isSignup && (
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={signupName}
              onChange={(e) => {
                setSignupName(e.target.value);
                setSignupErrors((prev) => ({ ...prev, name: "" }));
              }}
              onBlur={(e) => validateField("signup", "name", e.target.value)}
            />
            {signupErrors.name && <p className="error">{signupErrors.name}</p>}
          </div>
        )}

        <div>
          <input
            type="email"
            placeholder="Email"
            value={isSignup ? signupEmail : loginEmail}
            onChange={(e) => {
              if (isSignup) {
                setSignupEmail(e.target.value);
                setSignupErrors((prev) => ({ ...prev, email: "" }));
              } else {
                setLoginEmail(e.target.value);
                setLoginErrors((prev) => ({ ...prev, email: "" }));
              }
            }}
            onBlur={(e) => validateField(isSignup ? "signup" : "login", "email", e.target.value)}
          />
          {(isSignup ? signupErrors.email : loginErrors.email) && (
            <p className="error">{isSignup ? signupErrors.email : loginErrors.email}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={isSignup ? signupPassword : loginPassword}
            onChange={(e) => {
              if (isSignup) {
                setSignupPassword(e.target.value);
                setSignupErrors((prev) => ({ ...prev, password: "" }));
              } else {
                setLoginPassword(e.target.value);
                setLoginErrors((prev) => ({ ...prev, password: "" }));
              }
            }}
            onBlur={(e) => validateField(isSignup ? "signup" : "login", "password", e.target.value)}
          />
          {(isSignup ? signupErrors.password : loginErrors.password) && (
            <p className="error">{isSignup ? signupErrors.password : loginErrors.password}</p>
          )}
        </div>

        {(isSignup ? signupErrors.general : loginErrors.general) && (
          <p className="error">{isSignup ? signupErrors.general : loginErrors.general}</p>
        )}

        {successMessage && <p className="success">{successMessage}</p>}

        <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>

        <p className="toggle-link">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
}
