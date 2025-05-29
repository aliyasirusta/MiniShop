'use client'; 

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <p>Mini-Shop ©{new Date().getFullYear()} Tüm Hakları Saklıdır.</p>
      <p>Öğrenim Amaçlı Geliştirilmiştir.</p>
    </footer>
  );
};

export default Footer;