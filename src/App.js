import React from 'react';
import ImageCapture from './components/imageCapture/ImageCapture';
import './App.css';

const App = () => {
  return (
    <div className='app'>
      <div className='content'>
        <h1>
          Hotdog, not Hotdog
        </h1>
        <ImageCapture />
      </div>
    </div>
  );
}

export default App;
