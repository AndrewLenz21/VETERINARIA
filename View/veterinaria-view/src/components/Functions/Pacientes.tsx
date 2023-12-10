import React, { useState, useEffect } from "react";
import appveterinariaserver from "@/api/appveterinariaserver";
import Modal from "react-modal";
import { table } from "console";

type Props = {
  autenticador: string;
};

// ENTITIES DE LOS CLIENTES
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

// ENTITIES DE LAS MASCOTAS
class MascotasEntity {
  idMascota!: number;
  identificador!: string;
  nombre!: string;
  tipo!: string;
  edad!: number;
  sexo!: string;
}

class InsertarMascotaEntity {
  identificador!: string;
  nombre!: string;
  tipo!: string;
  edad!: number;
  sexo!: string;
  utente_inserimento!: string;
}

const Pacientes: React.FC<Props> = ({ autenticador }) => {
  const [clientes, setClientes] = useState<ClientesEntity[]>([]);
  const [mascotas, setMascotas] = useState<MascotasEntity[]>([]);
  const [dni_identificador, setDniIdentificador] = useState("");
  // VARAIBLES DE LA MODAL CLIENTE
  const [id, setId] = useState(0);
  const [dni, setDni] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  // VARIABLES DE LA MODAL MASCOTAS
  const [nombreMascota, setNombreMascota] = useState("");
  const [tipoMascota, setTipoMascota] = useState("");
  const [edadMascota, setEdadMascota] = useState(0);
  const [sexoMascota, setSexoMascota] = useState("M");
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
    // usemos titulo para agregar o modificar
    if (titulo == "AGREGAR CLIENTE") {
      console.log("Estamos aca");
      insertar_cliente();
    }
    if (titulo == "EDITAR CLIENTE") {
      modificar_cliente();
    }
  };

  const vaciarElementosModalCliente = () => {
    // VACIAR LOS RESULTADOS
    setId(0);
    setDni("");
    setNombres("");
    setApellidos("");
    setCelular("");
    setEmail("");
  }

  useEffect(() => {
    obtener_clientes();
    //console.log(autenticador);
  }, [dni_identificador]);
  // SECCION CLIENTES
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
      if (dni && nombres && apellidos && celular && email && dni.length == 8) {
        //VERIFICAR EXISTENCIA DEL CLIENTE
        const path = `obtener_clientes?dni=${dni}`;
        const data = await appveterinariaserver.get(path);

        if (data.length > 0) {
          // Cliente ya existe, mostrar mensaje de alerta
          alert("Cliente ya existente");
        } else {
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
              closeClienteModal();
              vaciarElementosModalCliente();
            });
        }
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
      appveterinariaserver.post("modificar_cliente", cliente).then(function () {
        obtener_clientes();
        closeClienteModal();
        vaciarElementosModalCliente();
      });
    } catch (error) {
      console.error("Error al realizar la solicitud GET:", error);
    }
  };
  // LLENAR LOS INPUTS AL ABRIR MODAL
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
    //console.log("DNI (identificador):", dni);
    //console.log("ID:", cliente.idCliente);
  };

  const eliminar_cliente = (cliente: ClientesEntity) => {
    // DEFINIR LAS VARIABLES CON NUESTRA INFORMACION
    const confirmacion = window.confirm(
      `¿Estás seguro de eliminar el cliente ${cliente.identificador}?\nSe borrarán los registros de la mascota.`
    );

    if (confirmacion) {
      //console.log("Cliente eliminado");
      appveterinariaserver
        .get(`eliminar_cliente?identificativo=${cliente.identificador}`)
        .then(function () {
          obtener_clientes();
        });
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
  // SECCION MASCOTAS
  const openVerMascotasModal = () => {
    setVerMascotasModalIsOpen(true);
  };
  const closeVerMascotasModal = () => {
    setVerMascotasModalIsOpen(false);
  };
  const obtener_mascotas = async (identificador: string) => {
    //console.log("Identificador:", autenticador);
    try {
      if (identificador || identificador.length == 8) {
        const path = `obtener_mascotas?dni=${identificador}`;
        const data = await appveterinariaserver.get(path);
        console.log("Estas son las mascotas: ", data);
        setMascotas(data);
        Modal.setAppElement("#root");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud GET:", error);
    }
  };
  const buscar_mascotas = (cliente: ClientesEntity) => {
    //console.log("DNI (identificador):", cliente.identificador);
    //console.log("ID:", cliente.idCliente);
    // ABRIR LA MODAL DE LAS MASCOTAS
    setTitulo(`Mascotas de: ${cliente.nombres}`);
    // LLAMAR A LA FUNCION QUE OBTIENE LAS MASCOTAS
    setMascotas([]);
    obtener_mascotas(cliente.identificador);
    // VACIAR LOS INPUTS
    setNombreMascota("");
    setEdadMascota(0);
    setTipoMascota("");
    setSexoMascota("M");
    // OBTENER NUESTRO DNI DEL DUEñO
    setDni(cliente.identificador);
    setNombres(cliente.nombres);
    openVerMascotasModal();
  };

  const insertar_mascota = () => {
    try {
      const mascota = new InsertarMascotaEntity();
      mascota.identificador = dni;
      mascota.nombre = nombreMascota;
      mascota.tipo = tipoMascota;
      mascota.edad = edadMascota;
      mascota.sexo = sexoMascota;
      mascota.utente_inserimento = autenticador;

      console.log(mascota.identificador);
      console.log(mascota.sexo);
      //LLAMADA A NUESTRO SERVIDOR PARA INSERTAR MASCOTA
      appveterinariaserver.post("insertar_mascota", mascota).then(function () {
        obtener_mascotas(dni);
      });
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
    }
  };
  const inhabilitar_mascota = (mascota: MascotasEntity, id_mascota: number) => {
    console.log(mascota);
    console.log(id_mascota);
    try {
      const confirmacion = window.confirm(
        `¿Estás seguro de eliminar la mascota ${mascota.nombre} del cliente ${nombres}?`
      );

      if (confirmacion) {
        appveterinariaserver
          .get(`eliminar_mascota?id_mascota=${id_mascota}`)
          .then(function () {
            obtener_mascotas(dni);
          });
      }
    } catch (error) {
      console.error("Error al realizar la solicitud GET:", error);
    }
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
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-300 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300 h-12">
              <tr className="text-[20px]">
                <th className="px-5 py-3">DNI</th>
                <th className="px-5 py-3">NOMBRE</th>
                <th className="px-5 py-3">CELULAR</th>
                <th className="px-5 py-3">CORREO</th>
                <th className="px-7 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white">
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
                      onClick={() => buscar_mascotas(cliente)}
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
            className="flex items-center justify-center z-50"
          >
            {/* Contenido del modal de Ver Mascotas */}
            <div className="bg-gray-200 text-black p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md space-y-5">
              <h2 className="text-2xl font-mono text-center">
                {titulo && titulo.length > 0 && <>{titulo}</>}
              </h2>
              <div>
                {mascotas.length > 0 ? (
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="bg-gray-700 text-white">
                      <tr className="text-[20px]">
                        <th className="px-5 py-3">NOMBRE</th>
                        <th className="px-5 py-3">TIPO</th>
                        <th className="px-5 py-3">EDAD</th>
                        <th className="px-7 py-3">SEXO</th>
                        <th className="px-7 py-3"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {mascotas.map((mascota, index) => (
                        <tr key={`${mascota.idMascota}_${index}`}>
                          <td className="px-4 py-2">{mascota.nombre}</td>
                          <td className="px-4 py-2">{mascota.tipo}</td>
                          <td className="px-4 py-2 text-center">
                            {mascota.edad}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {mascota.sexo}
                          </td>
                          <td className="px-4 py-2 flex justify-center space-x-3">
                            <button
                              onClick={() =>
                                inhabilitar_mascota(mascota, mascota.idMascota)
                              }
                              className="text-white font-bold py-1 px-2 rounded bg-red-500 hover:bg-red-800 ease-in-out duration-300"
                            >
                              Inhabilitar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-center text-red-500 my-8">
                    Este usuario no tiene mascotas
                  </p>
                )}
              </div>
              <div>
                <form>
                  <label>NOMBRE:</label>
                  <input
                    className="w-full rounded-md border border-[#E9EDF4] py-1 px-3 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none"
                    type="text"
                    name="NOMBRE"
                    value={nombreMascota}
                    onChange={(event) => setNombreMascota(event.target.value)}
                  />
                  <label>TIPO(raza, descripcion):</label>
                  <input
                    className="w-full rounded-md border border-[#E9EDF4] py-1 px-3 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none"
                    type="text"
                    name="TIPO"
                    value={tipoMascota}
                    onChange={(event) => setTipoMascota(event.target.value)}
                  />
                  <label>EDAD:</label>
                  <input
                    className="w-full rounded-md border border-[#E9EDF4] py-1 px-3 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none"
                    type="number"
                    name="EDAD"
                    value={edadMascota}
                    onChange={(event) =>
                      setEdadMascota(
                        isNaN(parseInt(event.target.value, 10))
                          ? 0 // Valor predeterminado si la conversión a número falla
                          : parseInt(event.target.value, 10)
                      )
                    }
                  />
                  <label>SEXO:</label>
                  <select
                    className="w-full rounded-md border border-[#E9EDF4] py-1 px-3 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none"
                    name="SEXO"
                    value={sexoMascota}
                    onChange={(event) => {
                      setSexoMascota(event.target.value);
                      console.log(sexoMascota);
                    }}
                  >
                    <option value="M">M</option>
                    <option value="F">F</option>
                  </select>
                </form>
              </div>
              <div className="flex justify-between">
                <button
                  className="text-white font-bold py-1 px-2 rounded bg-blue-500 hover:bg-blue-800 ease-in-out duration-300"
                  onClick={closeVerMascotasModal}
                >
                  Cerrar
                </button>
                <button
                  className="text-white font-bold py-1 px-2 rounded bg-green-600 hover:bg-green-800 ease-in-out duration-300"
                  onClick={insertar_mascota}
                >
                  Agregar mascota
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Pacientes;
