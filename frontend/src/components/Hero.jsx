
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const handleExploreServices = () => {
    document
      .getElementById("services")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <section className="hero" id="home">
      <div className="hero-background-shape hero-shape-one"></div>
      <div className="hero-background-shape hero-shape-two"></div>

      <div className="hero-content">

        <div className="hero-badge">
          <span className="badge-dot"></span>
          Trusted Home Service Marketplace
        </div>

        <h1>
          Reliable help,
          <br />
          <span>right when you need it.</span>
        </h1>

        <p className="hero-description">
          Find trusted professionals for everyday home services.
          From repairs and maintenance to tutoring, HomeHero
          makes booking simple and reliable.
        </p>

        <div className="hero-buttons">
          <button
            className="primary-btn"
            onClick={handleExploreServices}
          >
            Explore Services
            <span>→</span>
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/register")}
          >
            Become a Provider
          </button>
        </div>

        <div className="hero-trust">

          <div className="trust-avatars">
            <span>R</span>
            <span>A</span>
            <span>S</span>
            <span>+</span>
          </div>

          <div className="trust-text">
            <strong>Trusted by customers</strong>
            <span>for their everyday service needs</span>
          </div>

        </div>
      </div>

      <div className="hero-visual">

        <div className="hero-main-card">

          <div className="hero-card-top">
            <div>
              <span className="card-label">
                HOME SERVICES
              </span>

              <h3>
                Everything your home needs.
              </h3>
            </div>

            <div className="hero-card-icon">
              H
            </div>
          </div>

          <div className="hero-service-list">

            <div className="hero-service-item">
              <div className="service-item-icon electrician">
                ⚡
              </div>

              <div>
                <strong>Electrician</strong>
                <span>Quick & reliable repairs</span>
              </div>

              <span className="service-arrow">
                →
              </span>
            </div>

            <div className="hero-service-item">
              <div className="service-item-icon plumber">
                🔧
              </div>

              <div>
                <strong>Plumbing</strong>
                <span>Fix leaks & pipe issues</span>
              </div>

              <span className="service-arrow">
                →
              </span>
            </div>

            <div className="hero-service-item">
              <div className="service-item-icon ac">
                ❄️
              </div>

              <div>
                <strong>AC Repair</strong>
                <span>Stay cool & comfortable</span>
              </div>

              <span className="service-arrow">
                →
              </span>
            </div>

            <div className="hero-service-item">
              <div className="service-item-icon tutor">
                📚
              </div>

              <div>
                <strong>Tutoring</strong>
                <span>Learn from professionals</span>
              </div>

              <span className="service-arrow">
                →
              </span>
            </div>

          </div>

          <div className="hero-card-footer">
            <span>
              <span className="online-dot"></span>
              Professionals available
            </span>

            <button onClick={handleExploreServices}>
              View all
            </button>
          </div>

        </div>

        <div className="floating-stat-card">
          <div className="stat-icon">
            ✓
          </div>

          <div>
            <strong>Trusted</strong>
            <span>Professionals</span>
          </div>
        </div>

        <div className="floating-location-card">
          <span className="location-icon">
            ◎
          </span>

          <div>
            <strong>Near you</strong>
            <span>Local service providers</span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;

