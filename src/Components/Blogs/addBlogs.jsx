import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import NavbarAdmin from '../NavbarAdmin'
import api from '../../Config/axios'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { BounceLoader } from 'react-spinners';

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


export default function AddBlogs() {

    const [category, setCategory] = useState();
    const [photoOption, setPhotoOption] = useState('upload');
    const [blogTitle, setBlogTitle] = useState();
    const [blogName, setBlogName] = useState();
    const [blogBody, setBlogBody] = useState();
    const [blogPhotos, setBlogPhotos] = useState('');
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [coverPhotoLink, setCoverPhotoLink] = useState('');
    const [coverPhotoOption, setCoverPhotoOption] = useState('upload');
    const [coverPhotoPreview, setCoverPhotoPreview] = useState('');
    const [blogSummary, setBlogSummary] = useState('');


    const [blogSections, setBlogSections] = useState([
        { blogName: '', blogBody: '', blogPhotos: '', file: null, preview: '', photoOption: 'upload' },
    ]);

    const addBlogSection = () => {
        setBlogSections([...blogSections, { blogName: '', blogBody: '', blogPhotos: '' }]);
    };

    const handleBlogSectionChange = (index, field, value) => {
        const updatedSections = [...blogSections];
        updatedSections[index][field] = value;
        setBlogSections(updatedSections);
    };

    const handleRemoveSection = (index) => {
        const updatedSections = [...blogSections];
        updatedSections.splice(index, 1);
        setBlogSections(updatedSections);
    };

    const handlePhotoOptionChange = (index, option) => {
        const updatedSections = [...blogSections];
        updatedSections[index].photoOption = option;
        setBlogSections(updatedSections);
    };



    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    const handleFileChange = (e, index) => {
        console.log('Index:', index, 'Current Sections:', blogSections);
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const updatedSections = [...blogSections];
                updatedSections[index].file = file;
                updatedSections[index].preview = reader.result; // This is the data URL for previewing the image
                setBlogSections(updatedSections);
            };
            reader.readAsDataURL(file);
        }
    };


    const handlePhotoLinkChange = (e, index) => {
        const { value } = e.target;
        const updatedSections = [...blogSections];
        updatedSections[index].blogPhotos = value;
        // Clear the file and preview URL since a link is provided
        updatedSections[index].file = null;
        updatedSections[index].preview = '';
        setBlogSections(updatedSections);
    };

    const handleRemoveImage = (index) => {
        const updatedSections = [...blogSections];
        updatedSections[index].blogPhotos = ''; // Clear the photo link
        updatedSections[index].file = null; // Clear the file from the section
        updatedSections[index].preview = ''; // Clear the preview URL
        // Reset the input value
        const inputElement = document.getElementById(`photo-link-${index}`);
        if (inputElement) {
            inputElement.value = '';
        }
        setBlogSections(updatedSections);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        formData.append('blogTitle', blogTitle);
        formData.append('blogSummary', blogSummary);
        formData.append('category', category);
        if (coverPhotoOption === 'upload' && coverPhoto) {
            formData.append('blogCoverPhoto', coverPhoto);
        } else if (coverPhotoOption === 'link') {
            formData.append('blogCoverPhoto', coverPhotoLink);
        }

        // Serialize blog sections as JSON
        formData.append('blogSections', JSON.stringify(blogSections.map(section => ({
            blogName: section.blogName,
            blogBody: section.blogBody,
            blogPhotos: section.blogPhotos,
            // Do not append files here; handle separately
        }))));

        // Append files separately
        blogSections.forEach((section, index) => {
            if (section.file) {
                formData.append(`blogSections[${index}][blogPhotos]`, section.file);
            }
        });

        try {
            const response = await api.post('/admin/blogs', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            for (let [key, value] of formData.entries()) {
                console.log(`yo ${key}: ${value}`);
            }
            console.log(response.data);
            if (response.data.message === 'Blog created successfully') {
                setIsLoading(false);
            }
            // Handle success
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };


    return (
        <>
            <NavbarAdmin />
            {isLoading ? <div className="overlay">
                <BounceLoader size={60} color={"#123abc"} loading={isLoading} />
            </div> : (
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="space-y-12 p-8 md:p-20">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Add Your Blog Here</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                This information will be displayed publicly so be careful what you share. Here is how your blog will look like <br />
                                Please add blogs into following sections
                            </p>

                            <div className="sm:col-span-3">
                                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                    Blog Category
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
                                        <option value="Phones">Phones</option>
                                        <option value="Laptops">Laptops</option>
                                        <option value="Tablets">Tablets</option>
                                        <option value="MenClothing">Men Clothing</option>
                                        <option value="WomenClothing">Women Clothing</option>
                                        <option value="MenShoes">Men Shoes</option>
                                        <option value="WomenShoes">Women Shoes</option>
                                        <option value="HealthAndFitness">Health & Fitness</option>
                                        <option value="CarAccessories">Automotive Accessories</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-10 sm:col-span-4">
                                <label htmlFor="blog" className="block text-sm font-medium leading-6 text-gray-900">
                                    Blog Title
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span> */}
                                        <input
                                            type="text"
                                            name="blog"
                                            id="blog"
                                            autoComplete="blog"
                                            onChange={(e) => { setBlogTitle(e.target.value) }}
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="IPhone 16 pro max"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 sm:col-span-4">
                                <label htmlFor="blogSummary" className="block text-sm font-medium text-gray-900">
                                    Blog Summary
                                </label>
                                        {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span> */}
                                        <ReactQuill
                                            theme="snow"
                                            value={blogSummary}
                                            onChange={setBlogSummary} // Adjust accordingly if you're handling the change differently
                                            modules={modules}
                                            formats={formats}
                                            placeholder="Enter a short summary of the blog"
                                            style={{ height: 'auto', marginBottom: '30px' }}
                                        />
                            </div>
                            <div className="sm:col-span-3 mt-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Cover Photo Option</label>
                                <div className="mt-2">
                                    <button type="button" onClick={() => setCoverPhotoOption('upload')} className={`px-4 py-2 rounded-md ${coverPhotoOption === 'upload' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-900'} mr-2`}>Upload Photo</button>
                                    <button type="button" onClick={() => setCoverPhotoOption('link')} className={`px-4 py-2 rounded-md ${coverPhotoOption === 'link' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-900'}`}>Photo Link</button>
                                </div>
                            </div>

                            {coverPhotoOption === 'upload' && (
                                <div className="col-span-full">
                                    <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                        Blog Cover photo
                                    </label>
                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        {!coverPhotoPreview && (
                                            <div className="text-center">
                                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                    <label
                                                        htmlFor="cover-file-upload"
                                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                    >
                                                        <span>Upload a file</span>
                                                        <input
                                                            id="cover-file-upload"
                                                            name="cover-file-upload"
                                                            type="file"
                                                            onChange={(e) => {
                                                                const file = e.target.files[0];
                                                                setCoverPhoto(file);
                                                                setCoverPhotoPreview(URL.createObjectURL(file));
                                                            }}
                                                            className="sr-only"
                                                        />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 5MB</p>
                                            </div>
                                        )}

                                        {coverPhotoPreview && (
                                            <div className="mt-2 flex flex-col items-center justify-center">
                                                <img
                                                    src={coverPhotoPreview}
                                                    alt="Cover Preview"
                                                    className="object-cover w-50 max-w-sm"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setCoverPhoto(null);
                                                        setCoverPhotoPreview('');
                                                    }}
                                                    className="mt-2 rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 w-full max-w-xs"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}


                            {coverPhotoOption === 'link' && (
                                <div className="col-span-full mt-10">
                                    {coverPhotoLink === '' && (
                                        <div>
                                            <label htmlFor="cover-photo-link" className="block text-sm font-medium leading-6 text-gray-900">
                                                Blog Cover Photo Link
                                            </label>
                                            <div className="mt-2 flex items-center">
                                                <input
                                                    type="text"
                                                    name="cover-photo-link"
                                                    id="cover-photo-link"
                                                    autoComplete="photo-link"
                                                    onChange={(e) => {
                                                        setCoverPhotoLink(e.target.value);
                                                        setCoverPhotoPreview(e.target.value); // Automatically update the preview based on the link
                                                    }}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder="https://example.com/photo.jpg"
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {coverPhotoLink && (
                                        <div className="mt-4 flex flex-col items-center justify-center ">
                                            <img
                                                src={coverPhotoPreview}
                                                alt="Cover Preview"
                                                className="object-cover w-80 h-80 rounded-md"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setCoverPhotoLink('');
                                                    setCoverPhotoPreview('');
                                                }}
                                                className="mt-2 rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 w-full max-w-xs"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}




                            {
                                blogSections.map((section, index) => (
                                    <div key={index} className="space-y-6 bg-white p-4 mt-14 shadow sm:rounded-md">
                                        {/* Sub Blog Title */}
                                        <div>
                                            <label htmlFor={`blogName-${index}`} className="block text-sm font-medium text-gray-700">
                                                Sub Blog Title
                                            </label>
                                            <input
                                                type="text"
                                                id={`blogName-${index}`}
                                                value={section.blogName}
                                                onChange={(e) => handleBlogSectionChange(index, 'blogName', e.target.value)}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2"
                                                placeholder="Sub blog title"
                                                required
                                            />
                                        </div>

                                        {/* Blog Body */}
                                        <div>
                                            <label htmlFor={`blogBody-${index}`} className="block text-sm font-medium text-gray-700">
                                                Blog Body
                                            </label>
                                            <ReactQuill
                                                theme="snow"
                                                value={section.blogBody}
                                                onChange={(content, delta, source, editor) => handleBlogSectionChange(index, 'blogBody', editor.getHTML())}
                                                modules={modules}
                                                formats={formats}
                                                placeholder="Blog content"
                                                style={{ height: 'auto', marginBottom: '50px' }} // Set initial height
                                            />
                                        </div>

                                        {/* Blog Photos */}
                                        <div className="sm:col-span-3 mt-10">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">Photo Option</label>
                                            <div className="mt-2">
                                                <button
                                                    type="button"
                                                    className={`px-4 py-2 rounded-md ${section.photoOption === 'upload' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-900'} mr-2`}
                                                    onClick={() => handlePhotoOptionChange(index, 'upload')}
                                                >
                                                    Upload Photo
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`px-4 py-2 rounded-md ${section.photoOption === 'link' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-900'}`}
                                                    onClick={() => handlePhotoOptionChange(index, 'link')}
                                                >
                                                    Photo Link
                                                </button>
                                            </div>
                                        </div>


                                        {section.photoOption === 'upload' ? (<div className="col-span-full">
                                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                                Blog Product photo
                                            </label>
                                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                                {!section.preview && (<div className="text-center">
                                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                        <label
                                                            htmlFor={`file-upload-${index}`}
                                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                        >
                                                            <span>Upload a file</span>
                                                            <input
                                                                id={`file-upload-${index}`} // unique ID for each file input
                                                                name={`file-upload-${index}`} // unique name for each file input
                                                                type="file"
                                                                onChange={(e) => handleFileChange(e, index)}
                                                                className="sr-only"
                                                            />
                                                        </label>
                                                        <p className="pl-1">or drag and drop</p>
                                                    </div>
                                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 5MB</p>
                                                </div>)}

                                                {section.preview && (
                                                    <div className="mt-2 flex flex-col items-center justify-center ">
                                                        <img
                                                            src={section.preview}
                                                            alt="Preview"
                                                            className="object-cover w-50 max-w-sm" // Adjusted classes for responsiveness
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveImage(index)}
                                                            className="mt-2 rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 w-full max-w-xs" // Adjusted classes for full width on small containers
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                )}

                                            </div>
                                        </div>) : (<div className="col-span-full mt-10">
                                            {blogSections[index].blogPhotos === '' && (
                                                <div>
                                                    <label htmlFor={`photo-link-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                                                        Product Photo Link
                                                    </label>
                                                    <div className="mt-2 flex items-center">
                                                        <input
                                                            type="text"
                                                            name={`photo-link-${index}`}
                                                            id={`photo-link-${index}`}
                                                            autoComplete="photo-link"
                                                            onChange={(e) => handlePhotoLinkChange(e, index)}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            placeholder="https://example.com/photo.jpg"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            {blogSections[index].blogPhotos && (
                                                <div className="mt-2 flex flex-col items-center justify-center ">
                                                    <img
                                                        src={blogSections[index].blogPhotos}
                                                        alt="Preview"
                                                        className="object-cover w-80 h-80 rounded-md"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveImage(index)}
                                                        className="mt-2 rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 w-full max-w-xs"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            )}
                                        </div>)}
                                        <div>
                                            {index > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveSection(index)}
                                                    className="text-sm text-red-600 hover:underline">
                                                    Remove this section
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))
                            }
                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={addBlogSection}
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Add More Blog Section
                                </button>
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




