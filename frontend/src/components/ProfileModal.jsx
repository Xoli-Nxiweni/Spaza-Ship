import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeAuthModal, logout, toggleProfileModal } from '../Redux/authSlice';

const ProfileModal = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const modalRef = useRef(null);
  const isProfileModalOpen = useSelector((state) => state.auth.isProfileModalOpen); // Assuming you have this state in your slice

  const handleLogout = () => {
    dispatch(logout());
    dispatch(closeAuthModal()); // Close modal after logout
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      dispatch(toggleProfileModal()); // Assuming this toggles the profile modal state
    }
  };

  useEffect(() => {
    if (isProfileModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileModalOpen]);

  if (!isProfileModalOpen) return null; // Do not render if the modal is not open

  return (
    <div className="profileModal">
      <div className="profilePopUp" ref={modalRef}>
        <h4>User Profile</h4>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <button onClick={handleLogout} className="logoutBtn">Logout</button>
      </div>
    </div>
  );
};

export default ProfileModal;
