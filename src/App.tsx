import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, useNavigate, Routes} from 'react-router-dom';
import Home from './dashboardComponent/home';

function App() {
  return (
   
    <Router>
    <Routes>
      <Route path="/home" element={<Home />}> </Route>
      
    </Routes>
  </Router>
  );
}

export default App;
