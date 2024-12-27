import React, { useState, useEffect } from 'react';

import hotIcon from './image/hot_119575.png'; // Image pour le contrôle de température
import moonIcon from './image/moon-night-astronomy-nature-moon-phase-sleep_81483.png'; // Icône du mode clair
import sunIcon from './image/sun_icon-icons.com_61830.png'; // Icône du mode sombre
import x from './image/twitter_x_new_logo_x_rounded_icon_256078.ico';
import insta from './image/1491580635-yumminkysocialmedia26_83102.ico';
import fb from './image/facebook_icon-icons.com_66092.ico';
import FaEnvelope from './image/email_envelope_icon_176696.ico'
import FaPhoneAlt from './image/phone1.ico'
import FaMapMarkerAlt from './image/place_location_.ico'


const TemperatureControl: React.FC = () => {
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
                <h2>Temperature Control</h2>
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
                    <h1 style={{ color: 'var(--secondaryColor)' }}>Maintain Ideal Comfort with Temperature Control</h1>
                    <p>
                        Experience the perfect balance of comfort and energy efficiency with our Temperature Control service. Whether you’re looking to keep your home cool during the summer or warm during the winter, this feature gives you full control over your home’s climate, no matter where you are.
                    </p>
                    <p>
                        With real-time temperature monitoring and the ability to set custom temperature schedules, you can ensure your home is always at the ideal temperature when you arrive. Our intuitive system allows you to adjust the temperature remotely from your smartphone, tablet, or computer, ensuring comfort when you need it most. You can even set alerts to notify you if the temperature rises or falls outside of your desired range, helping you protect your home from extreme conditions like freezing pipes or overheating.
                    </p>
                    <p>
                        Temperature control isn’t just about comfort—it’s also about energy efficiency. By managing your home’s heating and cooling systems effectively, you can save on energy costs while reducing your environmental impact. Our system learns from your preferences and optimizes settings to fit your lifestyle, providing maximum comfort with minimal effort.
                    </p>
                    <p>
                        With this service, your home becomes a smart, responsive environment that adapts to your needs. Enjoy a cozy, energy-efficient home that’s always just the way you like it.
                    </p>
                </div>

                {/* Image */}
                <div style={{ flex: 1 }}>
                    <img
                        src={hotIcon}
                        alt="Temperature Control Icon"
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

export default TemperatureControl;