import React from 'react'
import AdminHome from './NavbarAdmin'
import NavbarAdmin from './NavbarAdmin'
import Categories from './Catagories'
import AdminCategories from './AdminCatagories'

function Admin() {
    return (
        <div>
            {/* admin */}
            <NavbarAdmin />
            <div>
                <AdminCategories/>
            </div>
            
        </div>
    )
}

export default Admin