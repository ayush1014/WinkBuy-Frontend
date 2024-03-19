import React, { useEffect, useState } from 'react';
import NavbarUser from "../NavbarUser";
import api from '../../Config/axios'; // Make sure to use the correct path to your axios instance
import { useParams, Link } from 'react-router-dom';
import './ImageContainer.css'

const typeName = {
  men: [
    { name: 'MenTopwear', show: 'Topwear', link: 'MenTopwear' },
    { name: 'MenBottomwear', show: 'Bottom Wear', link: 'MenBottomwear' },
    { name: 'MenFootwear', show: 'Footwear', link: 'MenFootwear' },
    { name: 'MenSportsAndFitnessWear', show: 'Sports & Fitness Wear', link: 'MenSportsAndFitnessWear' },
    { name: 'MenFashionAccessories', show: 'Fashion Accessories', link: 'MenFashionAccessories' },
    { name: 'MenGifts', show: 'Gifts', link: 'MenGifts' },
    { name: 'MenGadgets', show: 'Gadgets', link: 'MenGadgets' },
    { name: 'MenBagsAndBackpacks', show: 'Bags & Backpacks', link: 'MenBagsAndBackpacks' },
  ],
  women: [
    { name: 'Dresses', show: 'Dressess', link: 'Dresses' },
    { name: 'TopsTeesAndShirts', show: 'Tops, Tees & Shirts', link: 'TopsTeesAndShirts' },
    { name: 'WomenBottomwear', show: 'Bottomwear', link: 'WomenBottomwear' },
    { name: 'WomenFootwear', show: 'Footwear', link: 'WomenFootwear' },
    { name: 'WomenHoodiesAndOuterwears', show: 'Hoodies & Outerwears', link: 'WomenHoodiesAndOuterwears' },
    { name: 'WomenGifts', show: 'Gifts', link: 'WomenGifts' },
    { name: 'WomenSportsAndFitnessWear', show: 'Sports & Fitness Wear', link: 'WomenSportsAndFitnessWear' },
    { name: 'BeautyAndPersonalCare', show: 'Beauty & Personal Care', link: 'BeautyAndPersonalCare' },
    { name: 'WomenFashionAccessories', show: 'Fashion Accessories', link: 'BeautyAndPersonalCare' },
    { name: 'BagsPursesAndHandbags', show: 'Purses & Handbags', link: 'BagsPursesAndHandbags' },
  ],
  HomeAndDecor: [
    { name: 'Furniture', show: 'Furnitures', link: 'Furniture' },
    { name: 'PhotoFrames', show: 'Photo Frames', link: 'PhotoFrames' },
    { name: 'LivingRoom', show: 'Living Room', link: 'LivingRoom' },
    { name: 'Bathroom', show: 'Bathroom', link: 'Bathroom' },
    { name: 'Bedroom', show: 'Bedroom', link: 'Bedroom' },
    { name: 'Kitchen', show: 'Kitchen', link: 'Kitchen' },
    { name: 'Lights', show: 'Lights', link: 'Lights' },
    { name: 'Plants', show: 'Plants', link: 'Plants' },
    { name: 'Decorations', show: 'Decorations', link: 'Decorations' },
    { name: 'HomeDecorGifts', show: 'Home Decor Gifts', link: 'HomeDecorGifts' },
  ],
  technology: [
    { name: 'Phones', show: 'Phones', link: 'Phones' },
    { name: 'Tablets', show: 'Tablets', link: 'Tablets' },
    { name: 'SmartDevices', show: 'Smart Devices', link: 'SmartDevices' },
    { name: 'LaptopAndTabletAccessories', show: 'Laptop & Tablet Accessories', link: 'LaptopAndTabletAccessories' },
    { name: 'PhoneAccessories', show: 'Phone Accessories', link: 'PhoneAccessories' },
    { name: 'Laptops', show: 'Laptops', link: 'Laptops' },
    { name: 'Televisions', show: 'Televisions', link: 'Televisions' },
    { name: 'Monitors', show: 'Monitors', link: 'Monitors' },
    { name: 'Gaming', show: 'Gaming', link: 'Gaming' },
    { name: 'Softwares', show: 'Softwares', link: 'Softwares' },
  ],
  HealthAndFitness: [
    { name: 'ScalesAndMeasure', show: 'Scales & Measure', link: 'ScalesAndMeasure' },
    { name: 'Nutrition', show: 'Nutrition', link: 'Nutrition' },
    { name: 'WorkoutEquiments', show: 'Workout Equiments', link: 'WorkoutEquiments' },
    { name: 'FitnessGadgets', show: 'Fitness Gadgets', link: 'FitnessGadgets' },
    { name: 'Supplements', show: 'Supplements', link: 'Supplements' },
    { name: 'Books', show: 'Books, Fitness Courses & Live Coaches', link: 'Books' },
  ],
  CarAccessories: [
    { name: 'Cleaning', show: 'Cleaning', link: 'Cleaning' },
    { name: 'Fragrance', show: 'Fragrance', link: 'Fragrance' },
    { name: 'DashCams', show: 'Dash Cams', link: 'DashCams' },
    { name: 'PhoneHolders', show: 'Phone Holders', link: 'PhoneHolders' },
    { name: 'CarNeeds', show: 'Car Needs', link: 'CarNeeds' },
  ]
}

export default function TypeCategories() {
  const [updatedCategories, setUpdatedCategories] = useState([]);
  const { type } = useParams();

  useEffect(() => {
    api.get(`/main-category/${type}/categories`)
      .then((response) => {
        const updatedCats = response.data.map(category => {
          const match = typeName[type]?.find(t => t.name === category.category_name);
          return match ? { ...category, show: match.show, link: match.link } : { ...category, show: category.category_name, link: category.category_name };
        });
        setUpdatedCategories(updatedCats);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, [type]); // Include 'type' as a dependency

  return (
    <>
      <NavbarUser />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">{type} Categories</h2>
          <div className="py-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {updatedCategories.map((category, index) => (
              <Link key={index} to={`/${type}/${category.link}`} className="group"> {/* Use Link component for SPA behavior */}
                <div className="image-container aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-0 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={category.category_pic || 'https://via.placeholder.com/150'}
                    alt={`Category: ${category.show}`}
                    className="product-image h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-xl text-gray-700">{category.show}</h3>
              </Link> // Changed from <a> to <Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}