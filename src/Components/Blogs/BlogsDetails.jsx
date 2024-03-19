import { useEffect, useState } from 'react';
import NavbarUser from '../NavbarUser';
import Footer from '../Footer';
import { useParams } from 'react-router-dom';
import api from '../../Config/axios';
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid'
import './BlogsDetails.css'
import { BounceLoader } from 'react-spinners';

const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
    { name: 'Documents', href: '#', current: false },
    { name: 'Reports', href: '#', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function BlogsDetails() {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { blogname } = useParams();

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const urlEncodedString = blogname;
                const decodedString = decodeURIComponent(urlEncodedString);
                console.log('decodedString:', decodedString);
                setIsLoading(true);
                const response = await api.get(`/blogs/${decodedString}`);
                const data = response.data;
                console.log(data);
                setBlogs(data); // Set the array of blogs returned from the API
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching blog details:', error);
            }
        };

        fetchBlogDetails();
    }, [blogname]);

    function slugify(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .trim();                        // Trim - from start and end of text
    }


    return (
        <>
            <NavbarUser />
            {isLoading ? (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
                    <BounceLoader size={60} color={"#123abc"} loading={isLoading} />
                </div>
            ) : ( 
            <div className='flex justify-center bg-white'>
                <div className="sticky-sidebar mt-52 w-40 hidden lg:block">
                    <nav className="Sidebar flex flex-1 flex-col" aria-label="Sidebar">
                            <h6 className="sidebar-header">Jump to: </h6>
                        <ul role="list" className="-mx-4 space-y-1">
                            {blogs.length > 0 && blogs[0].main && (
                                <li>
                                    <a
                                        href={`#${slugify(blogs[0].main.blog)}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const slugifiedId = slugify(blogs[0].main.blog);
                                            const element = document.getElementById(slugifiedId);
                                            if (element) {
                                                element.scrollIntoView({
                                                    behavior: 'smooth'
                                                });
                                            } else {
                                                console.error(`No element found with ID ${slugifiedId}`);
                                            }
                                        }}
                                        className={classNames(
                                            'sidebar-link group flex gap-x-3 rounded-md p-2 pl-3 text-sm leading-6 font-semibold',
                                            blogs[0].main.blog.current ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                                        )}
                                    >
                                        {blogs[0].main.blog}
                                    </a>
                                    <hr></hr>
                                </li>)}
                            {blogs.map((item) => (
                                <li key={item.id}>
                                    <a
                                        href={`#${slugify(item.blogName)}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.getElementById(slugify(item.blogName)).scrollIntoView({
                                                behavior: 'smooth'
                                            });
                                        }}
                                        className={classNames(
                                            'sidebar-link group flex gap-x-3 rounded-md p-2 pl-3 text-sm leading-6 font-semibold',
                                            item.current ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                                        )}
                                    >
                                        {item.blogName}
                                    </a>
                                    <hr></hr>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className='w-full max-w-7xl'>
                    {blogs.length > 0 && ( // Check if blogs array is not empty
                        <div className="bg-white px-6 py-5 lg:px-8" id={slugify(blogs[0].main.blog)}>
                            <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
                                {/* Additional check for blogs[0].main to avoid accessing properties of undefined */}
                                <p className="text-base font-semibold leading-7 text-indigo-600">{blogs[0].main?.blog_category}</p>
                                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{blogs[0].main?.blog}</h1>
                                <figure className="mt-16">
                                    <img
                                        className="aspect-video rounded-xl bg-gray-50 object-cover"
                                        src={blogs[0].main?.blogCoverPhoto}
                                        alt=""
                                    />
                                    <figcaption className="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
                                        <InformationCircleIcon className="mt-0.5 h-5 w-5 flex-none text-gray-300" aria-hidden="true" />
                                        {blogs[0].main?.blog}
                                    </figcaption>
                                </figure>
                                <p className="mt-6 text-xl leading-8">
                                    <div dangerouslySetInnerHTML={{ __html: blogs[0].main?.blogSummary }} />
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="overflow-hidden bg-white">
                        {blogs.map((blog, index) => (
                            <div key={index} id={slugify(blog.blogName)} className="relative mx-auto max-w-7xl px-6 lg:px-8">
                                <div className="mx-auto max-w-prose text-base lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-8">
                                    <div>
                                        <h2 className="text-lg font-semibold text-indigo-600">{blog.blogName}</h2>
                                        <h3 className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">{blog.blogName}</h3>
                                    </div>
                                </div>
                                <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
                                    <div className="relative lg:col-start-2 lg:row-start-1">
                                        <div className="relative mx-auto max-w-prose text-base lg:max-w-none">
                                            <figure>
                                                <div className="aspect-h-7 aspect-w-12 lg:aspect-none">
                                                    <img
                                                        className="rounded-lg object-cover object-center shadow-lg"
                                                        src={blog.blogPhotos}
                                                        alt={blog.blogName}
                                                    />
                                                </div>
                                            </figure>
                                        </div>
                                    </div>
                                    <div className="mt-8 lg:mt-0">
                                        <div className="mx-auto max-w-prose text-base lg:max-w-none">
                                            {/* Render blogBody as HTML */}
                                            <div dangerouslySetInnerHTML={{ __html: blog.blogBody }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>)}
            <Footer />
        </>
    );
}
