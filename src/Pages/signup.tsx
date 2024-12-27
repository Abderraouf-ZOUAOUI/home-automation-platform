import React, { useState } from "react"; 
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { GiBlackBar } from "react-icons/gi";

function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [espid, setEspid] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }
    
        // Vérifier si le champ espid est vide
        if (!espid) {
            alert("Le champ ESPID est requis.");
            return;
        }
    
        // Envoi des données au backend
        axios.post("https://home-automation-platform-api.vercel.app/register", {
            firstName,
            lastName,
            phoneNumber: phone,
            email,
            password,
            espid, // on envoie espid ici
        })
        .then(result => {
            console.log(result);
            navigate("/login");  // Redirection vers la page de login
        })
        .catch(err => {
            console.error(err);
            alert(err.response.data.message || "Erreur lors de l'inscription");
        });
    };

    // Nouvelle couleur #023047
    const primaryColor = "#023047"; // Couleur primaire
    const secondaryColor = "#023047"; // Couleur secondaire
    const lightColor = "#ffffff"; // Couleur blanche
    const bgColor1 = "#023047"; // Fond avec la couleur primaire

    const styles = {
        container: {
            backgroundColor: bgColor1,
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        card: {
            backgroundColor: lightColor,
            padding: "2rem",
            borderRadius: "8px",
            maxWidth: "600px",
            width: "100%",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
        title: {
            color: primaryColor,
            textAlign: "center",
            marginBottom: "1rem",
        },
        formGroup: {
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
        },
        input: {
            width: "48%",  // Ajuster la largeur pour un style horizontal
        },
        fullWidthInput: {
            width: "100%",  // Pour les champs à largeur pleine
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginBottom: "1rem",
        },
        buttonPrimary: {
            backgroundColor: primaryColor,
            color: lightColor,
            border: "none",
            padding: "10px", // Padding ajusté pour la cohérence
            borderRadius: "4px",
            cursor: "pointer",
            width: "100%",  // Le bouton prend toute la largeur
            fontSize: "16px",  // Même taille de police que les champs de saisie
        },
        buttonSecondary: {
            backgroundColor: lightColor,
            color: primaryColor,
            border: "1px solid " + primaryColor,
            padding: "10px", // Padding ajusté pour la cohérence
            borderRadius: "4px",
            cursor: "pointer",
            width: "100%",  // Le bouton prend toute la largeur
            fontSize: "16px",  // Même taille de police que les champs de saisie
        },
        espIdInput: {
            marginBottom: "1rem", // Espacement entre ESPID et Sign Up
        },
        submitButtonWrapper: {
            display: "flex",
            justifyContent: "center", // Centrer le bouton
            marginTop: "1.5rem",
        },
        // Flex container pour le champ ESPID
        espIdGroup: {
            display: "block", // Changer en bloc pour aligner verticalement
            marginBottom: "1rem",
        },
        espIdInputWrapper: {
            width: "100%",  // Assurer que l'input ESPID prend toute la largeur
        },
        espIdLabel: {
            marginBottom: "0.5rem", // Réduire l'espacement
            fontWeight: "bold",  // Garder l'étiquette en gras
            color: primaryColor, // Appliquer la couleur primaire au label
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Sign Up</h2>

                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <div className="mb-3" style={styles.input}>
                            <label htmlFor="firstName"><strong>First Name</strong></label>
                            <input type="text" placeholder='Enter your first name' autoComplete='off' className='form-control rounded-0' onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="mb-3" style={styles.input}>
                            <label htmlFor="lastName"><strong>Last Name</strong></label>
                            <input type="text" placeholder='Enter your last name' autoComplete='off' className='form-control rounded-0' onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </div>

                    <div style={styles.formGroup}>
                        <div className="mb-3" style={styles.input}>
                            <label htmlFor="phone"><strong>Phone Number</strong></label>
                            <input type="text" placeholder='Enter your phone number' autoComplete='off' className='form-control rounded-0' onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="mb-3" style={styles.input}>
                            <label htmlFor="email"><strong>Email</strong></label>
                            <input type="email" placeholder='Enter your email' autoComplete='off' className='form-control rounded-0' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>

                    <div style={styles.formGroup}>
                        <div className="mb-3" style={styles.input}>
                            <label htmlFor="password"><strong>Password</strong></label>
                            <input type="password" placeholder='Enter your password' className='form-control rounded-0' onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="mb-3" style={styles.input}>
                            <label htmlFor="confirmPassword"><strong>Confirm Password</strong></label>
                            <input type="password" placeholder='Confirm your password' className='form-control rounded-0' onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                    </div>

                    {/* ESPID field placé juste avant Confirm Password */}
                    <div style={styles.espIdGroup}>
                        <label htmlFor="espId" style={styles.espIdLabel}><strong>ESPID</strong></label>
                        <input type="text" placeholder="Enter your ESP ID" className='form-control rounded-0' onChange={(e) => setEspid(e.target.value)} style={styles.fullWidthInput} />
                    </div>

                    {/* Centered submit button */}
                    <div style={styles.submitButtonWrapper}>
                        <button type="submit" className="btn w-100 rounded-0" style={styles.buttonPrimary}>Sign Up</button>
                    </div>
                </form>

                <p className="text-center mt-3">Already have an account?</p>
                <div style={styles.submitButtonWrapper}>
                    <Link to="/login" className="btn w-100 rounded-0" style={styles.buttonSecondary}>Log In</Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
