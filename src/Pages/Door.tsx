import React, { useState, useEffect } from 'react';

import doorIcon from './image/pull_door_icon_154953.png'; // Image pour Smart Door
import moonIcon from './image/moon-night-astronomy-nature-moon-phase-sleep_81483.png'; // Icône du mode clair
import sunIcon from './image/sun_icon-icons.com_61830.png'; // Icône du mode sombre
import x from './image/twitter_x_new_logo_x_rounded_icon_256078.ico';
import insta from './image/1491580635-yumminkysocialmedia26_83102.ico';
import fb from './image/facebook_icon-icons.com_66092.ico';
import FaEnvelope from './image/email_envelope_icon_176696.ico'
import FaPhoneAlt from './image/phone1.ico'
import FaMapMarkerAlt from './image/place_location_.ico'



const SmartDoorManagement: React.FC = () => {
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
                <h2>Smart Door Management</h2>
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
                    <h1 style={{ color: 'var(--secondaryColor)' }}>Control Your Home’s Entry with Smart Door Management</h1>
                    <p>
                        Ensure the security and convenience of your home with our Smart Door service. Whether you’re inside or away, this feature allows you to manage your doors remotely, giving you full control over who enters and exits your home. Lock or unlock your doors from anywhere using your smartphone, tablet, or computer, and enjoy complete peace of mind knowing your home is secure.
                    </p>
                    <p>
                        With customizable access settings, you can create keyless entry systems, allowing family members, guests, or service personnel to access your home using codes or temporary access links. This eliminates the need for physical keys and ensures that only authorized individuals can enter. You can even monitor door activity in real-time, receiving notifications whenever someone enters or exits, providing an additional layer of security.
                    </p>
                    <p>
                        The integration of smart locks means you can also set automatic locking schedules, ensuring your doors are always securely locked when needed, such as when you leave home for the day or during the night. Plus, with tamper alerts, you’ll be notified if someone attempts to force the door open, ensuring your home stays protected at all times.
                    </p>
                    <p>
                        With this service, you have complete control over your home’s entry points, giving you a seamless blend of security, convenience, and flexibility. Say goodbye to lost keys and welcome a smarter, safer home where you’re always in control.
                    </p>
                </div>

                {/* Image */}
                <div style={{ flex: 1 }}>
                    <img
                        src={doorIcon}
                        alt="Smart Door Icon"
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

export default SmartDoorManagement;