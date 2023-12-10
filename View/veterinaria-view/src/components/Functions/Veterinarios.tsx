import React, { useState, useEffect } from "react";
import appveterinariaserver from "@/api/appveterinariaserver";
import Modal from "react-modal";
type Props = {};

class UsuarioRegistradoEntity {
  id!: number;
  cod_tipo_usuario!: number;
  nombres!: string;
  apellidos!: string;
  autenticador!: string;
  desc_tipo_usuario!: string;
  id_rol_especialidad!: number;
  rol_especialidad!: string;
  id_credenciales!: number;
  email!: string;
  password!: string;
}

class CitaEntity {
  codigo_cita!: number;
  cod_estado_cita!: number;
  descripcion_estado_cita!: string;
  id_usuario!: number;
  id_cliente!: number;
  id_mascota!: number;
  nombre_mascota!: string;
  cliente_apellidos!: string;
  cliente_nombres!: string;
  fecha_cita!: Date;
  cod_horario_cita!: number;
  descripcion_horario_cita!: string;
}

const Veterinarios = (props: Props) => {
  const [usuarios, setUsuarios] = useState<UsuarioRegistradoEntity[]>([]);
  const [dniIdentificador, setDniIdentificador] = useState("");
  const [tipoUsuarioFiltro, setTipoUsuarioFiltro] = useState(2); // TIPO VETERINARIO
  // TITULO DE LA MODAL VETERINARIO
  const [titulo, setTitulo] = useState("");
  // DEFINIR LAS CITAS ENCONTRADAS POR NUESTRA APLICACION
  const [citasEncontradas, setCitasEncontradas] = useState<CitaEntity[]>([]);

  // MODAL PARA VISUALIIZAR CITAS DEL VETERINARIO
  const [veterinarioModalIsOpen, setVeterinarioModalIsOpen] = useState(false);
  const abrirVeterinarioModal = () => {
    setVeterinarioModalIsOpen(true);
  };
  const cerrarVeterinarioModal = () => {
    setVeterinarioModalIsOpen(false);
  };
  const verCitasVeterinario = (veterinario : UsuarioRegistradoEntity) => {
    Modal.setAppElement("#root");
    abrirVeterinarioModal();
    setTitulo(`Citas del veterinario ${veterinario.apellidos} ${veterinario.nombres}`);
    setCitasEncontradas([]);
    // LLAMADA A NUESTRA APLICACION SERVER
    const path = `buscar_citas?dni=&cod_usuario=${veterinario.id}&cod_tipo_estado_cita=1&cod_tipo_horario_cita=`;
      //console.log(path);
      appveterinariaserver.get(path).then(function (data) {
        //console.log("Estas son las citas agendadas: ", data);
        setCitasEncontradas(data);
      });
  };
  useEffect(() => {
    obtener_veterinarios();
  }, []);
  const obtener_veterinarios = async () => {
    //console.log("Identificador:", autenticador);
    try {
      setTipoUsuarioFiltro(2); // BUSCAMOS SOLO VETERINARIOS
      const path = `obtener_usuarios?dni=&cod_tipo_usuario=${tipoUsuarioFiltro}`;
      console.log(path);
      const data = await appveterinariaserver.get(path);
      console.log(data);
      setUsuarios(data);
    } catch (error) {
      console.error("Error al realizar la solicitud GET:", error);
    }
  };
  return (
    <div id="root" className="bg-gray-100 md:h-[calc(100vh-80px)] p-8">
      <div className="text-center text-black flex flex-col space-y-5">
        <h1 className="text-3xl font-mono">
          <b>NUESTROS VETERINARIOS</b>
        </h1>
      </div>
      {/* MAPEO DE LOS VETERINARIOS */}
      <div className="mt-8 md:mx-24 relative overflow-x-auto shadow-md sm:rounded-lg">
        {usuarios.length > 0 ? (
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-300 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300 h-12">
              <tr className="text-[20px]">
                <th className="px-5 py-3">DNI</th>
                <th className="px-5 py-3">NOMBRE</th>
                <th className="px-5 py-3">TIPO USUARIO</th>
                <th className="px-5 py-3">CORREO</th>
                <th className="px-7 py-3">ESPECIALIDAD</th>
                <th className="px-7 py-3 text-center"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {usuarios.map((usuario, index) => (
                <tr key={`${usuario.id}_${index}`}>
                  <td className="px-4 py-2">{usuario.autenticador}</td>
                  <td className="px-4 py-2">
                    {usuario.apellidos + " " + usuario.nombres}
                  </td>
                  <td className="px-4 py-2">{usuario.desc_tipo_usuario}</td>
                  <td className="px-4 py-2">{usuario.email}</td>
                  <td className="px-4 py-2">{usuario.rol_especialidad}</td>
                  <td className="px-4 py-2 flex justify-center space-x-3">
                    <button
                      onClick={() =>
                        verCitasVeterinario(usuario)
                      }
                      className="text-white font-bold py-1 px-2 rounded bg-blue-500 hover:bg-blue-800 ease-in-out duration-300"
                    >
                      Revisas Citas Agendadas
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-red-500 my-8">
            Agrega un DNI para buscar usuarios.
          </p>
        )}
        <div id="modales">
          <Modal
            isOpen={veterinarioModalIsOpen}
            onRequestClose={cerrarVeterinarioModal}
            contentLabel="Agregar Cliente"
            className="flex items-center justify-center z-50"
          >
            <div className="bg-gray-200 text-black p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md space-y-5">
              <h2 className="text-2xl font-mono text-center w-[800px]">
                {titulo && titulo.length > 0 && <>{titulo}</>}
              </h2>
              <div>
                {citasEncontradas.length > 0 ? (
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="bg-gray-700 text-white">
                      <tr className="text-[20px]">
                        <th className="px-5 py-3">FECHA</th>
                        <th className="px-5 py-3">HORARIO</th>
                        <th className="px-5 py-3">ESTADO CITA</th>
                        <th className="px-7 py-3">CLIENTE</th>
                        <th className="px-7 py-3">MASCOTA</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {citasEncontradas.map((cita, index) => (
                        <tr key={`${cita.codigo_cita}_${index}`}>
                          <td className="px-4 py-2">{cita.fecha_cita ? cita.fecha_cita.toString().substring(0, 10) : ''}</td>
                          <td className="px-4 py-2">{cita.descripcion_horario_cita}</td>
                          <td className="px-4 py-2 text-center">
                            {cita.descripcion_estado_cita}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {`${cita.cliente_apellidos} ${cita.cliente_nombres}`}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {cita.nombre_mascota}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-center text-red-500 my-8">
                    Veterinario sin citas agendadas
                  </p>
                )}
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Veterinarios;
