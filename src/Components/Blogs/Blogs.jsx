import React, { useEffect, useState, useCallback } from 'react';
import api from '../../Config/axios';
import NavbarUser from '../NavbarUser';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';

export default function Blogs() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const maxRetries = 20;
    const retryDelay = 2000;


    const fetchBlogs = useCallback(async (attempt = 0) => {
        try {
            const response = await api.get('/blogs');
            setPosts(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            if (attempt < maxRetries) {
                setTimeout(() => fetchBlogs(attempt + 1), retryDelay);
            } else {
                setIsLoading(false);
            }
        }
    }, [maxRetries, retryDelay]);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);


    return (
        <>
            <NavbarUser />
            <div className="bg-white py-10 sm:py-12">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the Wink Blogs</h2>
                        <p className="mt-2 text-lg leading-8 text-gray-600">
                            get some great buying ideas for buying products like smartphones, laptops, tablets, cloths, shoes and more with our expert advice.
                        </p>
                    </div>
                    {isLoading ? (
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
                            <BounceLoader size={60} color={"#123abc"} loading={isLoading} />
                        </div>
                    ) : (
                        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                            {posts.map((post) => (
                                <article key={post.blog} className="flex flex-col items-start justify-between">
                                    <div className="relative w-full">
                                        <a href={`/blog/${post.blog}`}>
                                            <img
                                                src={post.blogCoverPhoto}
                                                alt=""
                                                className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                                onClick={() => {
                                                    console.log(`Navigating to /blogs/${post.blog}`);
                                                    navigate(`/blogs/${post.blog}`);
                                                }}
                                            />
                                            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                                        </a>
                                    </div>
                                    <div className="max-w-xl">
                                        <div className="mt-4 flex items-center gap-x-4 text-xs">
                                            <time dateTime={new Date(post.createdAt).toISOString().split('T')[0]} className="text-gray-500">
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </time>
                                            <a
                                                // href={post.category.href}
                                                className="relative z-2 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                            >
                                                {post.blog_category}
                                            </a>
                                        </div>
                                        <div className="group relative">
                                            <h3 className="mt-1 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                                <a href={`/blog/${post.blog}`}>
                                                    <span className="absolute inset-0" />
                                                    {post.blog}
                                                </a>
                                            </h3>
                                            <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>)}
                </div>
            </div>
            <Footer />
        </>
    )
}
