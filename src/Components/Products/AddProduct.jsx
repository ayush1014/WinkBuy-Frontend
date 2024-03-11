
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import NavbarAdmin from '../NavbarAdmin'
import api from '../../Config/axios'

export default function AddProduct() {

    const [productCategory, setProductCategory] = useState()
    const [productName, setProductName] = useState()
    const [productRating, setProductRating] = useState()
    const [productRatingVol, setProductRatingVol] = useState()
    const [productPrice, setProductPrice] = useState()
    const [productDescription, setProductDescription] = useState()
    const [productLink, setProductLink] = useState()
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('product_name', productName);
        formData.append('product_Description', productDescription);
        formData.append('product_Price', productPrice);
        formData.append('rating', productRating);
        formData.append('rating_count', productRatingVol);
        formData.append('product_link', productLink);
        formData.append('categoryId', productCategory); // Changed from categoryId to match backend
        formData.append('product_pic', file);
    
        try {
            const response = await api.post('/addProduct', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <NavbarAdmin />
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="space-y-12 p-20">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Product</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            This information will be displayed publicly so be careful what you share.
                        </p>

                        <div className="sm:col-span-3">
                            <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                Product Category
                            </label>
                            <div className="mt-2">
                                <select
                                    id="category"
                                    name="category"
                                    autoComplete="category-name"
                                    onChange={(e) => setProductCategory(e.target.value)} 
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option value="">Select Category</option> 
                                    <option value="Home&Decor">Home & Decor</option>
                                    <option value="Clothing">Clothing</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Fashion Accessories">Fashion Accessories</option>
                                    <option value="Health&Fitness">Health & Fitness</option>
                                    <option value="Car Accessories">Car Accessories</option>
                                </select>
                            </div>
                        </div>


                        <div className="mt-10 sm:col-span-4">
                            <label htmlFor="product" className="block text-sm font-medium leading-6 text-gray-900">
                                Product Name
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span> */}
                                    <input
                                        type="text"
                                        name="product"
                                        id="product"
                                        autoComplete="product"
                                        onChange={(e) => { setProductName(e.target.value) }}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="IPhone 16 pro max"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-3 mt-10">
                            <label htmlFor="rating" className="block text-sm font-medium leading-6 text-gray-900">
                                Product Rating
                            </label>
                            <div className="mt-2">
                                <select
                                    id="rating"
                                    name="rating"
                                    autoComplete="rating-name"
                                    onChange={(e) => { setProductRating(e.target.value) }}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                    <option>Select Rating</option>
                                    <option>5.0</option>
                                    <option>4.5</option>
                                    <option>4.0</option>
                                    <option>3.5</option>
                                    <option>3.0</option>
                                    <option>2.5</option>
                                    <option>2.0</option>
                                    <option>1.5</option>
                                    <option>1.0</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="ratingVol" className="block text-sm font-medium leading-6 text-gray-900">
                                    Total Rating Volume
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span> */}
                                        <input
                                            type="text"
                                            name="ratingVol"
                                            id="ratingVol"
                                            autoComplete="username"
                                            onChange={(e) => { setProductRatingVol(e.target.value) }}
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="1100"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 sm:col-span-3">
                                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                    Price
                                </label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-gray-500 sm:text-sm">$</span>
                                    </div>
                                    <input
                                        type="text"
                                        name="price"
                                        id="price"
                                        onChange={(e) => { setProductPrice(e.target.value) }}
                                        className="block w-full rounded-md border-0 py-1.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>


                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                    Product Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="about"
                                        name="about"
                                        rows={3}
                                        onChange={(e) => { setProductDescription(e.target.value) }}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Please provide the description of the product.</p>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                    Product Link
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="about"
                                        name="about"
                                        placeholder='https://table/?1223347258t45864/amazon.com'
                                        rows={3}
                                        onChange={(e) => { setProductLink(e.target.value) }}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Please provide the link of the product.</p>
                            </div>


                            <div className="col-span-full">
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Product photo
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" onChange={handleFileChange} className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 5MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}
