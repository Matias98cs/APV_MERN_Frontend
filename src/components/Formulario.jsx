import React from "react";
import { useState } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";
import { useEffect } from "react";

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropieratio] = useState("");
  const [email, setEmail] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [fecha, setFecha] = useState("");
  const [id, setId] = useState(null)

  const [alerta, setAlerta] = useState({});

  const { guardarPaciente, paciente } = usePacientes();

  useEffect(() => {
    if(paciente?.nombre){
      setNombre(paciente.nombre)
      setPropieratio(paciente.propietario)
      setEmail(paciente.email)
      setSintomas(paciente.sintomas)
      setFecha(paciente.fecha)
      setId(paciente._id)
    }
  }, [paciente])

  const handleSubmit = (e) => {
    e.preventDefault();

    //validar formulario
    if ([nombre, propietario, email, sintomas, fecha].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    guardarPaciente({ nombre, propietario, email, sintomas, fecha, id });
    setAlerta({
      msg:'Guardado correctamente'
    });
    setNombre('')
    setPropieratio('')
    setEmail('')
    setSintomas('')
    setFecha('')
    setId('')
  };

  const { msg } = alerta;
  return (
    <>
      <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>
      <p className="text-2xl mt-5 mb-10 text-center">
        Añade tus pacientes y {""}
        <span className="text-indigo-600 font-bold">Adminístralos</span>
      </p>
      <form
        className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label className="text-gray-700 uppercase font-bold" htmlFor="nombre">
            Nombre Mascota
          </label>
          <input
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>
        <div className="mb-5">
          <label
            className="text-gray-700 uppercase font-bold"
            htmlFor="propietario"
          >
            Nombre Propietario
          </label>
          <input
            id="propietario"
            value={propietario}
            onChange={(e) => setPropieratio(e.target.value)}
            type="text"
            placeholder="Nombre del propitario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>
        <div className="mb-5">
          <label className="text-gray-700 uppercase font-bold" htmlFor="email">
            Email Propietario
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email del propitario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>
        <div className="mb-5">
          <label className="text-gray-700 uppercase font-bold" htmlFor="fecha">
            Fecha Alta
          </label>
          <input
            id="fecha"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>
        <div className="mb-5">
          <label
            className="text-gray-700 uppercase font-bold"
            htmlFor="sintomas"
          >
            Sintomas
          </label>
          <textarea
            id="sintomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
            placeholder="Describe los sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>
        <input
          type="submit"
          value={id ? 'Guardar cambios' : "Agregar Paciente"}
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-colors"
        />
      </form>
      {msg && <Alerta alerta={alerta} />}
    </>
  );
};

export default Formulario;
