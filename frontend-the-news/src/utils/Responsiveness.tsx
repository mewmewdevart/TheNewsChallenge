import React, { useState, useEffect } from 'react';

const ResponsivenessExample = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Função para verificar se a tela é mobile
  const checkResponsiveness = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // Usando useEffect para detectar mudanças no tamanho da janela
  useEffect(() => {
    // Verifica a responsividade assim que o componente é montado
    checkResponsiveness();

    // Adiciona o listener para mudanças no tamanho da janela
    window.addEventListener('resize', checkResponsiveness);

    // Remove o listener ao desmontar o componente
    return () => {
      window.removeEventListener('resize', checkResponsiveness);
    };
  }, []); // O array vazio garante que o useEffect seja executado apenas uma vez após a montagem

  return (
    <div>
      <h1>{isMobile ? 'Tela Responsiva (Mobile)' : 'Tela não Responsiva (Desktop)'}</h1>
    </div>
  );
};

export default ResponsivenessExample;
