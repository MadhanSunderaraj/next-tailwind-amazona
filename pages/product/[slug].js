import Layout from '../../components/Layout';
import data from '../../utils/data';
import { useRouter } from 'next/router';
import React, {useContext} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Store } from '../../utils/Store';

export default function ProductScreen() {
  const { query } = useRouter();
  const router = useRouter()
  const { slug } = query;
  const {state, dispatch} = useContext(Store)
  const product = data.products.find((product) => product.slug === slug);
  if (!product) {
    return <div>Product Not Defined</div>;
  }
  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      alert('Sorry. Product is out of stock');
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };
  return (
    <Layout title={product.name}>
      <div className="my-5">
        <Link href="/">Back to products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Catogery: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Description {product.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-5 flex justify-between">
              <div>price</div>
              <div>₹ {product.price}</div>
            </div>
            <div className="mb-5 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? "In stock" : "Un-available"}</div>
            </div>
            <div className=''>
                <button className='primary-button w-full' onClick={() => addToCartHandler()}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
