import React, { useState, useEffect } from 'react';

import lightingIcon from './image/chandelier_light_lamp_house_icon_229852.png'; // Image pour Smart Lighting
import moonIcon from './image/moon-night-astronomy-nature-moon-phase-sleep_81483.png'; // Icône du mode clair
import sunIcon from './image/sun_icon-icons.com_61830.png'; // Icône du mode sombre
import x from './image/twitter_x_new_logo_x_rounded_icon_256078.ico';
import insta from './image/1491580635-yumminkysocialmedia26_83102.ico';
import fb from './image/facebook_icon-icons.com_66092.ico';
import FaEnvelope from './image/email_envelope_icon_176696.ico'
import FaPhoneAlt from './image/phone1.ico'
import FaMapMarkerAlt from './image/place_location_.ico'


const SmartLighting: React.FC = () => {
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
                <h2>Smart Lighting</h2>
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
                    <h1 style={{ color: 'var(--secondaryColor)' }}>Set the Perfect Ambiance with Smart Lighting</h1>
                    <p>
                        Transform the atmosphere of your home with our Smart Lighting service. Whether you want bright, energetic lighting for your living room or soft, relaxing lights for your bedroom, this feature gives you full control over your home’s lighting, all from the convenience of your smartphone, tablet, or computer.
                    </p>
                    <p>
                        With customizable lighting schedules, you can set your lights to automatically adjust based on your daily routine. Wake up to gradual brightening lights in the morning, and set them to dim in the evening to create a calming ambiance. You can even control each light independently, turning them on and off or adjusting brightness levels from anywhere, ensuring your home is always just the way you like it.
                    </p>
                    <p>
                        Our system also integrates with motion sensors, so lights can automatically turn on when you enter a room and turn off when you leave, saving energy while providing convenience. Plus, with energy-efficient LED lighting, you can create the perfect atmosphere without worrying about your electricity bill.
                    </p>
                    <p>
                        Smart Lighting isn’t just about functionality; it’s about creating the perfect environment for every moment. Whether you’re hosting a party, watching a movie, or enjoying a quiet evening at home, you can easily adjust the lighting to suit the occasion.
                    </p>
                    <p>
                        With this service, your home’s lighting becomes intelligent and adaptive, making your living space more comfortable, energy-efficient, and personalized.
                    </p>
                </div>

                {/* Image */}
                <div style={{ flex: 1 }}>
                    <img
                        src={lightingIcon}
                        alt="Smart Lighting Icon"
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

export default SmartLighting;