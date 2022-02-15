import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MarketingApp from './MarketingApp';
import Header from '.components/Header';

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <MarketingApp />
      </div>
    </Router>
  );
};
