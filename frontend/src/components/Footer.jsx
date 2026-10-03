function Footer() {
  return (
    <>
      <style>{`
        .homehero-footer {
          background: #111827;
          color: white;
          padding: 50px 7% 20px;
        }

        .homehero-footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 60px;
          padding-bottom: 40px;
          border-bottom: 1px solid #374151;
        }

        .homehero-footer-logo {
          font-size: 26px;
          font-weight: 800;
          margin-bottom: 15px;
        }

        .homehero-footer-logo span {
          color: #60a5fa;
        }

        .homehero-footer-brand p {
          max-width: 350px;
          color: #9ca3af;
          line-height: 1.7;
          font-size: 14px;
        }

        .homehero-footer-links h3 {
          font-size: 16px;
          margin-bottom: 18px;
        }

        .homehero-footer-links a {
          display: block;
          color: #9ca3af;
          text-decoration: none;
          font-size: 14px;
          margin-bottom: 11px;
          transition: 0.2s;
        }

        .homehero-footer-links a:hover {
          color: #60a5fa;
        }

        .homehero-footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 20px;
          color: #9ca3af;
          font-size: 13px;
        }

        @media (max-width: 700px) {
          .homehero-footer-content {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .homehero-footer-bottom {
            flex-direction: column;
            gap: 10px;
            text-align: center;
          }
        }
      `}</style>

      <footer className="homehero-footer">

        <div className="homehero-footer-content">

          <div className="homehero-footer-brand">
            <div className="homehero-footer-logo">
              Home<span>Hero</span>
            </div>

            <p>
              Your trusted marketplace for everyday home services.
              Connect with reliable professionals and get your work done
              easily.
            </p>
          </div>


          <div className="homehero-footer-links">
            <h3>Quick Links</h3>

            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
          </div>


          <div className="homehero-footer-links">
            <h3>Services</h3>

            <a href="#services">Electrician</a>
            <a href="#services">Plumber</a>
            <a href="#services">AC Repair</a>
            <a href="#services">Carpenter</a>
          </div>

        </div>


        <div className="homehero-footer-bottom">
          <p>
            © 2026 HomeHero. All rights reserved.
          </p>

          <p>
            Service Marketplace
          </p>
        </div>

      </footer>
    </>
  );
}

export default Footer;

