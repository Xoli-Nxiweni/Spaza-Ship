import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Main from './components/Main.';
import Footer from './components/Footer';

const App = () => {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  const toggleLeftSidebar = () => setIsLeftSidebarOpen(!isLeftSidebarOpen);
  const toggleRightSidebar = () => setIsRightSidebarOpen(!isRightSidebarOpen);

  // Close sidebars if clicking outside
  const handleOutsideClick = (event) => {
    if (
      !event.target.closest('.aside1') &&
      !event.target.closest('.aside2') &&
      !event.target.closest('.leftButton') &&
      !event.target.closest('.rightButton')
    ) {
      setIsLeftSidebarOpen(false);
      setIsRightSidebarOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="wrapper">
        <nav>
        <Navbar />
        </nav>
        <div className="leftButton">
          <button className="toggleButton" onClick={toggleLeftSidebar}>
            {isLeftSidebarOpen ? '<<<' : '>>>'}
          </button>
        </div>
        <div className="rightButton">
          <button className="toggleButton" onClick={toggleRightSidebar}>
            {isRightSidebarOpen ? '>>>' : '<<<'}
          </button>
        </div>
    

      <aside className={`aside1 ${isLeftSidebarOpen ? 'open' : ''}`}>
        <h1>LEFT SIDE MENU</h1>
      </aside>

      <main>
        <Main/>
      </main>

      <aside className={`aside2 ${isRightSidebarOpen ? 'open' : ''}`}>
        <h1>RIGHT SIDE MENU</h1>
      </aside>

      <footer>
        <h1><Footer/></h1>
      </footer>
    </div>
  );
};

export default App;
