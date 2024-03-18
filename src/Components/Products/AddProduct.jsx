
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import NavbarAdmin from '../NavbarAdmin'
import api from '../../Config/axios'
import { BounceLoader } from 'react-spinners';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function insertTable(quill, rows = 2, columns = 2) {
    const range = quill.getSelection(true);
    if (range) {
        // Move cursor to next line
        let insertAt = range.index + 1;
        const tableHTML = generateTableHTML(rows, columns);
        quill.clipboard.dangerouslyPasteHTML(insertAt, tableHTML);
    }
}

function generateTableHTML(rows, columns) {
    let table = '<table border="1" style="width:100%;">';
    for (let r = 0; r < rows; r++) {
        table += '<tr>';
        for (let c = 0; c < columns; c++) {
            table += '<td>&nbsp;</td>';
        }
        table += '</tr>';
    }
    table += '</table><p><br></p>';
    return table;
}

const modules = {
    toolbar: {
        container: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'align': [] }],
            ['link', 'image', 'video'],
            [{ 'color': [] }, { 'background': [] }],
            ['clean'],
            ['insertTable'] // Custom button in the toolbar
        ],
        handlers: {
            insertTable: function () {
                insertTable(this.quill);
            }
        }
    }
};

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'align',
    'color', 'background', // Text color and background
    'table' // Table format
];


const productTypes = {
    Men: [
        { name: 'MenTopwear', show: 'Topwear' },
        { name: 'MenBottomwear', show: 'Bottom Wear' },
        { name: 'MenFootwear', show: 'Footwear' },
        { name: 'MenSportsAndFitnessWear', show: 'Sports & Fitness Wear' },
        { name: 'MenFashionAccessories', show: 'Fashion Accessories' },
        { name: 'MenGifts', show: 'Gifts' },
        { name: 'MenGadgets', show: 'Gadgets' },
        { name: 'MenBagsAndBackpacks', show: 'Bags & Backpacks' },
    ],
    Women: [
        { name: 'Dresses', show: 'Dressess' },
        { name: 'TopsTeesAndShirts', show: 'Tops, Tees & Shirts' },
        { name: 'WomenBottomwear', show: 'Bottomwear' },
        { name: 'WomenFootwear', show: 'Footwear' },
        { name: 'WomenHoodiesAndOuterwears', show: 'Hoodies & Outerwears' },
        { name: 'WomenGifts', show: 'Gifts' },
        { name: 'WomenSportsAndFitnessWear', show: 'Sports & Fitness Wear' },
        { name: 'BeautyAndPersonalCare', show: 'Beauty & Personal Care' },
        { name: 'WomenFashionAccessories', show: 'Fashion Accessories' },
        { name: 'BagsPursesAndHandbags', show: 'Purses & Handbags' },
    ],
    HomeAndDecor: [
        { name: 'Furniture', show: 'Furniture' },
        { name: 'PhotoFrames', show: 'Photo Frames' },
        { name: 'LivingRoom', show: 'Living Room' },
        { name: 'Bathroom', show: 'Bathroom' },
        { name: 'Bedroom', show: 'Bedroom' },
        { name: 'Kitchen', show: 'Kitchen' },
        { name: 'Lights', show: 'Lights' },
        { name: 'Plants', show: 'Plants' },
        { name: 'Decorations', show: 'Decorations' },
        { name: 'HomeDecorGifts', show: 'Gifts' },
    ],
    Technology: [
        { name: 'Phones', show: 'Phones' },
        { name: 'Tablets', show: 'Tablets' },
        { name: 'SmartDevices', show: 'Smart Devices' },
        { name: 'LaptopAndTabletAccessories', show: 'Laptop & Tablet Accessories' },
        { name: 'PhoneAccessories', show: 'Phone Accessories' },
        { name: 'Laptops', show: 'Laptops' },
        { name: 'Televisions', show: 'Televisions' },
        { name: 'Monitors', show: 'Monitors' },
        { name: 'Gaming', show: 'Gaming' },
        { name: 'Softwares', show: 'Softwares' },
    ],
    HealthAndFitness: [
        { name: 'ScalesAndMeasure', show: 'Scales & Measure' },
        { name: 'Nutrition', show: 'Nutrition' },
        { name: 'WorkoutEquiments', show: 'Workout Equiments' },
        { name: 'FitnessGadgets', show: 'Fitness Gadgets' },
        { name: 'Supplements', show: 'Supplements' },
        { name: 'Books', show: 'Books' },
        { name: 'FitnessCourses', show: 'Fitness Courses' },
        { name: 'GymNeeds', show: 'Gym Needs' },
    ],
    CarAccessories: [
        { name: 'Cleaning', show: 'Cleaning' },
        { name: 'Fragrance', show: 'Fragrance' },
        { name: 'DashCams', show: 'Dash Cams' },
        { name: 'PhoneHolders', show: 'Phone Holders' },
        { name: 'Storage', show: 'Storage' },
        { name: 'PhoneCharging', show: 'Phone Charging' },
        { name: 'CarNeeds', show: 'Car Needs' },
    ],
};


