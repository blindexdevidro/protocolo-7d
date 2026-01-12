
import React, { useState, useEffect } from 'react';

interface CounterProps {
  target: number;
  duration: number;
}

export const Counter: React.FC<CounterProps> = ({ target, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration]);

  return <span>{count.toLocaleString('pt-BR')}</span>;
};
