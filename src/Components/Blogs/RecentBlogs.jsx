import React, { useEffect, useState } from 'react';
import api from '../../Config/axios';
import NavbarUser from '../NavbarUser';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';


export default function RecentBlogs() {
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // console.log("Fetching blog posts...");
        api.get('/blogs')
            .then((response) => {
                // console.log("Blog posts:", response.data);
                setPosts(response.data.slice(0,3));
            })
            .catch((error) => {
                console.error('Error fetching blog posts:', error);
            });
    }, []);



    return (
        <>
            <div className="bg-white py- sm:py-1">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Recent Drops on Wink Blogs</h2>
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
                                            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
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
                                    {/* <div className="relative mt-2 flex items-center gap-x-4">
                                <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-100" />
                                <div className="text-sm leading-6">
                                    <p className="font-semibold text-gray-900">
                                        <a href={post.author.href}>
                                            <span className="absolute inset-0" />
                                            {post.author.name}
                                        </a>
                                    </p>
                                    <p className="text-gray-600">{post.author.role}</p>
                                </div>
                            </div> */}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
