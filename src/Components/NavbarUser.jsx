import React, { useEffect, Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  ShoppingCartIcon,
  SparklesIcon,
  XMarkIcon,
  ComputerDesktopIcon,
  HeartIcon,
  HomeModernIcon,
  TruckIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'
import Logo from '../Utilities/products_Images/Wink Buy.gif'

const TopwearIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.717 43.1324L12.986 42.4879C12.03 42.3789 11.7163 42.1456 11.7215 41.1844L11.7439 30.2796C11.7535 30.0739 11.801 29.8756 11.8105 29.6696L12.1136 22.6022C12.122 22.3924 12.1431 22.189 12.1343 21.9787C11.8796 22.2776 11.4602 22.607 11.1193 22.7855L10.8647 22.9131C9.28725 23.6086 7.67217 22.6718 6.32288 21.9211L4.57514 20.9184C3.89455 20.4868 2.62052 19.6134 2.30336 18.8617L2.24316 18.7035C2.1475 18.4356 2.12158 18.1011 2.16778 17.8201L2.17314 17.7895C2.25428 17.2702 2.51577 16.9947 2.89382 16.6684L4.78702 15.0468C6.07407 13.877 6.86803 12.76 7.75247 11.2465L8.66682 9.69464C9.77691 7.95816 11.1374 6.46983 13.2422 6.03057L14.6082 5.80406C15.3844 5.65467 16.1129 5.38336 16.8051 5.00489L17.3907 4.66639C18.2992 4.11379 18.3079 4.26868 19.1585 4.65277C21.9165 5.89819 26.2064 5.90203 28.9299 4.57404C29.1633 4.46023 29.37 4.32732 29.6275 4.27087C30.0224 4.23326 30.3175 4.52686 30.6374 4.70602C31.7152 5.30958 32.7287 5.69588 33.9493 5.90358C34.2094 5.94783 34.4756 5.96527 34.7344 6.02325C37.1695 6.56897 38.5149 8.31657 39.7468 10.3832L40.5075 11.6903C41.6723 13.5658 42.6313 14.5868 44.2777 15.9798C45.6905 17.175 46.648 18.1986 45.0182 19.7357C43.9998 20.6961 42.6919 21.378 41.4725 22.0483C39.6182 23.0677 37.5824 23.8773 35.8871 22.0408L35.8658 22.0174C35.8539 22.2345 35.9011 23.2736 35.9303 23.4338C36.0675 24.1866 36.0031 25.2309 36.0557 26.0698L36.1341 27.8719C36.1452 28.0386 36.1716 28.2031 36.1772 28.3704L36.1921 30.3241C36.1969 30.4952 36.2363 30.6616 36.2429 30.8325L36.2481 32.1791C36.2521 32.3863 36.2879 32.5898 36.2911 32.7954L36.2959 39.3157C36.296 39.7109 36.3484 41.542 36.2545 41.7152C36.0922 42.0149 35.9688 42.2361 35.6441 42.3898L35.6073 42.4067C35.4538 42.478 35.2984 42.4774 35.1329 42.4948L27.5791 43.4725L24.8438 43.6411C24.172 43.665 23.5074 43.6291 22.8375 43.601L21.7581 43.5718L17.717 43.1324ZM18.8948 6.15277C18.8896 6.45896 19.1423 7.44966 19.2359 7.72308C19.6289 8.87128 20.1299 9.87919 20.9336 10.8007C21.8147 11.8109 22.5151 12.1121 23.7926 12.1158C25.5211 12.121 26.2562 11.9285 27.3635 10.4563L27.7515 9.88702C28.2449 9.03788 28.6253 8.21067 28.8344 7.24547L28.9627 6.57028C28.9853 6.43317 28.9943 6.2851 29.0359 6.15263C26.3992 7.38839 22.0247 7.29577 19.3903 6.34322L18.8948 6.15277ZM17.4504 6.3128C16.7207 6.66957 16.0256 6.97435 15.2344 7.17338C14.5451 7.34677 13.8232 7.39866 13.1443 7.59591C10.9196 8.24236 9.87657 10.5801 8.77599 12.4029C7.68858 14.204 6.57146 15.5029 4.95446 16.8637L3.95858 17.7183C3.83222 17.8321 3.68064 17.9467 3.58046 18.0834C3.99401 19.0704 6.42277 20.308 7.33777 20.8013C8.74444 21.5597 9.77208 22.2165 11.0802 20.9726C11.4757 20.5965 11.8568 20.1453 12.3036 19.8366L12.3676 18.2661C12.3886 17.1535 13.4967 17.0104 13.7989 17.8715L13.8146 17.906C13.8733 18.0414 13.7349 20.4631 13.7075 20.5903C13.6262 20.9659 13.6599 21.3852 13.6374 21.7698L13.548 23.309C13.5411 23.4111 13.5136 23.5094 13.5082 23.6103L13.3217 27.4636L13.182 31.4824L13.175 33.4575C13.1702 33.6297 13.1389 33.7994 13.1335 33.9719L13.1274 35.996C13.1278 36.3671 13.1039 36.7641 13.1541 37.1309L34.8713 37.1278L34.8706 34.502C34.8703 34.0774 34.9144 33.5807 34.8432 33.1643L34.8501 33.1433C34.72 32.6386 34.8044 31.0947 34.7953 30.4966L34.6815 27.3338L34.5244 24.4903C34.4986 23.7513 34.4401 23.0235 34.4206 22.2965L34.2098 18.8242C34.195 18.5623 34.1262 18.2882 34.1495 18.0266C34.2002 17.4569 34.9065 17.1023 35.3544 17.4918C35.9001 17.9664 35.4339 19.4534 35.68 19.8488C35.715 19.905 35.8939 19.9924 35.9564 20.0512L36.89 20.9722C37.8391 21.8627 38.6886 21.8293 39.8535 21.2408L40.9673 20.6371C41.6797 20.2489 44.0996 18.9821 44.3699 18.1693L44.3919 18.0979C44.2704 17.891 44.057 17.7324 43.8799 17.5737L42.5068 16.3846C40.8187 14.8705 39.8485 13.4426 38.6795 11.4965C37.6041 9.70632 36.7138 8.04839 34.5586 7.50464C33.3612 7.20253 32.655 7.22696 31.4273 6.71644L30.4776 6.31182C30.1757 8.88024 29.1036 11.2484 27.0325 12.8945C26.5605 13.2697 24.4864 14.7955 23.8615 14.7105C23.6641 14.6836 23.4094 14.5 23.2298 14.4062C20.1819 12.8143 17.7915 9.80307 17.4516 6.31622L17.4504 6.3128ZM13.2407 38.6075L13.1488 38.616C13.1165 38.7947 13.1274 38.9876 13.1271 39.1692L13.1266 40.0775C13.1266 40.3812 13.0894 40.7449 13.1364 41.0417C13.3302 41.0707 13.5254 41.0734 13.7204 41.0917L17.4852 41.6172L21.3768 42.0388C22.1024 42.1088 23.0131 42.1479 23.7573 42.162C24.1047 42.1685 24.4501 42.1281 24.7969 42.1193L26.2953 42.0887C26.4248 42.0802 26.5466 42.0499 26.6753 42.0395L31.7461 41.4351C32.4039 41.3485 33.062 41.2189 33.7231 41.1633L34.3711 41.0861C34.534 41.0708 34.7126 41.0735 34.8707 41.0342L34.8704 38.6119L13.2407 38.6075Z" fill="black" />
  </svg>
);


