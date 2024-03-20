import Catagories from './Catagories'
import Advertisements from './Advertisements'
import Footer from './Footer'
import NavbarUser from './NavbarUser'
import React, { useEffect, useState } from 'react'
import RecentDrops from './Products/RecentDrops'
import RecentBlogs from './Blogs/RecentBlogs'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import { HeartIcon } from '@heroicons/react/24/outline';
import InfiniteProduct from './Products/InfiniteProduct'


export default function Home() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [adminCheck, setAdminCheck] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    // Retrieve the user data from sessionStorage
    const userDataString = sessionStorage.getItem('User');

    if (userDataString) {
      // Parse the user data string back into an object
      const userData = JSON.parse(userDataString);
      if (userData.role == 'Admin') {
        setAdminCheck(true)
      }

      setUser(userData);
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, []);
  const navigateToFavoritePage = () => {
    navigate('/wishlist')
  }

  const handleAddProduct = () => {
    navigate('/admin/addproducts');
  };

  const handleAddBlogs = () => {
    navigate('/admin/addblogs');
  }
  return (
    <div>
      <div>
        <NavbarUser />
      </div>
      <div className="welcome-message flex items-center justify-between">
        {isUserLoggedIn && (
          <>
            <h3>Welcome {user?.fullname} !!</h3>
            {/* <h8>Wishlist</h8> */}

            <HeartIcon
              className="h-10 w-10 md:h-20 md:w-20 text-red-600 cursor-pointer pr-4 md:pr-12"
              onClick={navigateToFavoritePage}
              aria-hidden="true"
            />
          </>

        )}
      </div>

      <div className='md:p-2'>
        {adminCheck && (
          <div className="absolute mt-10 top-10 right-6 lg:top-14 right-20">
            <div className='px-8 flex gap-x-8'>
              <button
                type="button"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleAddProduct}
              >
                Add Products
              </button>
              <button
                type="button"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleAddBlogs}
              >
                Add Blogs
              </button>
            </div>
          </div>)}
      </div>

      <div>
        <Advertisements />
      </div>

      <div>
        <RecentDrops />
      </div>
      <div>
        <RecentBlogs />
      </div>
      <div className='mt-20'>
        <Catagories />
      </div>
      <div>
        <InfiniteProduct />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}
