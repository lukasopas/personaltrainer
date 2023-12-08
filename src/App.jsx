import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CustomerList from './components/customerlist';
import TrainingList from './components/traininglist';
import "./App.css";
const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/customers">List of customers</Link></li>
            <li><Link to="/trainings">List of trainings</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/trainings" element={<TrainingList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;