import React, { useEffect, useState } from 'react';
import NavbarUser from './NavbarUser';
import Footer from './Footer';
import api from '../Config/axios';
import { Link, useParams } from 'react-router-dom';
import './Products/ImageContainer.css'
import { TrashIcon } from '@heroicons/react/24/outline'; // For an outline icon



const typeName = {
  Men: [
    { name: 'MenTopwear', show: 'Topwear' },
    { name: 'MenBottomwear', show: 'Bottom Wear' },
    { name: 'MenFootwear', show: 'Footwear' },
    { name: 'MenSportsAndFitnessWear', show: 'Sports & Fitness Wear' },
    { name: 'MenFashionAccessories', show: 'Fashion Accessories' },
    { name: 'MenGifts', show: 'Gifts' },
    { name: 'MenGadgets', show: 'Gadgets' },
    { name: 'MenBagsAndBackpacks', show: 'Bags & Backpacks' },
  ]
}


export default function Wishlist() {

  const [products, setProducts] = useState([]);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const userSession = sessionStorage.getItem('User');
      const user = JSON.parse(userSession);

      if (!user || !user.username) {
        console.error('User session data is invalid');
        return;
      }

      const response = await api.delete('/remove', {
        data: {
          userId: user.username,
          productId: productId,
        },
      });

      if (response.status === 200) {
        console.log('Product removed from wishlist');
        // Optionally, refresh the wishlist items or remove the item from the state
        setProducts(products.filter(product => product.product_id !== productId));
      } else {
        console.error('Failed to remove product from wishlist');
      }
    } catch (error) {
      console.error('Error removing product from wishlist:', error.response?.data?.message || error.message);
    }
  };


  useEffect(() => {
    const fetchWishlistProducts = async () => {
      try {
        const userSession = sessionStorage.getItem('User');
        const user = JSON.parse(userSession);

        if (user && user.username) {
          const response = await api.get(`/user/${user.username}`);
          setProducts(response.data);
        } else {
          console.error('User not logged in');
          // Handle not logged in scenario, maybe navigate to login page
        }
      } catch (error) {
        console.error('Error fetching wishlist products: ', error);
      }
    };

    fetchWishlistProducts();
  }, []);

  return (
    <div>
      <NavbarUser />
      <div className="bg-white">
        <div className="mt-6 grid p-10 grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <h2 className="text-2xl font-normal tracking-tight text-gray-900">Your Wishlist</h2>
          {products.map((product) => (
            <div key={product.product_id} className="group relative">
              <div className="image-container aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-0 lg:aspect-none lg:h-80 relative">
                <img
                  src={product.product_pic}
                  alt={product.product_name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
                <TrashIcon
                  className="h-6 w-6 text-red-600 absolute top-3 right-3 cursor-pointer"
                  onClick={() => handleRemoveFromWishlist(product.product_id)}
                  aria-hidden="true"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    {product.product_name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.category?.category_name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
      <Footer />
    </div>
  );
}