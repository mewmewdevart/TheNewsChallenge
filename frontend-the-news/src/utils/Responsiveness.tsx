import React, { useState, useEffect } from 'react';

const ResponsivenessExample = () => {
  const [isMobile, setIsMobile] = useState(false);

  const checkResponsiveness = () => {
    if (window.innerWidth <= 900) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // Usando useEffect para detectar mudanças no tamanho da janela
  useEffect(() => {
    checkResponsiveness();
    window.addEventListener('resize', checkResponsiveness);
    return () => {
      window.removeEventListener('resize', checkResponsiveness);
    };
  }, []);

  return (
    <div>
      <h1>{isMobile ? 'Tela Responsiva (Mobile)' : 'Tela não Responsiva (Desktop)'}</h1>
    </div>
  );
};

export default ResponsivenessExample;
