import React from 'react';
import './App.css';
import List from '../List/List';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <h1 className="app-title">Hello, React App!</h1>
      <List />
    </div>
  );
};

export default App;
