
'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext'; 
import { Product } from '@/types'; 

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const productId = params.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart } = useCart(); 
  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!res.ok) {
          throw new Error(`API hatası: ${res.status} - Ürün bulunamadı`);
        }
        const data: Product = await res.json();
        setProduct(data);
      } catch (err: any) {
        console.error("Ürün detayı çekilirken hata oluştu:", err);
        setError(err.message || "Ürün detayı yüklenirken bir sorun oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  
  const handleAddToCart = () => {
    if (product) {
      
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      });
      alert(`${product.title} sepete eklendi!`); 
    }
  };

  if (loading) {
    return (
      <div className="product-detail-container" style={{ textAlign: 'center', padding: '50px' }}>
        <p>Ürün yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail-container" style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
        <h2>Hata: {error}</h2>
        <p>Ürün detayları yüklenemedi. Lütfen tekrar deneyin.</p>
        <Link href="/" style={{ display: 'inline-block', marginTop: '20px', padding: '10px 20px', backgroundColor: '#e74c3c', color: '#fff', borderRadius: '5px', fontWeight: 'bold' }}>
            Tüm Ürünlere Dön
          </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-container" style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Ürün Bulunamadı</h2>
        <p>Aradığınız ürün mevcut değil.</p>
        <Link href="/" style={{ display: 'inline-block', marginTop: '20px', padding: '10px 20px', backgroundColor: '#3498db', color: '#fff', borderRadius: '5px', fontWeight: 'bold' }}>
            Tüm Ürünlere Dön
          </Link>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-detail-info">
        <h1 className="product-detail-title">{product.title}</h1>
        <p className="product-detail-category">Kategori: {product.category}</p>
        <p className="product-detail-description">{product.description}</p>
        <p className="product-detail-price">${product.price.toFixed(2)}</p>
        <div className="product-detail-rating">
          <span>{product.rating.rate} / 5 ({product.rating.count} yorum)</span>
        </div>
        <button className="add-to-cart-button" onClick={handleAddToCart}>Sepete Ekle</button>
        <Link href="/" className="back-to-products">
          Tüm Ürünlere Geri Dön
        </Link>
      </div>
    </div>
  );
}