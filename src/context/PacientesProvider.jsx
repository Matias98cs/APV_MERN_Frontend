import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const PacientesContext = createContext();

export const PacientesProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios.get("/pacientes", config);
        setPacientes(data.pacientes);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPacientes();
  }, []);

  const guardarPaciente = async (paciente) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    if (paciente.id) {
      try {
        const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
        const pacientesActualizado = pacientes.map( pacienteState => pacienteState._id === data.pacienteActualizado._id ? data.pacienteActualizado : pacienteState)

        setPacientes(pacientesActualizado)
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await clienteAxios.post(
          "/pacientes",
          paciente,
          config
        );

        //crea un nuevo objeto (pacientes almacenado) pero quita las demas propiedades que se "destructuran"
        const { createdAt, updatedAt, __v, ...pacienteAlmacenado } =
          data.pacienteGuardado;
        setPacientes([pacienteAlmacenado, ...pacientes]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const setEdicion = (paciente) => {
    setPaciente(paciente);
  };

  const eliminarPaciente = async(id) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const confirmar = confirm('¿Confrimas qué desas eliminar?')
    if(confirmar){
      try {
        const {data} = await clienteAxios.delete(`/pacientes/${id}`, config)
        const pacientesActualizado = pacientes.filter( pacientesState => pacientesState._id !== id )
        setPacientes(pacientesActualizado)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <PacientesContext.Provider
      value={{
        pacientes,
        guardarPaciente,
        setEdicion,
        paciente,
        eliminarPaciente
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export default PacientesContext;
