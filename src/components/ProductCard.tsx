'use client'; 

import React from 'react';
import Link from 'next/link';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, price, image }) => {
  return (
    <Link href={`/products/${id}`} passHref>
      <div className="product-card">
        <img src={image} alt={title} className="product-image" />
        <h3 className="product-title">{title}</h3>
        <p className="product-price">${price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;