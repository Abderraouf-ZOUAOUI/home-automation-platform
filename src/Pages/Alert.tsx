import React, { useState, useEffect } from 'react';
import alertImage from './image/alert.png';
import moonIcon from "./image/moon-night-astronomy-nature-moon-phase-sleep_81483.png"; // Icône du mode clair
import sunIcon from "./image/sun_icon-icons.com_61830.png"; // Icône du mode sombre
import x from './image/twitter_x_new_logo_x_rounded_icon_256078.ico';
import insta from './image/1491580635-yumminkysocialmedia26_83102.ico';
import fb from './image/facebook_icon-icons.com_66092.ico';
import FaEnvelope from './image/email_envelope_icon_176696.ico'
import FaPhoneAlt from './image/phone1.ico'
import FaMapMarkerAlt from './image/place_location_.ico'



const AlertNotifications: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);

    // Vérifie le thème précédent dans le localStorage au chargement du composant
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark-theme') {
            setDarkMode(true);
            document.documentElement.classList.add('dark-theme');
        }
    }, []);

    // Bascule entre les thèmes clair et sombre
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.documentElement.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            document.documentElement.classList.remove('dark-theme');
            localStorage.setItem('theme', '');
        }
    };
   
    return (
        <>
            <nav>
                <h2>Alert Notifications</h2>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/Services">Services</a></li>
                    <li><a href="#about">About</a></li>
                </ul>
                {/* Affiche l'icône en fonction du mode sombre ou clair */}
                <img
                    src={darkMode ? sunIcon : moonIcon}
                    id="icon"
                    alt="Theme Toggle Icon"
                    onClick={toggleDarkMode}
                    style={{ cursor: 'pointer', width: '30px', height: '30px' }}
                />
                {/* Log in button */}
                <a href="/login" className="btn" style={{
                    backgroundColor: 'var(--bgColor-2)',  // Applying bgColor-2
                    color: 'var(--lightColor)',            // Applying lightColor for text
                    textDecoration: 'none',                // Removing underline
                    fontWeight: 'bold',                    // Making text bold
                    padding: '0.5rem 1.5rem',              // Padding around the text
                    borderRadius: '30px',                  // Rounded corners
                    transition: 'background-color 0.4s',   // Smooth transition for background color
                }}>Log in</a>
            </nav>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: 'var(--primaryColor)',
                padding: 'var(--padding)',
                color: 'var(--lightColor)',
            }}>
                {/* Texte */}
                <div style={{ flex: 1, paddingRight: 'var(--padding)' }}>
                    <h1 style={{ color: 'var(--secondaryColor)' }}>Stay Informed in Real-Time with Alert Notifications</h1>
                    <p>
                        Protect your home and simplify your daily life with our Alert Notifications service. Receive instant alerts on your smartphone, tablet, or computer whenever an important event is detected in your home. Whether it’s a door opening, unusual movement detected by a sensor, or abnormal temperature readings, you’ll always be immediately informed, no matter where you are.
                    </p>
                    <p>
                        These customizable notifications allow you to set your own rules and priorities. You can choose to be alerted only for critical events, such as an intrusion, or for everyday situations, like a reminder that a light has been left on. With an intuitive interface, you can review the details of each alert, access live video, or take immediate action, such as locking doors or turning off appliances.
                    </p>
                    <p>
                        Alert Notifications transform your home into an intelligent, responsive environment. This service gives you total peace of mind by allowing you to maintain constant control while focusing on what truly matters. With this level of automation, your home watches over you, even when you're far away.
                    </p>
                </div>

                {/* Image */}
                <div style={{ flex: 1 }}>
                    <img
                        src={alertImage}
                        alt="Alert Notifications"
                        style={{ width: '100%', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                    />
                </div>
            </div>
            <div className="Separator"></div>
            <footer className="footer">
  <div className="footer-content">
 <div className="footer-content">
    <div className="footer-section">
      <h3>ABOUT</h3>
      <ul>
        <li>
          <a href="mailto:info@smarthome.dz">
            <img src={FaEnvelope} alt="Email Icon" className="footer-icon" /> info@smarthome.dz
          </a>
        </li>
        <li>
          <a href="tel:+21323XXXXXX">
            <img src={FaPhoneAlt} alt="Phone Icon" className="footer-icon" /> 023 XX XX XX
          </a>
        </li>
        <li>
          <span>
            <img src={FaMapMarkerAlt} alt="Location Icon" className="footer-icon" /> Alger, Algérie
          </span>
        </li>
      </ul>
    </div>
    {/* Autres sections du footer */}
  </div>
    <div className="footer-section">
      <h3>OUR SERVICES</h3>
      <ul>
        <li><a href="/Surveillance">Live video access</a></li>
        <li><a href="/Alert">Alert notifications</a></li>
        <li><a href="/Hstory">Intrusion history</a></li>
        <li><a href="/Temperature">Temperature</a></li>
        <li><a href="/Lighting">Lighting</a></li>
        <li><a href="/Door">The door</a></li>
      </ul>
    </div>
    <div className="footer-section">
      <h3>FOLLOW US</h3>
      <div className="social-links">
        <a href="https://x.com" target="_blank" rel="noopener noreferrer">
          <img src={x} alt="Twitter" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <img src={insta} alt="Instagram" />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <img src={fb} alt="Facebook" />
        </a>
      </div>
    </div>
  </div>
  <div className="footer-bottom">
    <p>© 2024 Smart Home. All rights reserved.</p>
  </div>
</footer>
        </>
    );
};

export default AlertNotifications;