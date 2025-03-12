import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Footer = () => (
  <footer className="footer">
    <div className="social-media-links">
      <h2>Follow Us</h2>
      <ul>
        <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook" style={{ color: 'blue' }}></i> Facebook</a></li>
        <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter" style={{ color: 'skyblue' }}></i> Twitter</a></li>
        <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram" style={{ color: 'purple' }}></i> Instagram</a></li>
        <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin" style={{ color: 'blue' }}></i> LinkedIn</a></li>
      </ul>
    </div>
    <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
  </footer>
);

export default Footer;
