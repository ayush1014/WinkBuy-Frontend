import Catagories from './Catagories'
import Advertisements from './Advertisements'
import Footer from './Footer'
import NavbarUser from './NavbarUser'
import React from 'react'


export default function Home() {

  return (
    <div>
      <div>
        <NavbarUser/>
      </div>
      {/* <div><Advertisements/></div> */}
      <div>
        <Catagories/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}
