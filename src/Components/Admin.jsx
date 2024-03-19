import React from 'react';
import AdminHome from './NavbarAdmin';
import NavbarAdmin from './NavbarAdmin';
import Categories from './Catagories';
import AdminCategories from './AdminCatagories';
import { useNavigate } from 'react-router-dom';
import NavbarUser from './NavbarUser';

function Admin() {
    const navigate = useNavigate();

    const handleAddProduct = () => {
        navigate('/admin/addproducts');
    };

    const handleAddBlogs = ()=>{
        navigate('/admin/addblogs');
    }

    return (
        <div>
            {/* admin */}
            <NavbarUser />
            <div className="absolute top-22 right-16"> {/* Adjust the positioning as needed */}
                <div className='px-8 flex p-20 gap-x-8'>
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
            </div>
            <div>
                <AdminCategories />
            </div>
        </div>
    );
}

export default Admin;
