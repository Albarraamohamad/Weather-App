import React, { useEffect, useState } from 'react';
import { ScaleLoader } from 'react-spinners';
import Home from './Home';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(true); // Start with true to show the loader initially

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []); // The empty array ensures this runs only once when the component mounts

  return (
    <div>
      {loading ? (
        <div className="loading">
          <ScaleLoader color="#ff0000" height={100} margin={10} loading={loading} />
        </div>
      ) : (
        <Home />
      )}
    </div>
  );
};

export default App;
