import React from 'react';
import '../App.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <img 
        src="/$RAP(logo).svg" 
        alt="RAP Token Logo" 
        className="loading-logo"
      />
    </div>
  );
};

export default LoadingScreen;
