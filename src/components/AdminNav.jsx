import React from 'react'
import { Link } from 'react-router-dom'
const AdminNav = () => {
  return (
    <nav className='flex gap-3'>
      <Link
        className='font-bold uppercase text-gray-500' 
        to="/admin/perfil">
        Perfil
      </Link>
      <Link
        className='font-bold uppercase text-gray-500' 
        to="/admin/cambiar-password">
        Cambiar Password
      </Link>
    </nav>
  )
}

export default AdminNav
