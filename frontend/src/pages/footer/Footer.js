import './footer.css'
import Jyothi_Image from '../../images/Jyothi.png'
export default function Footer() {
    return (
        <footer className="canteen-footer">
          <div className="footer-content">
            <div className="footer-logo">
              <img
                src={Jyothi_Image} 
                alt="Canteen Logo"
                width="50"
                height="50"
              />
              <span><i>Jyothi canteen </i> </span>
             
            </div>
            
            <div className="footer-info">
              <p>Jyothi Engineering College, Cheruthuruthi</p>
              <p>Phone: 97556142747</p>
              <p>Email: Jyothi@gmail.com</p>
            </div>
          </div>
    
          <div className="footer-bottom">
            <p>&copy; 2024 Canteen. All rights reserved.</p>
          </div>
        </footer>
      );
  }