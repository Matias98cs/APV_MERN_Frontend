import React from 'react'
import usePacientes from '../hooks/usePacientes'
import Paciente from './Paciente'

const ListadoPacientes = () => {

  const {pacientes} = usePacientes()
  return (
    <>
      {pacientes.length > 0  ? (
        <>
          <h2 className='font-black text-3xl text-center'>Listado Pacientes</h2>
          <p className='text-2xl mt-5 mb-10 text-center'>
            Administra tus {''}
            <span className='text-indigo-600 font-bold'>Pacientes y Citas</span>
          </p>
          {pacientes.map( paciente =>(
            <Paciente paciente={paciente} key={paciente._id}/>
          ))}
        </>
      ) : (
        <>
          <h2 className='font-black text-3xl text-center'>No hay Pacientes</h2>
          <p className='text-2xl mt-5 mb-10 text-center'>
            Comienza agregando pacientes {''}
            <span className='text-indigo-600 font-bold'>y apareceran en este lugar</span>
          </p>
        </>
      )}
    </>
  )
}

export default ListadoPacientes