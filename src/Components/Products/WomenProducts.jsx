import React, { useEffect, useState } from 'react';
import NavbarUser from '../NavbarUser';
import Footer from '../Footer';
import api from '../../Config/axios';
import { Link, useParams } from 'react-router-dom';
import './ImageContainer.css'

const typeName = {
  Women: [
    { name: 'Dresses', show: 'Dressess'},
    { name: 'TopsTeesAndShirts', show: 'Tops, Tees & Shirts'},
    { name: 'WomenBottomwear', show: 'Bottomwear'},
    { name: 'WomenFootwear', show: 'Footwear' },
    { name: 'WomenHoodiesAndOuterwears', show: 'Hoodies & Outerwears' },
    { name: 'WomenGifts', show: 'Gifts'},
    { name: 'WomenSportsAndFitnessWear', show: 'Sports & Fitness Wear' },
    { name: 'BeautyAndPersonalCare', show: 'Beauty & Personal Care'},
    { name: 'WomenFashionAccessories', show: 'Fashion Accessories' },
    { name: 'BagsPursesAndHandbags', show: 'Purses & Handbags' },
]
}

export default function WomenProducts() {

  const [products, setProducts] = useState([]);
  const [recent, setRecent] = useState([]);
  const [catname, setCatname] = useState();
  let { type } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get(`/products/category/${type}`);
        setProducts(response.data);
        setRecent (response.data.slice(0,10));
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const typeItem = typeName.Women.find(item => item.name === type);
    if (typeItem) {
      setCatname(typeItem.show);
    }
  }, [type]);

  return (
    <div>
      <NavbarUser/>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Recent Drops</h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {recent.map((product) => (
              <div key={product.product_id} className="group relative">
                <div className="image-container aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-0 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.product_pic}
                    alt={`Front of ${product.product_name}`}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`/productDetail/${product.product_id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.product_name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.category.category_name}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${product.product_Price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">All {catname}</h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.product_id} className="group relative">
                <div className="image-container aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-0 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.product_pic}
                    alt={`Front of ${product.product_name}`}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`/productDetail/${product.product_id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.product_name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.category.category_name}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${product.product_Price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}