import './AuthModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAuthModal, toggleAuthMode, closeAuthModal, registerUser, loginUser, toggleProfileModal } from '../Redux/authSlice'; // Import toggleProfileModal
import { useRef, useEffect, useState } from 'react';
import ProfileModal from './ProfileModal'; // Import the ProfileModal

const AuthModal = () => {
  const dispatch = useDispatch();
  const { isAuthModalOpen, isSignUp, loading, error } = useSelector((state) => state.auth);
  const modalRef = useRef(null);
  const isAuthenticated = useSelector((state) => state.auth.token);
  const isProfileModalOpen = useSelector((state) => state.auth.isProfileModalOpen); // Track profile modal state
  
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleModalToggle = () => {
    dispatch(toggleAuthModal());
    resetForm();
  };

  const handleToggleAuthMode = () => {
    dispatch(toggleAuthMode());
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }));
    } else {
      dispatch(loginUser({
        email: formData.email,
        password: formData.password,
      }));
    }
  };

  const handleProfileToggle = () => {
    dispatch(toggleProfileModal()); // Dispatch action to toggle profile modal
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        dispatch(closeAuthModal());
      }
    };

    if (isAuthModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAuthModalOpen, dispatch]);

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={handleProfileToggle} className='authBtn'>
          Profile
        </button>
      ) : (
        <button onClick={handleModalToggle} className='authBtn'>
          {isAuthModalOpen ? 'Close' : 'Sign In'}
        </button>
      )}

      {isProfileModalOpen && <ProfileModal />} {/* Conditionally render the ProfileModal */}

      {isAuthModalOpen && !isAuthenticated && (
        <div className="authModal">
          <div className="authPopUp" ref={modalRef}>
            <h4>{isSignUp ? 'Sign-Up for SPAZAHUB' : 'Sign-In to SPAZAHUB'}</h4>
            <p>{isSignUp ? 'Create your account' : 'Welcome back, please sign-in'}</p>
            <h4>-or-</h4>
            <button className="googleBtn">Continue with Google</button>

            <form onSubmit={handleSubmit}>
              {isSignUp && (
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              )}
              <input
                type="email"
                name="email"
                required
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {isSignUp && (
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              )}
              <button type="submit" className="signInBtn" disabled={loading}>
                {loading ? (isSignUp ? 'Signing Up...' : 'Signing In...') : (isSignUp ? 'Sign Up' : 'Sign In')}
              </button>
            </form>

            {error && <p className="error">{error}</p>}

            <p>
              {isSignUp ? (
                <>Already have an account? <span className="toggleLink" onClick={handleToggleAuthMode}>Sign In Here</span></>
              ) : (
                <>{"Don't have an account?"} <span className="toggleLink" onClick={handleToggleAuthMode}>Sign Up Here</span></>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthModal;
