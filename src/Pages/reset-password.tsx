// reset-password.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface FormState {
    firstName: string;
    lastName: string;
    newPassword: string;
    confirmPassword: string;
}

const PasswordReset: React.FC = () => {
    const [formData, setFormData] = useState<FormState>({
        firstName: '',
        lastName: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [step, setStep] = useState<'verify' | 'reset'>('verify');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleVerifySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/verify-name', {
                firstName: formData.firstName,
                lastName: formData.lastName
            });
            setStep('reset');
        } catch (err) {
            alert('Name not found');
        } finally {
            setLoading(false);
        }
    };

    const handleResetSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/reset-password', {
                firstName: formData.firstName,
                lastName: formData.lastName,
                newPassword: formData.newPassword
            });
            alert('Password reset successful');
            navigate('/login');
        } catch (err) {
            alert('Error resetting password');
        } finally {
            setLoading(false);
        }
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
        },
        input: {
            width: "100%",
            padding: "0.75rem",
            marginBottom: "1rem",
            borderRadius: "6px",
            border: "1px solid #ddd",
        },
        button: {
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "#66a6ff",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
        },
        link: {
            display: "block",
            textAlign: "center",
            marginTop: "1rem",
            color: "#66a6ff",
            textDecoration: "none"
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {step === 'verify' ? (
                    <form onSubmit={handleVerifySubmit}>
                        <h2>Reset Password</h2>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Enter your first name"
                            value={formData.firstName}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Enter your last name"
                            value={formData.lastName}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                        <button 
                            type="submit" 
                            style={styles.button}
                            disabled={loading}
                        >
                            {loading ? 'Verifying...' : 'Verify Name'}
                        </button>
                        <Link to="/login" style={styles.link}>Back to Login</Link>
                    </form>
                ) : (
                    <form onSubmit={handleResetSubmit}>
                        <h2>Enter New Password</h2>
                        <input
                            type="password"
                            name="newPassword"
                            placeholder="Enter new password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm new password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                        <button 
                            type="submit" 
                            style={styles.button}
                            disabled={loading}
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default PasswordReset;
