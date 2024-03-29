import { StarIcon } from '@heroicons/react/20/solid';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // If you're using react-router for routing
import NavbarUser from '../NavbarUser';
import Footer from '../Footer';
import api from '../../Config/axios';
import './ImageContainer.css'
import { BounceLoader } from 'react-spinners';

export default function ProductDetail() {
    const { product_id } = useParams(); // Assuming you're using react-router and the route is /products/:productId
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const maxRetries = 20;
    const retryDelay = 2000;

    const fetchProductWithRetry = useCallback(async (attempt = 0) => {
        try {
            const response = await api.get(`/products/${product_id}`);
            setProduct(response.data);
            setIsLoading(false); // Stop loading after successful fetch
            setError(null); // Clear any existing errors
        } catch (error) {
            console.error(`Attempt ${attempt + 1}: Error fetching product details`, error);
            if (attempt < maxRetries - 1) { // Subtract 1 because attempt is zero-based
                setTimeout(() => fetchProductWithRetry(attempt + 1), retryDelay);
            } else {
                setError('Failed to fetch product details. Please try again later.');
                setIsLoading(false); // Stop loading after all retries have been exhausted
            }
        }
    }, [product_id, maxRetries, retryDelay]);

    useEffect(() => {
        fetchProductWithRetry(); // Invoke the fetch operation with retry logic
    }, [fetchProductWithRetry]);

    const renderStars = (rating) => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <StarIcon
                    key={i}
                    className={i <= rating ? 'text-indigo-500 h-5 w-5' : 'text-gray-300 h-5 w-5'}
                    aria-hidden="true"
                />
            );
        }
        return stars;
    };

    const handleAdd = () => {
        window.open(product.product_link, '_blank');
    }

    if (isLoading) {
        return (
            <>
                <NavbarUser />
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
                    <BounceLoader size={60} color={"#123abc"} loading={isLoading} />
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <NavbarUser />
                <div className="text-center py-10">
                    <p className="text-red-500">{error}</p>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <div className="bg-white">
            <NavbarUser />
            <div className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:pt-16 lg:px-8">
                {/* Breadcrumb and Product info */}
                {/* ... Breadcrumb here */}

                <div className="lg:flex lg:items-start lg:space-x-8">
                    {/* Image gallery */}
                    <div className="flex-1 min-w-0">
                        <div className="aspect-w-1 aspect-h-1 sm:aspect-w-3 sm:aspect-h-4 overflow-hidden rounded-lg lg:h-full">
                            <img
                                src={product.product_pic}
                                alt={product.product_name}
                                style={{
                                    maxHeight: '60vh',
                                    minHeight: '10vh',
                                    width: 'auto',
                                    objectFit: 'contain',
                                    display: 'block',
                                    margin: 'auto'
                                }}
                            />

                        </div>
                        <div className="mt-6">
                            {/* <p className="text-base text-gray-900">{product.product_Description}</p> */}
                            <hr></hr>
                            <div className="mt-4 p-3">
                                <button
                                    type="button"
                                    onClick={handleAdd}
                                    className="relative inline-flex items-center justify-center overflow-hidden rounded-md bg-transparent px-3 py-2 text-md font-semibold text-indigo-600 transition-all duration-300 ease-in-out group"
                                >
                                    <span className="relative z-10">Check out product</span>
                                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-indigo-600 transition-all duration-300 ease-out group-hover:w-full"></span>
                                </button>
                            </div>

                            <h2 className="text-2xl font-normal tracking-tight text-gray-900">Product Description</h2>
                            <div className="text-base text-gray-900" dangerouslySetInnerHTML={{ __html: product.product_Description }} />
                        </div>
                    </div>

                    {/* Product info and Description */}
                    <div className="mt-10 lg:mt-0 lg:ml-8 lg:flex-1">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                        <p className="text-3xl tracking-tight text-gray-900">{product.product_price}</p>

                        {/* Reviews */}
                        {/* Rendered Stars for Ratings */}
                        <div className="mt-3">
                            <div className="flex items-center">
                                {renderStars(product.rating)}
                                <a href="#" className="ml-2 text-sm text-gray-500">
                                    {product.rating_count} reviews
                                </a>
                            </div>
                        </div>

                        <div className="mt-4">
                            <button
                                type="button"
                                onClick={handleAdd}
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Add to cart
                            </button>
                        </div>
                        {/* Description */}
                        <div className="mt-6">
                            {/* <p className="text-base text-gray-900">{product.product_Description}</p> */}
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Wink Reviews</h2>
                            <div className="text-base text-gray-900" dangerouslySetInnerHTML={{ __html: product.winkReviews }} />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}
