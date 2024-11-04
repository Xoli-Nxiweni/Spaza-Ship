import React, { useState } from 'react';
import './AuthModal.css';

const AuthModal = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleAuthModal = () => {
    setIsAuthModalOpen(!isAuthModalOpen);
    setIsSignUp(false); // Reset to Sign-In when opening
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div>
      <button onClick={toggleAuthModal}>
        {isAuthModalOpen ? 'Close' : 'Sign In'}
      </button>

      {isAuthModalOpen && (
        <div className="authModal">
          <h4>{isSignUp ? 'Sign-Up for SPAZAHUB' : 'Sign-In to SPAZAHUB'}</h4>
          <p>{isSignUp ? 'Create your account' : 'Welcome back, please sign-in'}</p>
          <h4>-or-</h4>
          <button className="googleBtn">Continue with Google</button>
          
          <form method="post">
            <input type="text" required placeholder="Email Address" />
            {isSignUp && <input type="text" required placeholder="Username" />}
            <input type="password" required placeholder="Password" />
            {isSignUp && <input type="password" required placeholder="Confirm Password" />}
            <button type="submit" className="signInBtn">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>
          
          <p>
            {isSignUp ? (
              <>Already have an account? <span className="toggleLink" onClick={toggleAuthMode}>Sign In Here</span></>
            ) : (
              <>Don't have an account? <span className="toggleLink" onClick={toggleAuthMode}>Sign Up Here</span></>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthModal;
