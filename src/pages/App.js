//Core
import React from 'react';

//Components
import PhoneInput from '../components/Phone-input';

//Instruments
import earth from '../assets/earth.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={earth} className="App-logo" alt="logo" />
        <p>Choose country:</p>
        <PhoneInput />
      </header>
    </div>
  );
}

export default App;
