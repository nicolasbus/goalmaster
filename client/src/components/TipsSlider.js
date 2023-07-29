import React, { useState, useEffect } from 'react';

const TipsSlider = ({ tips }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTip = () => {
    setCurrentIndex((currentIndex) => (currentIndex + 1) % tips.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTip, 5000);
    return () => clearInterval(interval);
  }, [tips]);

  return (
    <div className="slider">
      <div className="slider-content">
        <p style={{ color: 'white' }}>{tips[currentIndex]}</p>
      </div>
    </div>
  );
};

export default TipsSlider;
