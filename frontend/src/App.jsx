import './App.css'
import Navbar from './components/Navbar'
import AuthModal from './components/auth'


const App = () => {

  return (
    <div className="wrapper">
      <nav>
      <Navbar/>
      </nav>
      <aside className='aside1'>
        <h1>SIDE MENU</h1>
      </aside>
      <main>
        <h1>MAIN CONTENT</h1>
      </main>
      <aside className='aside2'>
        <h1>SIDE MENU</h1>
      </aside>
      {/* <section>
        <h1>EXTRA STUFF</h1>
      </section> */}
      <footer>
        <h1>FOOTER</h1>
      </footer>

      <AuthModal />
    </div>
  )
}

export default App
