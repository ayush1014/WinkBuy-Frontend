import React, { useEffect, useState } from 'react';
import NavbarUser from './NavbarUser';
import Footer from './Footer';
import api from '../Config/axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState({ show: false, message: '' });

  const handleRemoveFromWishlist = async (event, productId) => {
    event.stopPropagation();
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
        setProducts(products.filter(product => product.product_id !== productId));
        setShowPopup({ show: true, message: 'Removed from wishlist!' });
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
        <h2 className="text-2xl p-10 font-normal tracking-tight text-gray-900">Your Wishlist</h2>
        <div className="mt-6 grid px-10 py-2 grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {showPopup.show && (
            <div className="fixed top-20 right-16 bg-black text-white px-4 py-2 rounded-md">
              {showPopup.message}
            </div>
          )}
          {products.map((product) => (
            <div key={product.product_id} className="group relative">
              <div
                className="image-container aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-0 lg:aspect-none lg:h-80 relative cursor-pointer"
                onClick={() => navigate(`/productDetail/${product.product_id}`)}
              >
                <img
                  src={product.product_pic}
                  alt={product.product_name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
                <TrashIcon
                  className="h-6 w-6 text-red-600 absolute top-3 right-3 cursor-pointer"
                  onClick={(event) => handleRemoveFromWishlist(event, product.product_id)}
                  aria-hidden="true"
                />
              </div>
              <div onClick={() => navigate(`/productDetail/${product.product_id}`)}>
                <h3 className="text-sm text-gray-700">
                  {product.product_name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.category_name}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
      <Footer />
    </div>
  );
}