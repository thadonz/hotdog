import React from 'react';
import ImageCapture from './components/imageCapture/ImageCapture';
import './App.css';

const App = () => {
  return (
    <div className='app'>
      <h1>
        Hotdog, not Hotdog
      </h1>
      <div className='content'>
        <ImageCapture />
      </div>
    </div>
  );
}

export default App;
