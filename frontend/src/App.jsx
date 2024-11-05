import './App.css';
import Navbar from './components/Navbar';
import Main from './components/Main.';
import Footer from './components/Footer';

const App = () => {

  return (
    <div className="wrapper">
        <nav>
        <Navbar />
        </nav>

      <main>
        <Main/>
      </main>

      <footer>
        <h1><Footer/></h1>
      </footer>
    </div>
  );
};

export default App;
