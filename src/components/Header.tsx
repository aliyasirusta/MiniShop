'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext'; 
const Header: React.FC = () => {
  const { getCartItemCount } = useCart();

  return (
    <header className="header-container">
      <div className="logo">
        <Link href="/">
          Mini-Shop
        </Link>
      </div>
      <nav className="main-nav">
        <ul>
          <li>
            <Link href="/">Ürünler</Link>
          </li>
          <li>
            <Link href="/cart">
              Sepet ({getCartItemCount()}) 
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;