
import React from 'react';
import ProductCard from '@/components/ProductCard'; 
import { Product } from '@/types'; 

export default async function HomePage() {
  let products: Product[] = [];
  try {
    const res = await fetch('https://fakestoreapi.com/products?limit=6', { cache: 'no-store' });
    if (!res.ok) { 
      throw new Error(`API hatası: ${res.status}`);
    }
    products = await res.json();
  } catch (error) {
    console.error('Ürünler çekilirken hata oluştu:', error);
    products = []; 
  }

  return (
    <main className="main-content">
      <h1>Ürünlerimiz</h1>
      <div className="product-list-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          ))
        ) : (
          <p>Ürünler yüklenirken bir hata oluştu veya ürün bulunamadı. Lütfen daha sonra tekrar deneyin.</p>
        )}
      </div>
    </main>
  );
}