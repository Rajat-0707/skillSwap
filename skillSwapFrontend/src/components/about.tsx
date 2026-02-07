import '../css/about.css'

const About = () => {
  return (
    <div className="about-container" id="about">

      <div className="about-hero">
        <h1 className="about-heading">About SkillSwap</h1>
        <p className="about-tagline">
          Learn. Teach. Grow — together.
        </p>
      </div>

      <div className="about-section">
        <h2>Our Mission</h2>
        <p>
          SkillSwap was built on a simple belief: learning should never be limited by money,
          access, or traditional classrooms. Everyone has something valuable to teach and
          something new to learn. We connect those two sides through structured, peer-to-peer
          micro-mentorship.
        </p>
      </div>

      <div className="about-section alt-bg">
        <h2>How SkillSwap Works</h2>
        <div className="about-grid">
          <div className="about-card">
            <h3> List Your Skills</h3>
            <p>Share what you can teach and what you want to learn.</p>
          </div>
          <div className="about-card">
            <h3>Smart Matching</h3>
            <p>We connect you with people whose goals align with yours.</p>
          </div>
          <div className="about-card">
            <h3>Schedule Sessions</h3>
            <p>Book time slots that work for both learners and mentors.</p>
          </div>
          <div className="about-card">
            <h3> Mutual Growth</h3>
            <p>Teach to earn credits. Use credits to learn from others.</p>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2> A Fair Knowledge Economy</h2>
        <p>
          SkillSwap runs on a credit-based system. You earn credits by teaching and spend
          them when learning. This keeps the platform fair, rewarding effort instead of money.
          Our reputation and review system ensures trust, accountability, and high-quality
          learning experiences.
        </p>
      </div>

      <div className="about-section alt-bg">
        <h2> Built for Long-Term Growth</h2>
        <p>
          Track your progress, discover new partners, and receive personalized
          recommendations based on your goals. SkillSwap isn’t just about sessions —
          it’s about continuous, collaborative improvement.
        </p>
      </div>

      

    </div>
  )
}

export default About
