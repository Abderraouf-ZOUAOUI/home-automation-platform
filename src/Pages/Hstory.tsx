import React, { useState, useEffect } from 'react';

import pastIcon from './imagesec/Past_icon-icons.com_55841.png'; // Image pour l'historique des intrusions
import moonIcon from './image/moon-night-astronomy-nature-moon-phase-sleep_81483.png'; // Icône du mode clair
import sunIcon from './image/sun_icon-icons.com_61830.png'; // Icône du mode sombre
import x from './image/twitter_x_new_logo_x_rounded_icon_256078.ico';
import insta from './image/1491580635-yumminkysocialmedia26_83102.ico';
import fb from './image/facebook_icon-icons.com_66092.ico';
import FaEnvelope from './image/email_envelope_icon_176696.ico'
import FaPhoneAlt from './image/phone1.ico'
import FaMapMarkerAlt from './image/place_location_.ico'



const IntrusionHistory: React.FC = () => {
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
                <h2>Intrusion History</h2>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/Services">Services</a></li>
                    <li><a href="/About">About</a></li>
                </ul>
                {/* Affiche l'icône en fonction du mode sombre ou clair */}
                <img
                    src={darkMode ? sunIcon : moonIcon}
                    id="icon"
                    alt="Theme Toggle Icon"
                    onClick={toggleDarkMode}
                    style={{ cursor: 'pointer', width: '30px' }}
                />
                <a href="/login" className="btn">Log in</a>
            </nav>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    backgroundColor: 'var(--primaryColor)',
                    padding: 'var(--padding)',
                    color: 'var(--lightColor)',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {/* Texte */}
                <div style={{ flex: 1, paddingRight: 'var(--padding)', padding: '1rem' }}>
                    <h1 style={{ color: 'var(--secondaryColor)' }}>Review Past Events with Intrusion History</h1>
                    <p>
                        Gain valuable insights into the security of your home with our Intrusion History feature. This service allows you to review all past security events, helping you track and analyze any unusual activity. Whether it’s an attempted break-in, unauthorized access, or a false alarm, Intrusion History provides a detailed log of each incident, including the time, date, and specific event details.
                    </p>
                    <p>
                        By having a complete record of every security alert, you can easily identify patterns, assess potential risks, and take proactive steps to enhance your home’s security. The intuitive interface lets you filter and search through past events, making it simple to access the information you need. You can even view associated video footage, giving you a clearer understanding of the situation.
                    </p>
                    <p>
                        Intrusion History empowers you to stay informed and in control of your home’s security. It’s more than just a log of past events—it’s a tool that helps you continuously improve your home’s protection and maintain peace of mind. With this service, you can always be confident that your home is safe and secure, no matter where you are.
                    </p>
                </div>

                {/* Image */}
                <div style={{ flex: 1 }}>
                    <img
                        src={pastIcon}
                        alt="Intrusion History Icon"
                        style={{
                            width: '100%',
                            borderRadius: '10px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                            objectFit: 'cover',
                            maxHeight: '500px',
                        }}
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

export default IntrusionHistory;