import './App.css';
import NavBar from './components/Header/NavBar';
import Content from './components/Main/Content';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Content />
      <Footer />
    </div>
  )
}

export default App
