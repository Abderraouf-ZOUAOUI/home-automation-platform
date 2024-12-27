import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        setLoading(true);

        axios
            .post("https://home-automation-platform-api.vercel.app/login", { email, password })
            .then((result) => {
                setLoading(false);
                if (result.data.message === "Success") {
                    localStorage.setItem("token", result.data.token);
                    localStorage.setItem("userEmail", email);

                    axios.defaults.headers.common["Authorization"] = `Bearer ${result.data.token}`;
                    axios.defaults.headers.common["email"] = email;

                    navigate("/dashboard");
                } else {
                    alert(result.data);
                }
            })
            .catch((err) => {
                setLoading(false);
                console.error("Error during login:", err);
                alert("An error occurred. Please try again.");
            });
    };

    const styles = {
        container: {
            background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem",
        },
        card: {
            backgroundColor: "#ffffff",
            padding: "2rem",
            borderRadius: "12px",
            maxWidth: "400px",
            width: "100%",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
        },
        title: {
            color: "#333",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "1.8rem",
            marginBottom: "1.5rem",
        },
        buttonPrimary: {
            backgroundColor: "#66a6ff",
            color: "#ffffff",
            border: "none",
            padding: "0.75rem",
            borderRadius: "6px",
            width: "100%",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "1rem",
            transition: "background-color 0.3s ease",
        },
        buttonPrimaryHover: {
            backgroundColor: "#0056b3",
        },
        buttonSecondary: {
            backgroundColor: "transparent",
            color: "#66a6ff",
            border: "1px solid #66a6ff",
            padding: "0.75rem",
            borderRadius: "6px",
            width: "100%",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "1rem",
            transition: "background-color 0.3s ease, color 0.3s ease",
        },
        buttonSecondaryHover: {
            backgroundColor: "#66a6ff",
            color: "#ffffff",
        },
        formGroup: {
            marginBottom: "1rem",
            textAlign: "left",
        },
        input: {
            width: "100%",
            padding: "0.75rem",
            marginTop: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ddd",
            fontSize: "1rem",
            boxSizing: "border-box",
        },
        linkText: {
            color: "#66a6ff",
            textDecoration: "none",
            fontWeight: "bold",
            marginTop: "1rem",
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Welcome Back</h2>
                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            autoComplete="off"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <button
                        type="submit"
                        style={styles.buttonPrimary}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p>
    Forgot password? <Link to="/reset-password" style={styles.linkText}>Reset it here</Link>
</p>
                <p>Don't have an account? <Link to="/signup" style={styles.linkText}>Register</Link></p>
            </div>
        </div>
    );
}

export default Login;
