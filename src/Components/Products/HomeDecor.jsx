import React, { useEffect, useState } from 'react';
import NavbarUser from '../NavbarUser';
import Footer from '../Footer';
import axios from 'axios'; // Make sure to install axios if you haven't already

export default function HomeDecor() {
  // State to store fetched products
  const [products, setProducts] = useState([]);

  // Fetch products from backend on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Update the URL to match your endpoint and ensure your backend is running
        const response = await axios.get('http://localhost:8000/winkbuy/products/category/Home&Decor');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <NavbarUser/>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.product_id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.product_pic}
                    alt={`Front of ${product.product_name}`}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.product_link}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.product_name}
                      </a>
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
