// Importation des modules nécessaires
import React, { useState, useEffect } from 'react';

import surveillance from './image/surveillance.png';
import moonIcon from "./image/moon-night-astronomy-nature-moon-phase-sleep_81483.png"; // Icône du mode clair
import sunIcon from "./image/sun_icon-icons.com_61830.png";
import x from './image/twitter_x_new_logo_x_rounded_icon_256078.ico';
import insta from './image/1491580635-yumminkysocialmedia26_83102.ico';
import fb from './image/facebook_icon-icons.com_66092.ico';
import FaEnvelope from './image/email_envelope_icon_176696.ico'
import FaPhoneAlt from './image/phone1.ico'
import FaMapMarkerAlt from './image/place_location_.ico'


const LiveVideoAccess: React.FC = () => {
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
                <h2>Live Video Access</h2>
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
                />
                <a href="/login" className="btn">Log in</a>
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
                    <h1 style={{ color: 'var(--secondaryColor)' }}>Stay Connected to Your Home, No Matter Where Life Takes You</h1>
                    <p>
                        Imagine being able to check on your home anytime, from anywhere in the world. With our Live Video Access feature, your home is always within reach. This service allows you to stream high-definition video in real-time from your connected cameras directly to your smartphone, tablet, or computer. Whether you're at the office, traveling abroad, or simply relaxing in another room, you'll have a clear view of everything happening at home.
                    </p>
                    <p>
                        Ensure the safety of your loved ones, watch over your pets, or keep track of any unexpected activity with ease. Our secure and user-friendly interface gives you complete control, allowing you to switch between camera views, zoom in on details, and even receive instant alerts for unusual movements. Live Video Access isn’t just about security—it’s about staying connected to what matters most, bringing you peace of mind and the ability to respond quickly when needed.
                    </p>
                    <p>
                        With this service, your home becomes smarter, safer, and truly yours to manage. Embrace the future of home automation with seamless and reliable video monitoring, tailored to fit your lifestyle.
                    </p>
                </div>

                {/* Image */}
                <div style={{ flex: 1 }}>
                    <img
                        src={surveillance}
                        alt="Live Video Access"
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

export default LiveVideoAccess;