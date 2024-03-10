import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import homeDecorImg from '../../src/Utilities/products_Images/Home&Decor.jpg'
import clothingImg from '../../src/Utilities/products_Images/clothing.jpg'
import technologyImg from '../../src/Utilities/products_Images/technology.jpg'
import fashionImg from '../../src/Utilities/products_Images/fashion.jpg'
import healthImg from '../../src/Utilities/products_Images/health.jpg'
import carImg from '../../src/Utilities/products_Images/car.jpg'
import './Catagories.css'

function AdminCategories() {
    // const [products, setProducts] = useState([]);

    //have to connect it with backend

    // useEffect(() => {
    //     fetch('YOUR_BACKEND_ENDPOINT/products')
    //         .then(response => response.json())
    //         .then(data => setProducts(data))
    //         .catch(error => console.error('Error fetching data: ', error));
    // }, []);

    const [homeDecor, setHomeDecor] = useState(false)
    const [automotive, setAutomotive] = useState(false)
    const [clothing, setClothing] = useState(false)
    const [fashion, setFashion] = useState(false)
    const [health, setHealth] = useState(false)
    const [technology, setTechnology] = useState(false)


    const products = [
        {
            id: 1,
            name: 'Home & Decor',
            href: '/admin/homeDecor',
            // price: '$48',
            imageSrc: homeDecorImg,
            imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
        },
        {
            id: 2,
            name: 'Clothing',
            href: '/admin/clothing',
            // price: '$35',
            imageSrc: clothingImg,
            imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
        },
        {
            id: 3,
            name: 'Technology',
            href: '/admin/technology',
            // price: '$89',
            imageSrc: technologyImg,
            imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
        },
        {
            id: 4,
            name: 'Fashion Accessories',
            href: '/admin/fashion',
            // price: '$35',
            imageSrc: fashionImg,
            imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        },
        {
            id: 5,
            name: 'Health and Fitness',
            href: '/admin/health',
            // price: '$35',
            imageSrc: healthImg,
            imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        },

        {
            id: 6,
            name: 'Car Accessories',
            href: '/admin/automotive',
            // price: '$35',
            imageSrc: carImg,
            imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        },
    ]

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
                    {products.map((product) => (
                        <a key={product.id} href={product.href} className="group">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 aspect-ratio-box">
                                <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className=" product-image h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminCategories;
