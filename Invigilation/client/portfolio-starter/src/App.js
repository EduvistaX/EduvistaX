import Navbar from "./components/Navbar/Navbar";
import Intro from "./components/Intro/Intro";
import Services from "./components/Services/Services";
import "./App.css";
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Works from "./components/Works/Works";

import Login from "./components/Login/Login";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import { useContext } from "react";
import { themeContext } from "./Context";

function App() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  return (
    
    <><Router>
      <Routes>
        
        <Route path="Login" element={<Login/>} />
        
      </Routes>
    </Router>
    <div
      className="App"
      style={{
        background: darkMode ? "black" : "",
        color: darkMode ? "white" : "",
      }}
    >
        <Navbar />
        <Intro />
        <Services />

        <Works />
        

        <Contact />
        <Footer />
      </div></>
  );
}

export default App;
