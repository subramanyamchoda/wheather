import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Forecast from "./Forecast";


function App() {
  return (
    <Router>
     
        <Routes>
          
          <Route path="/" element={<Forecast />} />
       
        </Routes>
     
    </Router>
  );
}

export default App;
