/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'

export default function ProductItem({product}) {
  return (
    <div className='card'>
        <Link legacyBehavior href={`/product/${product.slug}`}>
            <a>
                <img src={product.image}
                alt={product.name}
                className="rounded shadow"/>
            </a>
        </Link>
        <div className='flex flex-col justify-center items-center p-5'>
            <Link legacyBehavior href={`/product/${product.slug}`}>
                <a>
                <h2 className='text-lg'>{product.name}</h2>
                </a>
            </Link>
            <p className='mb-2'>{product.brand}</p>
            <p>₹{product.price}</p>
            <button className='primary-button' type='button'>Add to Cart</button>
        </div>
    </div>
  )
}
