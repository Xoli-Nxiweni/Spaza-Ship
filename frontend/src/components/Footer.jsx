import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3 className="footer-title">SPAZAHUB</h3>
        <p className="footer-description">Your one-stop shop for all your needs.</p>
        <div className="social-links">
          <a href="#" aria-label="Facebook" className="social-link">Facebook</a>
          <a href="#" aria-label="Twitter" className="social-link">Twitter</a>
          <a href="#" aria-label="Instagram" className="social-link">Instagram</a>
          <a href="#" aria-label="LinkedIn" className="social-link">LinkedIn</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} SPAZAHUB. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
