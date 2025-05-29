'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext'; 

export default function CartPage() {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useCart(); 

  const handleAddQuantity = (item: { id: number; title: string; price: number; image: string }) => {
    addToCart(item); 
  };

  const handleRemoveQuantity = (id: number) => {
    removeFromCart(id); 
  };

  return (
    <div className="cart-page-container">
      <h1>Sepetim</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Sepetiniz şu anda boş.</p>
          <Link href="/" className="back-to-products">
            Alışverişe Başla
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <ul className="cart-item-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  <div className="cart-item-quantity-controls">
                    <button onClick={() => handleRemoveQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleAddQuantity(item)}>+</button>
                  </div>
                </div>
                <button className="remove-item-button" onClick={() => removeFromCart(item.id)}>Kaldır</button>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <h2>Sepet Özeti</h2>
            <p>Toplam Ürün Adedi: {cartItems.reduce((total, item) => total + item.quantity, 0)}</p>
            <h3>Toplam Fiyat: <strong>${getCartTotal().toFixed(2)}</strong></h3>
            <button className="clear-cart-button" onClick={clearCart}>Sepeti Temizle</button>
            <button className="checkout-button">Ödeme Yap</button>
          </div>
        </div>
      )}
    </div>
  );
}