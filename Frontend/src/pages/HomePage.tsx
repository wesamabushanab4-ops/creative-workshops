import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-dot" /> MAKING THINGS TOGETHER</span>
          <h1>Good ideas<br />start <em>by hand.</em></h1>
          <p>
            A welcoming place to learn, experiment, and create. Find a workshop,
            meet inspiring instructors, and let your hands lead you somewhere new.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" to="/workshops">Explore workshops <span>→</span></Link>
            <Link className="text-link" to="/about">Our story <span>→</span></Link>
          </div>
          <div className="hero-note"><span className="note-icon">✳</span> Bring your curiosity. We’ll provide the tools.</div>
        </div>
        <div className="hero-art" role="img" aria-label="Handmade pottery and creative tools on a work table">
          <div className="art-sun" />
          <div className="art-card">
            <div className="art-scene">
              <div className="vase vase-one" />
              <div className="vase vase-two" />
              <div className="leaf leaf-one" />
              <div className="leaf leaf-two" />
              <div className="pot pot-one" />
              <div className="pot pot-two" />
              <div className="art-table" />
            </div>
            <div className="art-caption"><span>OPEN STUDIO</span><b>✳</b></div>
          </div>
          <div className="floating-stamp">ROOM<br />TO MAKE</div>
          <span className="art-spark spark-one">✳</span>
          <span className="art-spark spark-two">✴</span>
        </div>
      </section>
      <section className="home-ribbon">
        <div><span className="ribbon-number">01</span><span><b>Learn</b><small>Skilled instructors who love to teach</small></span></div>
        <div><span className="ribbon-number">02</span><span><b>Explore</b><small>Tools and materials are ready for you</small></span></div>
        <div><span className="ribbon-number">03</span><span><b>Create</b><small>Take home something of your own</small></span></div>
        <Link to="/workshops" className="ribbon-link">Find your next workshop <span>→</span></Link>
      </section>
    </div>
  );
}
