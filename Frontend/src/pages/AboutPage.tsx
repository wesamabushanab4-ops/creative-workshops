import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="page inner-page">
      <div className="page-heading">
        <span className="eyebrow"><span className="eyebrow-dot" /> NICE TO MEET YOU</span>
        <h1>About Maker House</h1>
        <p>A community creative center where everyone has room to make.</p>
      </div>
      <section className="about-grid">
        <div className="about-copy">
          <span className="section-kicker">OUR STORY</span>
          <h2>A place for making,<br /><em>community, and ideas.</em></h2>
          <p>
            Maker House is home to hands-on workshops and curious minds. Discover
            a new craft, explore different materials, and learn from instructors
            who love sharing what they know.
          </p>
          <p>
            Use this site to browse workshops by instructor, check session times,
            and help our team keep the creative calendar up to date.
          </p>
          <div className="developer-card">
            <span className="developer-avatar">✳</span>
            <span><small>BUILT BY</small><strong>[Add developer name]</strong></span>
          </div>
          <Link className="button button-dark" to="/workshops">Browse workshops <span>→</span></Link>
        </div>
        <div className="about-visual">
          <div className="about-visual-inner">
            <span className="about-sun" />
            <div className="about-pot" />
            <div className="about-leaf leaf-one" />
            <div className="about-leaf leaf-two" />
            <span className="about-quote">“Everyone can<br />make something beautiful.”</span>
          </div>
          <span className="visual-label">WORKSHOPS · COMMUNITY · INSPIRATION</span>
        </div>
      </section>
    </div>
  );
}
