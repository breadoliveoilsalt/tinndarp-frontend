import React from 'react';
// import logo from './logo.svg';
// <img src={logo} className="App-logo" alt="logo" />
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Tony's React App
        </p>
        <p>
          This confirms deployment on merging PR into master. If this appears, then S3 still works on 200224.
        </p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
