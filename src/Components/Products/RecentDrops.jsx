import React, { useState, useEffect, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import homeDecorImg from '../../../src/Utilities/products_Images/Home&Decor.jpg'
import clothingImg from '../../../src/Utilities/products_Images/clothing.jpg'
import technologyImg from '../../../src/Utilities/products_Images/technology.jpg'
import fashionImg from '../../../src/Utilities/products_Images/fashion.jpg'
import healthImg from '../../../src/Utilities/products_Images/health.jpg'
import carImg from '../../../src/Utilities/products_Images/car.jpg'
import '../Catagories.css'
import api from '../../Config/axios';
import './RecentDrops.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { HeartIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';

function RecentDrops() {
    const [homeDecor, setHomeDecor] = useState(false)
    const [automotive, setAutomotive] = useState(false)
    const [clothing, setClothing] = useState(false)
    const [fashion, setFashion] = useState(false)
    const [health, setHealth] = useState(false)
    const [technology, setTechnology] = useState(false)
    const [productDrop, setProductDrop] = useState([])
    const navigate = useNavigate();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [addedToWishlist, setAddedToWishlist] = useState(new Set());
    const [showPopup, setShowPopup] = useState({ show: false, message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const maxRetries = 20;
    const retryDelay = 2000;

    const fetchProducts = useCallback(async (attempt = 0) => {
        try {
            setIsLoading(true);
            const response = await api.get('/products');
            const productsArray = response.data.products || []; 
            setProductDrop(productsArray.slice(0, 6));
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            if (attempt < maxRetries) {
                setTimeout(() => fetchProducts(attempt + 1), retryDelay);
            } else {
                setIsLoading(false); 
            }
        }
    }, [maxRetries, retryDelay]);


    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

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
    }, []);

    const toggleWishlistStatus = async (event, productId) => {
        event.preventDefault();
        if (!isUserLoggedIn) {
            navigate('/login');
            return;
        }

        const userSession = sessionStorage.getItem('User');
        const user = JSON.parse(userSession);

        const isInWishlist = addedToWishlist.has(productId);
        const endpoint = isInWishlist ? '/remove' : '/add'; 
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

    useEffect(() => {
        const user = sessionStorage.getItem('User');
        setIsUserLoggedIn(!!user);
    })


    const products = [
        {
            id: 1,
            name: 'Home & Decor',
            href: '/homeDecor',
            // price: '$48',
            imageSrc: homeDecorImg,
            imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
        },
        {
            id: 2,
            name: 'Clothing',
            href: '/clothing',
            // price: '$35',
            imageSrc: clothingImg,
            imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
        },
        {
            id: 3,
            name: 'Technology',
            href: '/technology',
            // price: '$89',
            imageSrc: technologyImg,
            imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
        },
        {
            id: 4,
            name: 'Fashion Accessories',
            href: '/fashion',
            // price: '$35',
            imageSrc: fashionImg,
            imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        },
        {
            id: 5,
            name: 'Health and Fitness',
            href: '/health',
            // price: '$35',
            imageSrc: healthImg,
            imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        },

        {
            id: 6,
            name: 'Car Accessories',
            href: '/automotive',
            // price: '$35',
            imageSrc: carImg,
            imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        },
    ]

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    return (
        <div className="bg-white">
            {isLoading ? (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
                    <BounceLoader size={60} color={"#123abc"} loading={isLoading} />
                </div>
            ) : (
                <div className="max-w-full sm:py-10">
                    {showPopup.show && (
                        <div className="fixed top-16 right-16 bg-black text-white px-4 py-2 rounded-md">
                            {showPopup.message}
                        </div>
                    )}
                    <h2 className="text-sm md:text-xl lg:text-2xl  px-4 py-2 font-normal tracking-tight text-gray-700">Recent Drops on Wink Buy</h2>
                    <Carousel
                        swipeable={true}
                        draggable={true}
                        showDots={false}
                        responsive={responsive}
                        ssr={true}
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={300}
                        keyBoardControl={true}
                        customTransition="transform 800ms ease-in-out"
                        transitionDuration={3000}
                        containerClass=""
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        dotListClass="custom-dot-list-style"
                        itemClass="px-2"
                    >
                        {productDrop.map((product) => (
                            <a key={product.product_id} href={`/productDetail/${product.product_id}`} className="group">
                                <div className="image-container aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-0 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={product.product_pic}
                                        alt={product.product_name}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <h3 className="mt-4 text-center text-sm text-gray-700">{product.product_name}</h3>
                                <p className="mt-1 text-center text-xs font-medium text-gray-900">{product.categoryId}</p>
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
                            </a>
                        ))}
                    </Carousel>
                </div>)}
        </div>
    );
}

export default RecentDrops;
