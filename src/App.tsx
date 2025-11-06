import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Pages/Home';
import About from './Pages/About';
import Portfolio from './Pages/Portfolio';
// import Services from './Pages/Services';
// import Contact from './Pages/Contact';
// import Projects from './Pages/Projects';
// import Details from './Pages/Details';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        {/* <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
       <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<Details />} /> */}


      </Routes>
    </Router>
  );
}

export default App;