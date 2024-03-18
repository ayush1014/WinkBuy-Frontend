import React, { useEffect, useState } from 'react';
import NavbarUser from '../NavbarUser';
import Footer from '../Footer';
import api from '../../Config/axios';
import './ImageContainer.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { HeartIcon, TrashIcon } from '@heroicons/react/24/outline';

const typeName = {
  CarAccessories: [
    { name: 'Cleaning', show: 'Cleaning' },
    { name: 'Fragrance', show: 'Fragrance' },
    { name: 'DashCams', show: 'Dash Cams' },
    { name: 'PhoneHolders', show: 'Phone Holders' },
    { name: 'Storage', show: 'Storage' },
    { name: 'PhoneCharging', show: 'Phone Charging' },
    { name: 'CarNeeds', show: 'Car Needs' },
]
}

export default function CarAccessories() {
  const [products, setProducts] = useState([]);
  const [recent, setRecent] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  let { type } = useParams();
  const navigate = useNavigate();
  const [addedToWishlist, setAddedToWishlist] = useState(new Set());
  const [catname, setCatname] = useState('');
  const [showPopup, setShowPopup] = useState({ show: false, message: '' });

  useEffect(() => {
    const userSession = sessionStorage.getItem('User');
    if (userSession) {
      setIsUserLoggedIn(true);
      const user = JSON.parse(userSession);
      const fetchWishlist = async () => {
        try {
          const response = await api.get(`/user/${user.username}`);
          const wishlistProductIds = new Set(response.data.map(item => item.productId));
          setAddedToWishlist(wishlistProductIds);
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        }
      };
      fetchWishlist();
    } else {
      setIsUserLoggedIn(false);
    }
  }, [type]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get(`/products/category/${type}`);
        setProducts(response.data);
        setRecent(response.data.slice(0, 10));
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const typeItem = typeName.CarAccessories.find(item => item.name === type);
    if (typeItem) {
      setCatname(typeItem.show);
    }
  }, [type]);

  const toggleWishlistStatus = async (event, productId) => {
    event.preventDefault();
    if (!isUserLoggedIn) {
      navigate('/login');
      return;
    }

    const userSession = sessionStorage.getItem('User');
    const user = JSON.parse(userSession);

    const method = addedToWishlist.has(productId) ? 'delete' : 'post';
    const endpoint = method === 'delete' ? '/remove' : '/add'; // Adjust these endpoints as per your API structure

    try {
      const response = await api[method](endpoint, {
        userId: user.username,
        productId: productId,
      });

      if (response.status === 201) {
        const newWishlist = new Set(addedToWishlist);
        if (method === 'delete') {
          newWishlist.delete(productId);
        } else {
          newWishlist.add(productId);
        }
        setAddedToWishlist(newWishlist);
        setShowPopup({ show: true, message: method === 'delete' ? 'Removed from wishlist!' : 'Added to wishlist!' });
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setShowPopup({ show: true, message: error.response.data.message });
      } else {
        console.error('Error toggling wishlist status:', error);
      }
    } finally {
      setTimeout(() => setShowPopup({ show: false, message: '' }), 3000);
    }
  };


  return (
    <div>
      <NavbarUser />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Recent Drops</h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {recent.map((product) => (
              <div key={product.product_id} className="group relative">
                <div className="image-container aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-0 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.product_pic}
                    alt={`Front of ${product.product_name}`}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`/productDetail/${product.product_id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.product_name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{catname}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${product.product_Price}</p>
                  {showPopup.show && (
                    <div className="fixed top-16 right-16 bg-black text-white px-4 py-2 rounded-md">
                      {showPopup.message}
                    </div>
                  )}
                  {addedToWishlist.has(product.product_id) ? (
                    <div className="absolute top-3 right-3">
                      <TrashIcon className="h-6 w-6 text-gray-600 cursor-pointer" onClick={(event) => toggleWishlistStatus(event, product.product_id)} />
                    </div>
                  ) : (
                    <HeartIcon
                      className="h-8 w-8 text-red-600 absolute top-3 right-3 cursor-pointer"
                      onClick={(event) => toggleWishlistStatus(event, product.product_id)}
                      aria-hidden="true"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">All {catname}</h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.product_id} className="group relative">
                <div className="image-container aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-0 lg:aspect-none group-hover:opacity-75 lg:h-80 relative">
                  <img
                    src={product.product_pic}
                    alt={`Front of ${product.product_name}`}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`/productDetail/${product.product_id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.product_name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{catname}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${product.product_Price}</p>
                  {showPopup.show && (
                    <div className="fixed top-16 right-16 bg-black text-white px-4 py-2 rounded-md">
                      {showPopup.message}
                    </div>
                  )}
                  {addedToWishlist.has(product.product_id) ? (
                    <div className="absolute top-3 right-3">
                      <TrashIcon className="h-6 w-6 text-gray-600 cursor-pointer" onClick={(event) => toggleWishlistStatus(event, product.product_id)} />
                    </div>
                  ) : (
                    <HeartIcon
                      className="h-8 w-8 text-red-600 absolute top-3 right-3 cursor-pointer"
                      onClick={(event) => toggleWishlistStatus(event, product.product_id)}
                      aria-hidden="true"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