const men = [
  { name: 'Topwear', description: 'Amazing men Tees, Jackets, Shirts & more', href: 'men/MenTopwear', icon: TopwearIcon },
  { name: 'Bottomwear', description: 'Men Jeans, Trousers, Shorts & more', href: 'men/MenBottomwear', icon: ShoppingCartIcon },
  { name: 'Footwear', description: 'Sneakers, Casual shoes, Sports shoes, Flip Flops & more', href: 'men/MenFootwear', icon: SparklesIcon },
  { name: 'Sports & Fitness Wear', description: 'Sports shoes, Active T-shirts, Tracksuits, Jackets and Sweatshirts & more', href: 'men/MenSportsAndFitnessWear', icon: ComputerDesktopIcon },
  { name: 'Fashion Accessories', description: 'Wallets, Belts, Fragrances, Body Mists, Jewellery, Caps, Hats & more', href: 'men/MenFashionAccessories', icon: HeartIcon },
  { name: 'Gifts', description: 'Cologne, Jewellry, Belts, Clothings, Wallets & more', href: 'men/MenGifts', icon: TruckIcon },
  { name: 'Gadgets', description: 'Smartwatches, Phone Cases, Fitness bands, Watches, Watch Bands & more', href: 'men/MenGadgets', icon: TruckIcon },
  { name: 'Bags & Backpacks', description: 'Bagpacks, Office Bags, Laptop bags, Travelling bags & more', href: 'men/MenBagsAndBackpacks', icon: TruckIcon },
]
const women = [
  { name: 'Dresses', description: 'Birthday Dresses, Casual Dresses, Prom Dresses, Formal Dresses & more', href: 'women/Dresses', icon: HomeModernIcon },
  { name: 'Tops, Tees & Shirts', description: 'Tops, Tees, Blouses, Cardigans, Pullovers, Crop tops & more', href: 'women/TopsTeesAndShirts', icon: ShoppingCartIcon },
  { name: 'Bottomwear', description: 'Jeans, Pants, Shorts, Skrits & more', href: 'women/WomenBottomwear', icon: SparklesIcon },
  { name: 'Hoodies & Outerwears', description: 'Hoddies, Jackets, Sweaters, Zip ups & more', href: 'women/WomenHoodiesAndOuterwears', icon: SparklesIcon },
  { name: 'Footwear', description: 'Heels, Sandals, Flats, Shoes, Boots, Sneakers & more', href: 'women/WomenFootwear', icon: SparklesIcon },
  { name: 'Gifts', description: 'Perfumes, Body Mists, Rings, Necklaces, Bracelets, Candels, Gift Hampers & more', href: 'women/WomenGifts', icon: TruckIcon },
  { name: 'Sports & Fitness Wear', description: 'Sport Shoes, Sports Clothing, Sports Accessories & more', href: 'women/WomenSportsAndFitnessWear', icon: ComputerDesktopIcon },
  { name: 'Beauty & Personal Care', description: 'Skincare, Bodycare, Haircae, Makeups & more', href: 'women/BeautyAndPersonalCare', icon: HeartIcon },
  { name: 'Fashion Accessories', description: 'Necklace, Bracelets, Ankelets, Ear Rings & more', href: 'women/WomenFashionAccessories', icon: TruckIcon },
  { name: 'Bags, Purses & Handbags', description: 'Handbags, Totebags, Sidebags, Wallets, Purses & more', href: 'women/BagsPursesAndHandbags', icon: TruckIcon },
]
const homeanddecor = [
  { name: 'Furniture', description: 'Tables, Chairs, Love Seats, Recliners & many more', href: 'HomeAndDecor/Furniture', icon: HomeModernIcon },
  { name: 'Photo Frames', description: 'Frames, Polaroid frames, Couple photo frames & more', href: 'HomeAndDecor/PhotoFrames', icon: ShoppingCartIcon },
  { name: 'Living Room', description: 'Sofas, Recliners, Coffee Tables, TV Units, Lamps, Lights & more decorations', href: 'HomeAndDecor/LivingRoom', icon: ShoppingCartIcon },
  { name: 'Bedroom', description: 'Bed Frames, Mattresses, Side tables, Night Lamps, Lamps, Lights & more decorations', href: 'HomeAndDecor/Bathroom', icon: ShoppingCartIcon },
  { name: 'Bathroom', description: 'Bathtub Accessories, Mats, Soap Dispensers, Rugs, Towel Stands & more decorations', href: 'HomeAndDecor/Bedroom', icon: SparklesIcon },
  { name: 'Kitchen', description: 'Towel Holders, Dispensers, Mats, Racks, Coasters & more', href: 'HomeAndDecor/Kitchen', icon: ComputerDesktopIcon },
  { name: 'Lights', description: 'Led lights, Neon lights, Artistic Lamps, Smart Bulbs & more', href: 'HomeAndDecor/Lights', icon: HeartIcon },
  { name: 'Plants', description: 'Indoor Plants, Plant seed, Pet friendly plants, Succulent Plants & more', href: 'HomeAndDecor/Plants', icon: TruckIcon },
  { name: 'Decorations', description: 'Party Decor, Artifical plats, Indoor String Lights, Birthday Decor, Artistic Paintings, Show Peices & more', href: 'HomeAndDecor/Decorations', icon: TruckIcon },
  { name: 'Home Decor Gifts', description: 'Showpiece, Paintings, Coffee Mugs, Diffusers & more', href: 'HomeAndDecor/HomeDecorGifts', icon: TruckIcon }
]
const tech = [
  { name: 'Phones', description: 'Iphone, Samsung, Nothing, Motorola, Asus & more', href: 'technology/Phones', icon: HomeModernIcon },
  { name: 'Tablets', description: 'Ipads, Galaxy Tabs, Asus & more', href: 'technology/Tablets', icon: ShoppingCartIcon },
  { name: 'Smart Devices', description: 'Alexa, Home Pod, Vivint, Ecobee & more', href: 'technology/SmartDevices', icon: SparklesIcon },
  { name: 'Laptop & Tablet Accessories', description: 'Laptop Covers, Tablet Cases, Covers, Stickers, Stylus, Apple Pencil & more', href: 'technology/LaptopAndTabletAccessories', icon: ComputerDesktopIcon },
  { name: 'Phone Accessories', description: 'Phone Cases, Wireless Chargers, Adapters, Holders & more', href: 'technology/PhoneAccessories', icon: HeartIcon },
  { name: 'Laptops', description: 'MacBook, Alienware, Samsung, Chromebooks & more', href: 'technology/Laptops', icon: TruckIcon },
  { name: 'Television', description: 'Samsung, LG, Sony, Hisense, Fire TV & more', href: 'technology/Televisions', icon: TruckIcon },
  { name: 'Monitors', description: 'Curved screens monitors, Portable Monitors, Touch Screens & more', href: 'technology/Monitors', icon: TruckIcon },
  { name: 'Gaming', description: 'Playstation 5, XBox, Nintendo & more', href: 'technology/Gaming', icon: TruckIcon },
  { name: 'Softwares', description: 'VPN Services, Antiviruses, Hosting Platforms, MS Office & more', href: 'technology/Softwares', icon: TruckIcon },
]
const healthandfitness = [
  { name: 'Scales & Measure', description: 'Smart Scales, BMR Scales, Food Scales, Tape Measures & more', href: 'HealthAndFitness/ScalesAndMeasure', icon: HomeModernIcon },
  { name: 'Nutrition, Supplements & Shakers', description: 'Protien Powders, Multi Vitamins, Creatine, Pre Workouts, Shaker bottles & more', href: 'HealthAndFitness/Nutrition', icon: ShoppingCartIcon },
  { name: 'Workout Equiments', description: 'Treadmills, Dumbbells, Barbell Pads, Resistance Bands & more', href: 'HealthAndFitness/WorkoutEquiments', icon: SparklesIcon },
  { name: 'Fitness Gadgets', description: 'Fitness Bands, Massage Guns, Fitness Tracker & more', href: 'HealthAndFitness/FitnessGadgets', icon: ComputerDesktopIcon },
  { name: 'Books, Fitness Courses & Live Coaches', description: 'Amazing fitness books, Lessons, Fitness Courses & many more', href: 'HealthAndFitness/Books', icon: TruckIcon },
]
const carAccessories = [
  { name: 'Cleaning', description: 'Mircrofiber Rugs, Car Vaccums, Vent Cleaning Slimes, Car Polish & more', href: 'CarAccessories/Cleaning', icon: HomeModernIcon },
  { name: 'Fragrance', description: 'Little trees, Febreze care, Yankee Candels & more', href: 'CarAccessories/Fragrance', icon: ShoppingCartIcon },
  { name: 'Dash Cams', description: 'Live dash cams with night visions, wifi & more', href: 'CarAccessories/DashCams', icon: SparklesIcon },
  { name: 'Phone Holders', description: 'Magnetic phone holders, Window attachments, holders with chargers & more ', href: 'CarAccessories/PhoneHolders', icon: ComputerDesktopIcon },
  { name: 'Car Needs', description: 'More car needs as Storage bins, Smart Chargings & many more', href: 'CarAccessories/CarNeeds', icon: TruckIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const NavigationLink = ({ name, activeIndex, onHover, onClick }) => {
  const navigate = useNavigate();
  const handleWinkBlogs = () => {
    console.log("Navigateing to: blogs")
    navigate('/blogs')
  }
  return (
    <a href={`/blogs`}>
      <button
        onMouseEnter={() => onHover(name)}
        onMouseLeave={() => onHover(null)}
        onClick={handleWinkBlogs}
        className="relative text-md font-semibold leading-6 text-gray-900 group"
      >
        {name}
        <span
          className={`absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transition-transform duration-200 ${activeIndex === name ? 'scale-x-100' : 'scale-x-0'}`}
          aria-hidden="true"
        />
      </button>
    </a>
  );
};

export default function NavbarUser() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1124);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobileView(window.innerWidth < 1124);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePopoverToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/login')
  }

  const handleWinkBlogs = () => {
    navigate('/blogs')
    setMobileMenuOpen(false);
  }

  useEffect(() => {
    const user = sessionStorage.getItem('User'); // Assuming 'user' is the key where user info is stored
    setIsUserLoggedIn(!!user); // If user info exists, set the login status to true
  }, []);

  const handleSignOut = () => {
    // Clear the user session data
    sessionStorage.removeItem('User');
    // Update the login status
    setIsUserLoggedIn(false);
    // Navigate to the homepage or login page as needed
    window.location.reload();
    navigate('/');
  };

  const handleWishlist = () => {
    if (!isUserLoggedIn) {
      navigate('/login')
      setMobileMenuOpen(false);
    }
    else {
      navigate('/wishlist')
      setMobileMenuOpen(false);
    }
  }

  const handleNavigate = (path) => {
    navigate(`/${path}`);
    window.location.reload()
    setActiveIndex(null); 
  };

  const handleMobileNavigate = (path) => {
    navigate(`/${path}`);
    window.location.reload()
    setMobileMenuOpen(false);
    setActiveIndex(null);
  };

  return (
    <div>

      {
        !isMobileView && (<div>
          <header className="bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-4" aria-label="Global">
              <div className="flex lg:flex-1">
                <a href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img className="h-28 w-auto" src={Logo} alt="" />
                </a>
              </div>
              <div className="flex lg:hidden">
                <button
                  type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <Popover.Group className="hidden lg:flex lg:gap-x-12">
                <NavigationLink name="Wink Blogs" activeIndex={activeIndex} onHover={handlePopoverToggle} onClick={() => handleWinkBlogs} />
                <Popover className="relative">
                  <Popover.Button
                    onMouseEnter={() => handlePopoverToggle('men')} // 'men' is a unique identifier for the Men button
                    onMouseLeave={() => handlePopoverToggle(null)}
                    className="flex items-center gap-x-1 text-md font-semibold leading-6 text-gray-900 relative group"
                  >
                    Men
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transition-transform duration-200 ${activeIndex === 'men' ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      aria-hidden="true"
                    />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute left-1/2 z-10 mt-2 ml-36 flex w-fit max-w-max -translate-x-1/2 px-4">
                      <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 lg:max-w-3xl">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-1 p-4 lg:grid-cols-2">
                          {men.map((item, index) => (
                            <div key={index} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                              {/* <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                {React.createElement(item.icon, { className: "h-6 w-6 text-gray-600 group-hover:text-indigo-600", "aria-hidden": "true" })}
                              </div> */}
                              <div>
                                <button
                                  className="font-semibold text-gray-900"
                                  onClick={() => handleNavigate(item.href)}
                                >
                                  {item.name}
                                  <span className="absolute inset-0" />
                                </button>
                                <p className="mt-1 text-gray-600">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* <div className="bg-gray-50 px-8 py-6">
                        <div className="flex items-center gap-x-3">
                          <h3 className="text-sm font-semibold leading-6 text-gray-900">Enterprise</h3>
                          <p className="rounded-full bg-indigo-600/10 px-2.5 py-1.5 text-xs font-semibold text-indigo-600">New</p>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-gray-600">
                          Empower your entire team with even more advanced tools.
                        </p>
                      </div> */}
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>
                <Popover className="relative">
                  <Popover.Button
                    onMouseEnter={() => handlePopoverToggle('women')} // 'men' is a unique identifier for the Men button
                    onMouseLeave={() => handlePopoverToggle(null)}
                    className="flex items-center gap-x-1 text-md font-semibold leading-6 text-gray-900 relative group"
                  >
                    Women
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transition-transform duration-200 ${activeIndex === 'women' ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute left-1/2 z-10 mt-2 ml-36 flex w-fit max-w-max -translate-x-1/2 px-4">
                      <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 lg:max-w-3xl">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-1 p-4 lg:grid-cols-2">
                          {women.map((item, index) => (
                            <div key={index} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                              {/* <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                              </div> */}
                              <div>
                                <button
                                  className="font-semibold text-gray-900"
                                  onClick={() => handleNavigate(item.href)}
                                >
                                  {item.name}
                                  <span className="absolute inset-0" />
                                </button>
                                <p className="mt-1 text-gray-600">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* <div className="bg-gray-50 px-8 py-6">
                        <div className="flex items-center gap-x-3">
                          <h3 className="text-sm font-semibold leading-6 text-gray-900">Enterprise</h3>
                          <p className="rounded-full bg-indigo-600/10 px-2.5 py-1.5 text-xs font-semibold text-indigo-600">New</p>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-gray-600">
                          Empower your entire team with even more advanced tools.
                        </p>
                      </div> */}
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>
                <Popover className="relative">
                  <Popover.Button
                    onMouseEnter={() => handlePopoverToggle('homeanddecor')} // 'men' is a unique identifier for the Men button
                    onMouseLeave={() => handlePopoverToggle(null)}
                    className="flex items-center gap-x-1 text-md font-semibold leading-6 text-gray-900 relative group"
                  >
                    Home & Decor
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transition-transform duration-200 ${activeIndex === 'homeanddecor' ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute left-1/2 z-10 mt-2 ml-36 flex w-fit max-w-max -translate-x-1/2 px-4">
                      <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 lg:max-w-3xl">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-1 p-4 lg:grid-cols-2">
                          {homeanddecor.map((item, index) => (
                            <div key={index} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                              {/* <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                              </div> */}
                              <div>
                                <button
                                  className="font-semibold text-gray-900"
                                  onClick={() => handleNavigate(item.href)}
                                >
                                  {item.name}
                                  <span className="absolute inset-0" />
                                </button>
                                <p className="mt-1 text-gray-600">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* <div className="bg-gray-50 px-8 py-6">
                        <div className="flex items-center gap-x-3">
                          <h3 className="text-sm font-semibold leading-6 text-gray-900">Enterprise</h3>
                          <p className="rounded-full bg-indigo-600/10 px-2.5 py-1.5 text-xs font-semibold text-indigo-600">New</p>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-gray-600">
                          Empower your entire team with even more advanced tools.
                        </p>
                      </div> */}
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>
                <Popover className="relative">
                  <Popover.Button
                    onMouseEnter={() => handlePopoverToggle('tech')} // 'men' is a unique identifier for the Men button
                    onMouseLeave={() => handlePopoverToggle(null)}
                    className="flex items-center gap-x-1 text-md font-semibold leading-6 text-gray-900 relative group"
                  >
                    Technology
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transition-transform duration-200 ${activeIndex === 'tech' ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute left-1/2 z-10 mt-2 ml-36 flex w-fit max-w-max -translate-x-1/2 px-4">
                      <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 lg:max-w-3xl">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-1 p-4 lg:grid-cols-2">
                          {tech.map((item, index) => (
                            <div key={index} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                              {/* <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                              </div> */}
                              <div>
                                <button
                                  className="font-semibold text-gray-900"
                                  onClick={() => handleNavigate(item.href)}
                                >
                                  {item.name}
                                  <span className="absolute inset-0" />
                                </button>
                                <p className="mt-1 text-gray-600">{item.description}</p>
                              </div>
                            </div>

                          ))}
                        </div>
                        {/* <div className="bg-gray-50 px-8 py-6">
                        <div className="flex items-center gap-x-3">
                          <h3 className="text-sm font-semibold leading-6 text-gray-900">Enterprise</h3>
                          <p className="rounded-full bg-indigo-600/10 px-2.5 py-1.5 text-xs font-semibold text-indigo-600">New</p>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-gray-600">
                          Empower your entire team with even more advanced tools.
                        </p>
                      </div> */}
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>
                <Popover className="relative">
                  <Popover.Button
                    onMouseEnter={() => handlePopoverToggle('healthandfitness')} // 'men' is a unique identifier for the Men button
                    onMouseLeave={() => handlePopoverToggle(null)}
                    className="flex items-center gap-x-1 text-md font-semibold leading-6 text-gray-900 relative group"
                  >
                    Health & Fitness
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transition-transform duration-200 ${activeIndex === 'healthandfitness' ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute left-1/6 z-10 mt-2 ml-36 flex w-fit max-w-max -translate-x-1/2 px-4">
                      <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 lg:max-w-3xl">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-1 p-4 lg:grid-cols-2">
                          {healthandfitness.map((item, index) => (
                            <div key={index} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                              {/* <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                              </div> */}
                              <div>
                                <button
                                  className="font-semibold text-gray-900"
                                  onClick={() => handleNavigate(item.href)}
                                >
                                  {item.name}
                                  <span className="absolute inset-0" />
                                </button>
                                <p className="mt-1 text-gray-600">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* <div className="bg-gray-50 px-8 py-6">
                        <div className="flex items-center gap-x-3">
                          <h3 className="text-sm font-semibold leading-6 text-gray-900">Enterprise</h3>
                          <p className="rounded-full bg-indigo-600/10 px-2.5 py-1.5 text-xs font-semibold text-indigo-600">New</p>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-gray-600">
                          Empower your entire team with even more advanced tools.
                        </p>
                      </div> */}
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>
                <Popover className="relative">
                  <Popover.Button
                    onMouseEnter={() => handlePopoverToggle('carAccessories')} // 'men' is a unique identifier for the Men button
                    onMouseLeave={() => handlePopoverToggle(null)}
                    className="flex items-center gap-x-1 text-md font-semibold leading-6 text-gray-900 relative group"
                  >
                    Automotive Accessories
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transition-transform duration-200 ${activeIndex === 'carAccessories' ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute left-1/8 z-10 mt-2 flex w-fit max-w-max -translate-x-1/2 px-4">
                      <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 lg:max-w-3xl">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-1 p-4 lg:grid-cols-2">
                          {carAccessories.map((item, index) => (
                            <div key={index} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                              {/* <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                              </div> */}
                              <div>
                                <button
                                  className="font-semibold text-gray-900"
                                  onClick={() => handleNavigate(item.href)}
                                >
                                  {item.name}
                                  <span className="absolute inset-0" />
                                </button>
                                <p className="mt-1 text-gray-600">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* <div className="bg-gray-50 px-8 py-6">
                        <div className="flex items-center gap-x-3">
                          <h3 className="text-sm font-semibold leading-6 text-gray-900">Enterprise</h3>
                          <p className="rounded-full bg-indigo-600/10 px-2.5 py-1.5 text-xs font-semibold text-indigo-600">New</p>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-gray-600">
                          Empower your entire team with even more advanced tools.
                        </p>
                      </div> */}
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>
                {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Below 10
          </a> */}
              </Popover.Group>
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                {
                  isUserLoggedIn ? (
                    <button className="text-sm font-semibold leading-6 text-gray-900" onClick={handleSignOut}>
                      Sign out <span aria-hidden="true">&rarr;</span>
                    </button>
                  ) : (
                    <button className="text-sm font-semibold leading-6 text-gray-900" onClick={handleLogin}>
                      Log in <span aria-hidden="true">&rarr;</span>
                    </button>
                  )
                }
              </div>
            </nav>
          </header>
        </div>)}


      {isMobileView && (
        <div>
          <header className="bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8" aria-label="Global">
              <div className="flex lg:flex-1">
                <a href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img className="h-20 w-auto" src={Logo} alt="" />
                </a>
              </div>
              <div className="flex">
                <button
                  type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <Dialog as="div" className="" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                  <div className="flex items-center justify-between">
                    <a href="/" className="-m-1.5 p-1.5">
                      <span className="sr-only">Your Company</span>
                      <img className="h-28 w-auto" src={Logo} alt="" />
                    </a>
                    <button
                      type="button"
                      className="-m-2.5 rounded-md p-2.5 text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10">
                      <div className="space-y-2 py-6">
                        <div className="">
                          <a
                            href="#"
                            className="-mx-3 block rounded-lg px-2 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            onClick={handleWinkBlogs}
                            style={{ textDecoration: 'none' }}
                          >
                            Wink Blogs
                          </a>
                        </div>
                        <Disclosure as="div" className="-mx-3">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                Men
                                <ChevronDownIcon
                                  className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                  aria-hidden="true"
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="mt-2 space-y-2">
                                {[...men].map((item) => (
                                  <button
                                    key={item.name}
                                    onClick={() => handleMobileNavigate(item.href)}
                                    className="block w-full text-left rounded-lg py-2 pl-6 pr-3 text-md font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                  >
                                    {item.name}
                                  </button>
                                ))}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                        <Disclosure as="div" className="-mx-3">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                Women
                                <ChevronDownIcon
                                  className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                  aria-hidden="true"
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="mt-2 space-y-2">
                                {[...women].map((item) => (
                                  <button
                                    key={item.name}
                                    onClick={() => handleMobileNavigate(item.href)}
                                    className="block w-full text-left rounded-lg py-2 pl-6 pr-3 text-md font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                  >
                                    {item.name}
                                  </button>
                                ))}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                        <Disclosure as="div" className="-mx-3">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                Home & Decor
                                <ChevronDownIcon
                                  className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                  aria-hidden="true"
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="mt-2 space-y-2">
                                {[...homeanddecor].map((item) => (
                                  <button
                                    key={item.name}
                                    onClick={() => handleMobileNavigate(item.href)}
                                    className="block w-full text-left rounded-lg py-2 pl-6 pr-3 text-md font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                  >
                                    {item.name}
                                  </button>
                                ))}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                        <Disclosure as="div" className="-mx-3">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                Technology
                                <ChevronDownIcon
                                  className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                  aria-hidden="true"
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="mt-2 space-y-2">
                                {[...tech].map((item) => (
                                  <button
                                    key={item.name}
                                    onClick={() => handleMobileNavigate(item.href)}
                                    className="block w-full text-left rounded-lg py-2 pl-6 pr-3 text-md font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                  >
                                    {item.name}
                                  </button>
                                ))}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                        <Disclosure as="div" className="-mx-3">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                Health & Fitness
                                <ChevronDownIcon
                                  className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                  aria-hidden="true"
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="mt-2 space-y-2">
                                {[...healthandfitness].map((item) => (
                                  <button
                                    key={item.name}
                                    onClick={() => handleMobileNavigate(item.href)}
                                    className="block w-full text-left rounded-lg py-2 pl-6 pr-3 text-md font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                  >
                                    {item.name}
                                  </button>
                                ))}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                        <Disclosure as="div" className="-mx-3">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                Automotive Accessories
                                <ChevronDownIcon
                                  className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                  aria-hidden="true"
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="mt-2 space-y-2">
                                {[...carAccessories].map((item) => (
                                  <button
                                    key={item.name}
                                    onClick={() => handleMobileNavigate(item.href)}
                                    className="block w-full text-left rounded-lg py-2 pl-6 pr-3 text-md font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                  >
                                    {item.name}
                                  </button>
                                ))}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                        <div className="">
                          <a
                            href="#"
                            className="-mx-3 block rounded-lg px-2.5 py-2.5 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            onClick={handleWishlist}
                            style={{ textDecoration: 'none' }}
                          >
                            Wishlist
                          </a>
                        </div>
                      </div>

                      {
                        isUserLoggedIn ? (
                          <button className="text-md font-semibold leading-6 text-gray-900" onClick={handleSignOut}>
                            Sign out <span aria-hidden="true">&rarr;</span>
                          </button>
                        ) : (
                          <button className="text-md font-semibold leading-6 text-gray-900" onClick={handleLogin}>
                            Log in <span aria-hidden="true">&rarr;</span>
                          </button>
                        )
                      }
                    </div>
                  </div>
                </Dialog.Panel>
              </Dialog>
            </nav>
          </header>
        </div>)}
    </div>
  )
}

