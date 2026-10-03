function Hero() {
  return (
    <section className="hero" id="home">

      <div className="hero-content">

        <p className="hero-small-text">
          YOUR TRUSTED SERVICE MARKETPLACE
        </p>

        <h1>
          Find Trusted Professionals
          <br />
          <span>For Your Everyday Needs</span>
        </h1>

        <p className="hero-description">
          From electricians and plumbers to tutors and carpenters,
          HomeHero connects you with reliable service providers near you.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">
            Explore Services
          </button>

          <button className="secondary-btn">
            Become a Provider
          </button>
        </div>

      </div>

      <div className="hero-card">

        <div className="card-icon">🏠</div>

        <h3>Home Services</h3>

        <p>
          Reliable professionals at your fingertips.
        </p>

        <div className="mini-services">
          <span>⚡ Electrician</span>
          <span>🔧 Plumber</span>
          <span>❄️ AC Repair</span>
          <span>📚 Tutor</span>
        </div>

      </div>

    </section>
  );
}

export default Hero;
