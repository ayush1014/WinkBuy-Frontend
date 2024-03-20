import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import api from '../../Config/axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { HeartIcon, TrashIcon } from '@heroicons/react/24/outline';
import Loader from './loader';

export default function InfiniteProduct() {
    const [allProducts, setAllProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [showPopup, setShowPopup] = useState({ show: false, message: '' });
    const [addedToWishlist, setAddedToWishlist] = useState(new Set());
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const navigate = useNavigate();
    const productsPerPage = 5;

    const fetchProducts = async () => {
        if (!hasMore) return;

        try {
            if (allProducts.length === 0) {
                const response = await api.get(`/products`);
                setAllProducts(response.data);
                setVisibleProducts(response.data.slice(0, productsPerPage));
            } else {
                const nextProducts = allProducts.slice(visibleProducts.length, visibleProducts.length + productsPerPage);
                setVisibleProducts(prev => [...prev, ...nextProducts]);
                if (nextProducts.length < productsPerPage) {
                    setHasMore(false);
                }
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
            setHasMore(false);
        }
    };

    const toggleWishlistStatus = async (event, productId) => {
        event.preventDefault();
        if (!isUserLoggedIn) {
            navigate('/login');
            return;
        }

        const userSession = sessionStorage.getItem('User');
        const user = JSON.parse(userSession);

        const isInWishlist = addedToWishlist.has(productId);
        const endpoint = isInWishlist ? '/remove' : '/add'; // Ensure endpoint matches your backend
        const method = isInWishlist ? 'delete' : 'post';

        try {
            const response = await api({
                method,
                url: endpoint,
                data: {
                    userId: user.username,
                    productId: productId,
                },
            });

            if (response.status === 200 || response.status === 201) {
                const newWishlist = new Set(addedToWishlist);
                if (isInWishlist) {
                    newWishlist.delete(productId);
                } else {
                    newWishlist.add(productId);
                }
                setAddedToWishlist(newWishlist);
                setShowPopup({ show: true, message: isInWishlist ? 'Removed from wishlist!' : 'Added to wishlist!' });
            }
        } catch (error) {
            console.error('Error toggling wishlist status:', error);
            setShowPopup({ show: true, message: error.response?.data?.message || 'Error processing your request' });
        } finally {
            setTimeout(() => setShowPopup({ show: false, message: '' }), 3000);
        }
    };

    return (
        <div>
            <InfiniteScroll
                dataLength={visibleProducts.length}
                next={fetchProducts}
                hasMore={hasMore}
                loader={<Loader/>}
                endMessage={
                    <p style={{fontStyle:'normal', textAlign: 'center' }}>
                        <b>You have seen it all</b>
                    </p>
                }
            >
                <div className="mt-6 px-10 py-20 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {visibleProducts.map(product => (
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
                                    <p className="mt-1 text-sm text-gray-500">{product.categoryId}</p>
                                </div>
                                {/* <p className="text-sm font-medium text-gray-900">${product.product_Price}</p> */}
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
            </InfiniteScroll>
        </div>
    );
}
