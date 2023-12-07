import React, { useState, useEffect } from "react";
import appveterinariaserver from "@/api/appveterinariaserver";
import Modal from "react-modal";

type Props = {
  autenticador: string;
};
// ENTITIES DE LOS USUARIOS
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
class ModificarUsuarioEntity {
  id_usuario!: number;
  id_credenciales!: number;
  id_especialidad!: number;
  dni!: string;
  nombres!: string;
  apellidos!: string;
  cod_tipo_usuario!: number;
  rol_especialidad!: string;
  email!: string;
  password!: string;
  utente_modificacion!: string;
}
class InsertarUsuarioEntity {
  id_usuario!: number;
  identificador!: string;
  nombres!: string;
  apellidos!: string;
  cod_tipo_usuario!: number;
  email!: string;
  password!: string;
  rol_especialidad!: string;
  utente_inserimento!: string;
}

const Usuario: React.FC<Props> = ({ autenticador }) => {
  const [usuarios, setUsuarios] = useState<UsuarioRegistradoEntity[]>([]);
  // FILTROS
  const [dni_identificador, setDniIdentificador] = useState("");
  const [tipo_usuario_filtro, setTipo_usuario_filtro] = useState(0);
  // VARIABLES DE LA MODAL USUARIO
  const [id, setId] = useState(0);
  const [id_credenciales, setId_credenciales] = useState(0);
  const [id_rol, setId_rol] = useState(0);
  const [dni, setDni] = useState(""); //identificador
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tipo_usuario, setTipo_usuario] = useState(0);
  const [rol, setRol] = useState("");
  // TITULO DE LA MODAL USUARIO
  const [titulo, setTitulo] = useState("");
  // Estado para controlar la modal
  const [usuarioModalIsOpen, setUsuarioModalIsOpen] = useState(false);
  // Funciones para abrir y cerrar cada modal
  const openUsuarioModal = (funcion: string) => {
    console.log(`La funcion de nuestra modal es : ${funcion}`);
    setUsuarioModalIsOpen(true);
  };
  const closeUsuarioModal = () => {
    setUsuarioModalIsOpen(false);
  };

  const guardarInfoUsuarioModal = () => {
    // usemos titulo para agregar o modificar
    if (titulo == "AGREGAR USUARIO") {
      console.log("Estamos aca");
      insertar_usuario();
    }
    if (titulo == "EDITAR USUARIO") {
      modificar_usuario();
    }
  };
  const vaciarElementosModal = () => {
    // VACIAR LOS RESULTADOS
    setId(0);
    setId_credenciales(0);
    setId_rol(0);
    setDni("");
    setNombres("");
    setApellidos("");
    setEmail("");
    setPassword("");
    setTipo_usuario(0);
    setRol("");
  };

  useEffect(() => {
    obtener_usuarios();
    //console.log(autenticador);
  }, [dni_identificador]);

  const obtener_usuarios = async () => {
    //console.log("Identificador:", autenticador);
    console.log(dni_identificador, tipo_usuario_filtro);
    try {
      if (dni_identificador || dni_identificador.length >= 1) {
        const path = `obtener_usuarios?dni=${dni_identificador}&cod_tipo_usuario=${tipo_usuario_filtro}`;
        console.log(path);
        const data = await appveterinariaserver.get(path);
        console.log(data);
        setUsuarios(data);
        Modal.setAppElement("#root");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud GET:", error);
    }
  };

  const insertar_usuario = async () => {
    try {
      if (
        dni &&
        nombres &&
        apellidos &&
        email &&
        dni.length == 8 &&
        password &&
        tipo_usuario &&
        rol
      ) {
        //VERIFICAR EXISTENCIA DEL USUARIO
        const path = `obtener_usuarios?dni=${dni}&cod_tipo_usuario=${tipo_usuario}`;
        const data = await appveterinariaserver.get(path);

        if (data.length > 0) {
          // Cliente ya existe, mostrar mensaje de alerta
          alert("Usuario con ese rol ya existente");
        } else {
          //DEFINIMOS NEUSTRO OBJETO
          const cliente = new InsertarUsuarioEntity();
          cliente.identificador = dni;
          cliente.nombres = nombres;
          cliente.apellidos = apellidos;
          cliente.password = password;
          cliente.email = email;
          cliente.cod_tipo_usuario = tipo_usuario;
          cliente.rol_especialidad = rol;
          cliente.id_usuario = 0; // no considerar
          cliente.utente_inserimento = autenticador;

          console.log(cliente);
          appveterinariaserver
            .post("insertar_usuario", cliente)
            .then(function () {
              // LUEGO DE INSERTAR EL CLIENTE, HACER LA BUSQUEDA
              obtener_usuarios();
              closeUsuarioModal();
              vaciarElementosModal();
            });
        }
      }
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);
    }
  };
  const modificar_usuario = async () => {
    try {
      // Definimos nuestro objeto ModificarClienteEntity
      const cliente = new ModificarUsuarioEntity();
      cliente.id_usuario = id;
      cliente.id_credenciales = id_credenciales;
      cliente.id_especialidad = id_rol;
      cliente.dni = dni;
      cliente.nombres = nombres;
      cliente.apellidos = apellidos;
      cliente.email = email;
      cliente.password = password;
      cliente.cod_tipo_usuario = tipo_usuario;
      cliente.rol_especialidad = rol;
      cliente.utente_modificacion = autenticador;
      //LLAMADA POST
      appveterinariaserver.post("modificar_usuario", cliente).then(function () {
        obtener_usuarios();
        closeUsuarioModal();
        vaciarElementosModal();
      });
    } catch (error) {
      console.error("Error al realizar la solicitud GET:", error);
    }
  };
  // LLENAR LOS INPUTS AL ABRIR MODAL
  const editar_usuario = (usuario: UsuarioRegistradoEntity) => {
    setTitulo("EDITAR USUARIO");
    // DEFINIR LAS VARIABLES CON NUESTRA INFORMACION
    setId(usuario.id || 0);
    setId_credenciales(usuario.id_credenciales || 0);
    setId_rol(usuario.id_rol_especialidad || 0);
    setDni(usuario.autenticador || "");
    setNombres(usuario.nombres || "");
    setApellidos(usuario.apellidos || "");
    setEmail(usuario.email || "");
    setPassword(usuario.password || "");
    setTipo_usuario(usuario.cod_tipo_usuario || 0);
    setRol(usuario.rol_especialidad || "");

    openUsuarioModal("editar");
    console.log("DNI (identificador):", dni);
    console.log("ID:", usuario.id);
  };
  const eliminar_usuario = (usuario: UsuarioRegistradoEntity) => {
    // DEFINIR LAS VARIABLES CON NUESTRA INFORMACION
    const confirmacion = window.confirm(
      `¿Estás seguro de eliminar el cliente ${usuario.autenticador}?`
    );

    if (confirmacion) {
      //console.log("Cliente eliminado");
      appveterinariaserver
        .get(
          `eliminar_usuario?id_usuario=${usuario.id}&id_credenciales=${usuario.id_credenciales}&id_rol_especialidad=${usuario.id_rol_especialidad}`
        )
        .then(function () {
          obtener_usuarios();
        });
    }
  };

  const agregar_usuario = () => {
    setTitulo("AGREGAR USUARIO");
    // DEFINIR LAS VARIABLES CON NUESTRA INFORMACION
    vaciarElementosModal();
    openUsuarioModal("agregar");
  };

  return (
    <div id="root" className="bg-gray-100 md:h-[calc(100vh-80px)] p-8">
      <div className="text-center text-black flex flex-col space-y-5">
        <h1 className="text-3xl font-mono">
          <b>USUARIOS REGISTRADOS</b>
        </h1>
        <div className="w-full flex space-x-6 items-center md:px-[300px]">
          <input
            className="w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none"
            type="text"
            value={dni_identificador}
            onChange={(e) => setDniIdentificador(e.target.value)}
            placeholder="Ingrese el DNI"
          />
          <select
            className="w-full rounded-md border border-[#E9EDF4] py-1 px-3 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none"
            name="TIPO_USUARIO"
            value={tipo_usuario_filtro}
            onChange={(event) => {
              setTipo_usuario_filtro(parseInt(event.target.value, 10));
              console.log(tipo_usuario_filtro);
            }}
          >
            <option value="0"></option>
            <option value="1">Administrador</option>
            <option value="2">Veterinario</option>
            <option value="3">Secretario</option>
          </select>
          <button
            onClick={obtener_usuarios}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Buscar
          </button>
          <button
            onClick={agregar_usuario}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 w-[200px] rounded"
          >
            Agregar Usuario
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
                <th className="px-5 py-3">TIPO USUARIO</th>
                <th className="px-5 py-3">CORREO</th>
                <th className="px-7 py-3">ROL</th>
                <th className="px-7 py-3 text-center">Funciones</th>
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
                      onClick={() => editar_usuario(usuario)}
                      className="text-white font-bold py-1 px-2 rounded bg-blue-500 hover:bg-blue-800 ease-in-out duration-300"
                    >
                      Editar Usuario
                    </button>
                    <button
                      onClick={() => eliminar_usuario(usuario)}
                      className="text-white font-bold py-1 px-2 rounded bg-red-500 hover:bg-red-800 ease-in-out duration-300"
                    >
                      Eliminar Usuario
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
          {/* Modal para Agregar Usuario */}
          <Modal
            isOpen={usuarioModalIsOpen}
            onRequestClose={closeUsuarioModal}
            contentLabel="Agregar Usuario"
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
                <label>Tipo Usuario:</label>
                <select
                  className="w-full rounded-md border border-[#E9EDF4] py-1 px-3 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none"
                  name="TIPO_USUARIO"
                  value={tipo_usuario}
                  onChange={(event) => {
                    setTipo_usuario(parseInt(event.target.value, 10));
                    console.log(tipo_usuario);
                  }}
                >
                  <option value="0"></option>
                  <option value="1">Administrador</option>
                  <option value="2">Veterinario</option>
                  <option value="3">Secretario</option>
                </select>
                <label>Email:</label>
                <input
                  className="w-full rounded-md border border-[#E9EDF4] py-2 px-4 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none"
                  type="text"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <label>Password:</label>
                <input
                  className="w-full rounded-md border border-[#E9EDF4] py-2 px-4 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none"
                  type="text"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <label>Rol/Especialidad:</label>
                <input
                  className="w-full rounded-md border border-[#E9EDF4] py-2 px-4 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none"
                  type="text"
                  name="rol"
                  value={rol}
                  onChange={(event) => setRol(event.target.value)}
                />
              </form>

              <div className="flex justify-between">
                <button
                  className="text-white font-bold py-1 px-2 rounded bg-blue-500 hover:bg-blue-800 ease-in-out duration-300"
                  onClick={guardarInfoUsuarioModal}
                >
                  Guardar
                </button>
                <button
                  className="text-white font-bold py-1 px-2 rounded bg-red-500 hover:bg-red-800 ease-in-out duration-300"
                  onClick={closeUsuarioModal}
                >
                  Cerrar
                </button>
              </div>
            </div>
            {/* ... */}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Usuario;
