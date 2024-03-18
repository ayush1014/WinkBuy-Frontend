import React, { useEffect, useState } from 'react';
import NavbarUser from "../NavbarUser";
import api from '../../Config/axios'; // Make sure to use the correct path to your axios instance
import { useParams } from 'react-router-dom';
import './ImageContainer.css'

export default function TypeCategories() {
  const [categories, setCategories] = useState([]);

  const { type } = useParams();

  useEffect(() => {
    api.get(`/main-category/${type}/categories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <>
      <NavbarUser />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">{type} Categories</h2>
          <div className="py-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {categories.map((category) => (
              <>
                <a key={category.category_name} href={`/${category.category_name}`} className="group">
                  <div className="image-container aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-0 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={category.category_pic || 'https://via.placeholder.com/150'} // Placeholder in case there's no image
                      alt={`Category: ${category.category_name}`}
                      className="product-image h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{category.category_name}</h3>
                  {/* You can display more information here if you want */}
                </a>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
