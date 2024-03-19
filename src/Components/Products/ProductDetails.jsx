import { StarIcon } from '@heroicons/react/20/solid';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // If you're using react-router for routing
import NavbarUser from '../NavbarUser';
import Footer from '../Footer';
import api from '../../Config/axios';
import './ImageContainer.css'

export default function ProductDetail() {
    const { product_id } = useParams(); // Assuming you're using react-router and the route is /products/:productId
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        console.log('entering', product_id)
        // Fetch product details from the backend
        const fetchProduct = async () => {
            console.log(product_id)
            setIsLoading(true);
            try {
                const response = await api.get(`/products/${product_id}`);
                console.log(response)
                if (!response.statusText) {
                    throw new Error('Product not found');
                }
                setProduct(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [product_id]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    // if (!product) return <div>Product not found</div>;

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
                                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Product Description</h2>
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