export default function AddProduct() {

    const [productCategory, setProductCategory] = useState();
    const [photoOption, setPhotoOption] = useState('upload');
    const [productType, setProductType] = useState('');
    const [productName, setProductName] = useState();
    const [productRating, setProductRating] = useState();
    const [productRatingVol, setProductRatingVol] = useState();
    const [productPrice, setProductPrice] = useState();
    const [productDescription, setProductDescription] = useState();
    const [winkReviews, setWinkReviews] = useState();
    const [productLink, setProductLink] = useState();
    const [photoLink, setPhotoLink] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState('');

    const [file, setFile] = useState(null);

    const handleCategoryChange = (e) => {
        setProductCategory(e.target.value);
        // Reset product type when category changes
        setProductType('');
    };

    const handleTypeChange = (e) => {
        setProductType(e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setPreview(''); // Clear the preview when removing the file or link
        setPhotoLink(''); // Clear the photo link input field
    };

    const handlePhotoLinkChange = (e) => {
        const link = e.target.value;
        setPhotoLink(link);
        setPreview(link); // Set the link as the preview source
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        formData.append('product_name', productName);
        formData.append('product_Description', productDescription);
        formData.append('winkReviews', winkReviews);
        formData.append('product_Price', productPrice);
        formData.append('rating', productRating);
        formData.append('rating_count', productRatingVol);
        formData.append('product_link', productLink);
        formData.append('categoryId', productType); // Changed from categoryId to match backend

        if (photoOption === 'upload' && file) {
            formData.append('product_pic', file);
        } else if (photoOption === 'link') {
            formData.append('product_photo_link', photoLink); // Use the appropriate field name expected by your backend
        }

        try {
            const response = await api.post('/addProduct', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };


    return (
        <>
            <NavbarAdmin />
            {isLoading ? (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
                    <BounceLoader size={60} color={"#123abc"} loading={isLoading} />
                </div>
            ) : (
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
                                        onChange={handleCategoryChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Men">Men</option>
                                        <option value="Women">Women</option>
                                        <option value="HomeAndDecor">Home & Decor</option>
                                        <option value="Technology">Technology</option>
                                        <option value="HealthAndFitness">Health & Fitness</option>
                                        <option value="CarAccessories">Automotive Accessories</option>
                                    </select>
                                </div>
                            </div>

                            {productCategory && (
                                <div className="sm:col-span-3 mt-4">
                                    <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
                                        Product Type
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="type"
                                            name="type"
                                            autoComplete="type-name"
                                            onChange={handleTypeChange}
                                            value={productType}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            <option value="">Select Type</option>
                                            {productTypes[productCategory]?.map((type, index) => (
                                                <option key={index} value={type.name}>{type.show}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}


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


                                {/* <div className="col-span-full">
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
                                </div> */}

                                <div className="col-span-full">
                                    <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                        Product Description
                                    </label>
                                    <div className="mt-2">
                                        <ReactQuill
                                            theme="snow"
                                            id="about"
                                            value={productDescription}
                                            // onChange={setProductDescription}
                                            modules={modules}
                                            formats={formats}
                                            placeholder="Product Description"
                                            onChange={(content, delta, source, editor) => setProductDescription(editor.getHTML())}
                                            className="rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-gray-600">Please provide the description of the product.</p>
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                        Wink Reviews
                                    </label>
                                    <div className="mt-2">
                                        <ReactQuill
                                            theme="snow"
                                            id="about"
                                            value={winkReviews}
                                            // onChange={setProductDescription}
                                            modules={modules}
                                            formats={formats}
                                            placeholder={`Please write wink reviews for ${productName}`}
                                            onChange={(content, delta, source, editor) => setWinkReviews(editor.getHTML())}
                                            className="rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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


                                <div className="sm:col-span-3 mt-10">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Photo Option</label>
                                    <div className="mt-2">
                                        <button
                                            type="button"
                                            className={`px-4 py-2 rounded-md ${photoOption === 'upload' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-900'} mr-2`}
                                            onClick={() => setPhotoOption('upload')}
                                        >
                                            Upload Photo
                                        </button>
                                        <button
                                            type="button"
                                            className={`px-4 py-2 rounded-md ${photoOption === 'link' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-900'}`}
                                            onClick={() => setPhotoOption('link')}
                                        >
                                            Photo Link
                                        </button>
                                    </div>
                                </div>


                                {photoOption === 'upload' ? (<div className="col-span-full">
                                    <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                        Product photo
                                    </label>
                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        {!preview ? (
                                            <div className="text-center">
                                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                        <span>Upload a file</span>
                                                        <input id="file-upload" name="file-upload" type="file" onChange={handleFileChange} className="sr-only" />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 5MB</p>
                                            </div>
                                        ) : (
                                            // Show preview and remove button if preview is available
                                            <div className="mt-2 flex flex-col items-center justify-center ">
                                                <img
                                                    src={preview}
                                                    alt="Preview"
                                                    className="object-cover w-50 max-w-sm" // Adjusted classes for responsiveness
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleRemoveFile}
                                                    className="mt-2 rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 w-full max-w-xs" // Adjusted classes for full width on small containers
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>) : (<div className="col-span-full mt-10">
                                    {preview && (
                                        <div className="mt-2 flex flex-col items-center justify-center ">
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="object-cover w-50 max-w-sm" // Adjusted classes for responsiveness
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    handleRemoveFile();
                                                    setPhotoLink('');
                                                }}
                                                className="mt-2 rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 w-full max-w-xs" // Adjusted classes for full width on small containers
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    )}

                                    {!preview && (
                                        <>
                                            <label htmlFor="photo-link" className="block text-sm font-medium leading-6 text-gray-900">
                                                Product Photo Link
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="photo-link"
                                                    id="photo-link"
                                                    autoComplete="photo-link"
                                                    onChange={handlePhotoLinkChange}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="https://example.com/photo.jpg"
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>)}
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
                </form>)}
        </>
    )
}
