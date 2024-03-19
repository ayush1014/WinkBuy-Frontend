import React, { useEffect, useState } from 'react';
import NavbarUser from "../NavbarUser";
import api from '../../Config/axios'; // Make sure to use the correct path to your axios instance
import { useParams } from 'react-router-dom';
import './ImageContainer.css'

const typeName = {
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
    { name: 'Furniture', show: 'Furnitures' },
    { name: 'PhotoFrames', show: 'Photo Frames' },
    { name: 'LivingRoom', show: 'Living Room' },
    { name: 'Bathroom', show: 'Bathroom' },
    { name: 'Bedroom', show: 'Bedroom' },
    { name: 'Kitchen', show: 'Kitchen' },
    { name: 'Lights', show: 'Lights' },
    { name: 'Plants', show: 'Plants' },
    { name: 'Decorations', show: 'Decorations' },
    { name: 'HomeDecorGifts', show: 'Home Decor Gifts' },
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
    { name: 'Books', show: 'Books, Fitness Courses & Live Coaches' },
  ],
  CarAccessories: [
    { name: 'Cleaning', show: 'Cleaning' },
    { name: 'Fragrance', show: 'Fragrance' },
    { name: 'DashCams', show: 'Dash Cams' },
    { name: 'PhoneHolders', show: 'Phone Holders' },
    { name: 'CarNeeds', show: 'Car Needs' },
  ]
}

export default function TypeCategories() {
  const [categories, setCategories] = useState([]);

  const { type } = useParams();

  useEffect(() => {
    api.get(`/main-category/${type}/categories`)
      .then((response) => {
        const updatedCategories = response.data.map(category => {
          const match = typeName[type]?.find(t => t.name === category.category_name);
          return match ? { ...category, category_name: match.show } : category;
        });
        setCategories(updatedCategories);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, [type]);

  return (
    <>
      <NavbarUser />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">{type} Categories</h2>
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
                  <h3 className="mt-4 text-xl text-gray-700">{category.category_name}</h3>
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
