import { Link } from 'react-router';
import '../css/startingPage.css'

function StartingPage() {
  return (
    <>
    <div className="startingPageWrapper" id='start'>
    <div className="intro">
        <h1>Learn. Teach. Grow.</h1>
        <h2>Join our community to share and learn new skills.</h2>
        <p>A modern space for developers to collaborate and grow together.</p>
        <div className="loginButtons">
            <Link to="/signup"><button className="getStarted">GET STARTED</button></Link>
            <Link to="/login"><button className="loginmain">LOGIN</button></Link>
        </div>
    </div>
    <div className="startingImage">
        <img src="/src/assets/startingPageImage.png" alt="Starting Page Image" />
    </div>
    </div>
    </>
  );
}

export default StartingPage;