import { useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import NavbarUser from '../NavbarUser';
import Footer from '../Footer';

const product = {
    name: 'Basic Tee 6-Pack',
    price: '$192',
    href: '#',
    breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
    ],
    images: [
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
            alt: 'Model wearing plain white basic tee.',
        }
    ],
    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
    ],
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetail() {
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

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
                                src={product.images[0].src}
                                alt={product.images[0].alt}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                    </div>

                    {/* Product info and Description */}
                    <div className="mt-10 lg:mt-0 lg:ml-8 lg:flex-1">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                        <p className="text-3xl tracking-tight text-gray-900">{product.price}</p>

                        {/* Reviews */}
                        <div className="mt-3">
                            <div className="flex items-center">
                                {[0, 1, 2, 3, 4].map((rating) => (
                                    <StarIcon
                                        key={rating}
                                        className={classNames(
                                            reviews.average > rating ? 'text-indigo-500' : 'text-gray-300',
                                            'h-5 w-5'
                                        )}
                                        aria-hidden="true"
                                    />
                                ))}
                                <a href={reviews.href} className="ml-2 text-sm text-gray-500">
                                    {reviews.totalCount} reviews
                                </a>
                            </div>
                        </div>
                        <div className="mt-4">
                        <button
                            type="button"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add to cart
                        </button>
                        </div>
                        {/* Description */}
                        <div className="mt-6">
                            <p className="text-base text-gray-900">{product.description}</p>
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
