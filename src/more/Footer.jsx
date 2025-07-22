import { Link } from "react-router-dom";
import logoo from "../Assets/app_logo.png"; // Assuming you have this image
import "./Footer.css";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* Footer Logo and Social Links */}
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="footer-logo">
              <Link to="/">
                <img src={logoo} alt="Logo" />
              </Link>
              
              
            </div>
          </div>

          {/* Company Links */}
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="footer-links">
              <h5>Company</h5>
              <ul>

                <li><Link to="/about">About</Link></li>
                <li><Link to="/">Features</Link></li>
                <li><Link to="/">Works</Link></li>
                <li><Link to="/">Career</Link></li>
              </ul>
            </div>
          </div>

          {/* Help Links */}
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="footer-links">
              <h5>Help</h5>
              <ul>
                <li><Link to="/contact">Customer Support</Link></li>
                <li><Link to="/">Terms & Conditions</Link></li>
                <li><Link to="/">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* FAQ Links */}
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="footer-links">
              <h5>FAQ</h5>
              <ul>
                <li><Link to="/">Account</Link></li>
                <li><Link to="/">Payments</Link></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="copyright">
          <p>&copy; 2025 Tiny Tulsi Mart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
