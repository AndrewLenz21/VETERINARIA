import React, { useState, useEffect } from "react";
import appveterinariaserver from "@/api/appveterinariaserver";
import Modal from "react-modal";

type Props = {
  autenticador: string;
};

class ClientesEntity {
  idCliente!: number;
  identificador!: string;
  nombres!: string;
  apellidos!: string;
  celular!: string;
  email!: string;
}

class InsertarClienteEntity {
  identificador!: string;
  nombres!: string;
  apellidos!: string;
  celular!: string;
  email!: string;
  utente_inserimento!: string;
}
class ModificarClienteEntity {
  idCliente!: number;
  identificador!: string;
  nombres!: string;
  apellidos!: string;
  celular!: string;
  email!: string;
}

const Pacientes: React.FC<Props> = ({ autenticador }) => {
  const [clientes, setClientes] = useState<ClientesEntity[]>([]);
  const [dni_identificador, setDniIdentificador] = useState("");
  // VARAIBLES DE LA MODAL CLIENTE
  const [id, setId] = useState(0);
  const [dni, setDni] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");

  // TITULO DE LA MODAL CLIENTE
  const [titulo, setTitulo] = useState("");

  // Estado para controlar los tres modales
  const [clienteModalIsOpen, setClienteModalIsOpen] = useState(false);
  const [verMascotasModalIsOpen, setVerMascotasModalIsOpen] = useState(false);
  /* ESTADO DE MODALES */
  // Funciones para abrir y cerrar cada modal
  const openClienteModal = (funcion: string) => {
    console.log(`La funcion de nuestra modal es : ${funcion}`);
    setClienteModalIsOpen(true);
  };
  const closeClienteModal = () => {
    setClienteModalIsOpen(false);
  };

  const guardarInfoClienteModal = () => {
    setClienteModalIsOpen(false);
    // usemos titulo para agregar o modificar
    if (titulo == "AGREGAR CLIENTE") {
      console.log("Estamos aca")
      insertar_cliente();
    }
    if (titulo == "EDITAR CLIENTE") {
      modificar_cliente();
    }
    // VACIAR LOS RESULTADOS
    setId(0);
    setDni("");
    setNombres("");
    setApellidos("");
    setCelular("");
    setEmail("");
  };

  const openVerMascotasModal = () => {
    setVerMascotasModalIsOpen(true);
  };
  const closeVerMascotasModal = () => {
    setVerMascotasModalIsOpen(false);
  };

  useEffect(() => {
    obtener_clientes();
    console.log(autenticador);
  }, [dni_identificador]);

  const obtener_clientes = async () => {
    //console.log("Identificador:", autenticador);
    try {
      if (dni_identificador || dni_identificador.length >= 3) {
        const path = `obtener_clientes?dni=${dni_identificador}`;
        const data = await appveterinariaserver.get(path);
        console.log(data);
        setClientes(data);
        Modal.setAppElement("#root");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud GET:", error);
    }
  };

  const insertar_cliente = async () => {
    try {
      console.log(dni, nombres, apellidos, celular, email, dni.length)
      if (
        dni && nombres && apellidos && celular && email &&
        dni.length == 8
      ){
        //DEFINIMOS NEUSTRO OBJETO
        const cliente = new InsertarClienteEntity();
        cliente.identificador = dni;
        cliente.nombres = nombres;
        cliente.apellidos = apellidos;
        cliente.celular = celular;
        cliente.email = email;
        cliente.utente_inserimento = autenticador;

        console.log(cliente);
        appveterinariaserver
          .post("insertar_cliente", cliente)
          .then(function () {
            // LUEGO DE INSERTAR EL CLIENTE, HACER LA BUSQUEDA
            obtener_clientes();
          });
      }
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
    }
  };
  const modificar_cliente = async () => {
    try {
      // Definimos nuestro objeto ModificarClienteEntity
      const cliente = new ModificarClienteEntity();
      cliente.idCliente = id;
      cliente.identificador = dni;
      cliente.nombres = nombres;
      cliente.apellidos = apellidos;
      cliente.celular = celular;
      cliente.email = email;
      //LLAMADA POST
      appveterinariaserver.post("modificar_cliente", cliente).then(function(){
        obtener_clientes();
      })
    } catch (error) {
      console.error("Error al realizar la solicitud GET:", error);
    }
  };
  const buscar_mascotas = (dni: string, id: number) => {
    console.log("DNI (identificador):", dni);
    console.log("ID:", id);
  };

  const editar_cliente = (cliente: ClientesEntity) => {
    setTitulo("EDITAR CLIENTE");
    // DEFINIR LAS VARIABLES CON NUESTRA INFORMACION
    setId(cliente.idCliente || 0);
    setDni(cliente.identificador || "");
    setNombres(cliente.nombres || "");
    setApellidos(cliente.apellidos || "");
    setCelular(cliente.celular || "");
    setEmail(cliente.email || "");

    openClienteModal("editar");
    console.log("DNI (identificador):", dni);
    console.log("ID:", cliente.idCliente);
  };

  const eliminar_cliente = (cliente: ClientesEntity) => {
    setTitulo("EDITAR CLIENTE");
    // DEFINIR LAS VARIABLES CON NUESTRA INFORMACION
    const confirmacion = window.confirm(`¿Estás seguro de eliminar el cliente ${cliente.identificador}?\nSe borrarán los registros de la mascota.`);
    
    if (confirmacion) {
        console.log("Cliente eliminado");
        appveterinariaserver.get(`eliminar_cliente?identificativo=${cliente.identificador}`).then(function(){
          obtener_clientes();
        })
    } 
  };

  const agregarCliente = () => {
    setTitulo("AGREGAR CLIENTE");
    // DEFINIR LAS VARIABLES CON NUESTRA INFORMACION
    setId(0);
    setDni("");
    setNombres("");
    setApellidos("");
    setCelular("");
    setEmail("");
    openClienteModal("agregar");
  };

  return (
    <div id="root" className="bg-gray-100 md:h-[calc(100vh-80px)] p-8">
      <div className="text-center text-black flex flex-col space-y-5">
        <h1 className="text-3xl font-mono">
          <b>PACIENTES REGISTRADOS</b>
        </h1>
        <div className="w-full flex space-x-6 items-center md:px-[300px]">
          <input
            className="w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none"
            type="text"
            value={dni_identificador}
            onChange={(e) => setDniIdentificador(e.target.value)}
            placeholder="Ingrese el DNI"
          />
          <button
            onClick={obtener_clientes}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Buscar
          </button>
          <button
            onClick={agregarCliente}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 w-[200px] rounded"
          >
            Agregar Cliente
          </button>
        </div>
      </div>
      {/* MAPEO DE RESULTADOS */}

      <div className="mt-8 md:mx-24 relative overflow-x-auto shadow-md sm:rounded-lg">
        {dni_identificador ? (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-700">
            <thead className="text-xs text-gray-300 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300 h-12">
              <tr className="text-[20px]">
                <th className="px-5 py-3">DNI</th>
                <th className="px-5 py-3">NOMBRE</th>
                <th className="px-5 py-3">CELULAR</th>
                <th className="px-5 py-3">CORREO</th>
                <th className="px-7 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente, index) => (
                <tr key={`${cliente.idCliente}_${index}`}>
                  <td className="px-4 py-2">{cliente.identificador}</td>
                  <td className="px-4 py-2">
                    {cliente.apellidos + " " + cliente.nombres}
                  </td>
                  <td className="px-4 py-2">{cliente.celular}</td>
                  <td className="px-4 py-2">{cliente.email}</td>
                  <td className="px-4 py-2 flex justify-center space-x-3">
                    <button
                      onClick={() =>
                        buscar_mascotas(
                          cliente.identificador,
                          cliente.idCliente
                        )
                      }
                      className="text-white font-bold py-1 px-2 rounded bg-green-600 hover:bg-green-800 ease-in-out duration-300"
                    >
                      Buscar Mascotas
                    </button>
                    <button
                      onClick={() => editar_cliente(cliente)}
                      className="text-white font-bold py-1 px-2 rounded bg-blue-500 hover:bg-blue-800 ease-in-out duration-300"
                    >
                      Editar Cliente
                    </button>
                    <button
                      onClick={() => eliminar_cliente(cliente)}
                      className="text-white font-bold py-1 px-2 rounded bg-red-500 hover:bg-red-800 ease-in-out duration-300"
                    >
                      Eliminar Cliente
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-red-500 my-8">
            Agrega un DNI para buscar clientes.
          </p>
        )}
        <div id="modales">
          {/* Modal para Agregar Cliente */}
          <Modal
            isOpen={clienteModalIsOpen}
            onRequestClose={closeClienteModal}
            contentLabel="Agregar Cliente"
            className="flex items-center justify-center z-50"
          >
            {/* Formulario y botón de cerrar */}
            <div className="bg-gray-200 text-black p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md space-y-5">
              <h2 className="text-2xl font-mono text-center">
                {titulo && titulo.length > 0 && <>{titulo}</>}
              </h2>
              <form>
                <label>DNI:</label>
                <input
                  className="w-full rounded-md border border-[#E9EDF4] py-2 px-4 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none"
                  type="text"
                  name="DNI"
                  value={dni}
                  onChange={(event) => setDni(event.target.value)}
                />
                <label>Nombres:</label>
                <input
                  className="w-full rounded-md border border-[#E9EDF4] py-2 px-4 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none"
                  type="text"
                  name="nombres"
                  value={nombres}
                  onChange={(event) => setNombres(event.target.value)}
                />
                <label>Apellidos:</label>
                <input
                  className="w-full rounded-md border border-[#E9EDF4] py-2 px-4 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none"
                  type="text"
                  name="apellidos"
                  value={apellidos}
                  onChange={(event) => setApellidos(event.target.value)}
                />
                <label>Celular:</label>
                <input
                  className="w-full rounded-md border border-[#E9EDF4] py-2 px-4 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none"
                  type="text"
                  name="celular"
                  value={celular}
                  onChange={(event) => setCelular(event.target.value)}
                />
                <label>Email:</label>
                <input
                  className="w-full rounded-md border border-[#E9EDF4] py-2 px-4 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none"
                  type="text"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </form>

              <div className="flex justify-between">
                <button
                  className="text-white font-bold py-1 px-2 rounded bg-blue-500 hover:bg-blue-800 ease-in-out duration-300"
                  type="submit"
                  onClick={guardarInfoClienteModal}
                >
                  Guardar
                </button>
                <button
                  className="text-white font-bold py-1 px-2 rounded bg-red-500 hover:bg-red-800 ease-in-out duration-300"
                  onClick={closeClienteModal}
                >
                  Cerrar
                </button>
              </div>
            </div>
            {/* ... */}
          </Modal>

          {/* Modal para Ver Mascotas */}
          <Modal
            isOpen={verMascotasModalIsOpen}
            onRequestClose={closeVerMascotasModal}
            contentLabel="Ver Mascotas"
          >
            {/* Contenido del modal de Ver Mascotas */}
            <h2>Ver Mascotas</h2>
            {/* Contenido para mostrar mascotas */}
            {/* ... */}
            <button onClick={closeVerMascotasModal}>Cerrar</button>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Pacientes;
