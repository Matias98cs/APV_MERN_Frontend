import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'


const Header = () => {

    const {cerrarSesion} = useAuth()

  return (
    <header className='py-10 bg-indigo-600'>
        <div className='container mx-auto flex flex-col lg:flex-row justify-between items-center'>
            <h1 className='text-center font-bold text-2xl text-indigo-200'>Administrador de Pacientes de {""} <span className='text-white  font-black'>Veterinaria</span> </h1>
            <nav className='flex gap-4 items-center flex-col lg:flex-row mt-5 lg:mt-0'>
                <Link to="/admin" className='text-white text-sm font-bold uppercase'>Pacientes</Link>
                <Link to="/admin/perfil" className='text-white text-sm font-bold uppercase'>Perfil</Link>
                <button
                    type='button'
                    className='text-white text-sm font-bold uppercase'
                    onClick={cerrarSesion}
                >Cerrar Sesion</button>
            </nav>
        </div>
    </header>
  )
}

export default Header
