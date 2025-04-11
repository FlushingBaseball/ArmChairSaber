import SignIn from "./SignIn";
import SignUp from "./SignUp";

function Login({ showLogin, setShowLogin}) {
  return (
    <div className="login-container">
      <h1 className='logoText'>Armchair Baseball</h1>
      <img className='signInUpLogo' src='../Images/LOGOv4.svg' alt="Baseball in Napoleonic hat logo"></img>
      {showLogin ? (
        <div className="login-form">
          <SignIn/>
          <div id="loginPrompt">
            <p id="promptText">
              Don't have an account? &nbsp;
            </p>
              <button className="toggleBtn" onClick={() => setShowLogin(false)}>Sign Up</button>
          </div>
        </div>
      ) : (
        <div className="login-form">
          <SignUp/>
          <p>
            Already have an account? &nbsp;
            <button className="toggleBtn" onClick={() => setShowLogin(true)}>Log In</button>
          </p>
        </div>
      )}

    </div>
  );
}

export default Login;