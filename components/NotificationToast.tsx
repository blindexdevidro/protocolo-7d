
import React, { useState, useEffect } from 'react';

const names = ["Juliana", "Mariana", "Carla", "Beatriz", "Fernanda", "Patrícia", "Aline", "Camila", "Débora", "Erika"];
const cities = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba", "Porto Alegre", "Salvador", "Fortaleza", "Brasília"];

export const NotificationToast: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState({ name: "", city: "" });

  useEffect(() => {
    const showNotification = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      setCurrent({ name: randomName, city: randomCity });
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 5000);
    };

    // Initial delay
    const initialTimeout = setTimeout(showNotification, 5000);

    const interval = setInterval(() => {
      showNotification();
    }, 20000); // 20 seconds interval as requested

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-bounce">
      <div className="bg-white border-l-4 border-pink-500 shadow-xl rounded-lg p-4 flex items-center space-x-3 max-w-xs md:max-w-sm">
        <div className="bg-pink-100 p-2 rounded-full">
          <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800">{current.name} de {current.city}</p>
          <p className="text-xs text-slate-500">Acabou de adquirir o Protocolo!</p>
        </div>
      </div>
    </div>
  );
};
