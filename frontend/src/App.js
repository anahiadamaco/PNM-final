import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login';
import Dashboard from './pages/dashboard';
import ResultsPage from './pages/resultsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/results" element={<ResultsPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
