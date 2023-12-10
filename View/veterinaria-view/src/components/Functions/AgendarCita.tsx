import React, { useState, useEffect } from "react";
import appveterinariaserver from "@/api/appveterinariaserver";
import Modal from "react-modal";
// DATEPICKER
// npm install react-datepicker
// npm install --save-dev @types/react-datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from "date-fns/addDays";

class ClientesEntity {
  idCliente!: number;
  identificador!: string;
  nombres!: string;
  apellidos!: string;
  celular!: string;
  email!: string;
}

class MascotasEntity {
  idMascota!: number;
  identificador!: string;
  nombre!: string;
  tipo!: string;
  edad!: number;
  sexo!: string;
}

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

class CitaAgendadaEntity {
  id_usuario!: number;
  id_cliente!: number;
  id_mascota!: number;
  fecha_cita!: string; // Supongo que fecha_cita es una cadena de texto en este contexto
  cod_tipo_horario_cita!: number;
  usuario_insercion!: string;
  motivo_cita!: string;
  observaciones_cliente!: string;
}

class HorariosDisponiblesEntity {
  cod_horario!: number;
  descripcion_horario!: string;
}

type Props = {
  autenticador: string;
};

const AgendarCita: React.FC<Props> = ({ autenticador }) => {
  const [clientes, setClientes] = useState<ClientesEntity[]>([]);
  const [mascotas, setMascotas] = useState<MascotasEntity[]>([]);
  // BUSQUEDA VETERINARIOS
  const [tipoUsuarioFiltro, setTipoUsuarioFiltro] = useState(2);
  const [usuarios, setUsuarios] = useState<UsuarioRegistradoEntity[]>([]);
  // BUSQUEDA HORARIOS DISPONIBLES
  const [horariosDisponibles, setHorariosDisponibles] = useState<
    HorariosDisponiblesEntity[]
  >([]);
  // HORARIO SELECCIONADO
  const [horarioSeleccionadoId, setHorarioSeleccionadoId] = useState(0);
  // SELECCIONADO
  const [mascotaSeleccionada, setMascotaSeleccionada] =
    useState<MascotasEntity | null>(null);
  const [veterinarioSeleccionado, setVeterinarioSeleccionado] =
    useState<UsuarioRegistradoEntity | null>(null);
  const [horarioSeleccionado, setHorarioSeleccionado] =
    useState<HorariosDisponiblesEntity | null>(null);
  // CLIENTE SINGULAR
  const [cliente, setCliente] = useState<ClientesEntity | null>(null);
  const [dni_identificador, setDniIdentificador] = useState("");
  // ABRIR CERRAR MODAL
  const [citaModalIsOpen, setCitaModalIsOpen] = useState(false);
  const openAgendarCitaModal = () => {
    setCitaModalIsOpen(true);
  };
  const closeAgendarCitaModal = () => {
    setCitaModalIsOpen(false);
  };
  // TITULO DE LA MODAL AGENDAR CITA
  const [titulo, setTitulo] = useState("");
  // INFORMACION DEL CLIENTE
  const [id, setId] = useState(0);
  const [dni, setDni] = useState("");
  const [nombres, setNombres] = useState("");
  // MOTIVO CITA
  const [motivoCita, setMotivoCita] = useState<string>("");
  const [observacionesCliente, setObservacionesCliente] = useState<string>("");
  // FECHA SELECCIONADA
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null);
  //OBTENCION DE CLIENTES
  useEffect(() => {
    obtener_clientes();
    if (veterinarioSeleccionado !== null && fechaSeleccionada) {
      buscar_horarios_disponibles(fechaSeleccionada);
    }
    //console.log(autenticador);
  }, [dni_identificador, fechaSeleccionada, veterinarioSeleccionado]);

  // SECCION CLIENTES
  const obtener_clientes = async () => {
    //console.log("Identificador:", autenticador);
    try {
      if (dni_identificador || dni_identificador.length >= 3) {
        const path = `obtener_clientes?dni=${dni_identificador}`;
        const data = await appveterinariaserver.get(path);
        setClientes(data);
        Modal.setAppElement("#root");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud GET:", error);
    }
  };

  // SECCION CLIENTES
  const agendar_cita = (cliente: ClientesEntity) => {
    //console.log("DNI (identificador):", cliente.identificador);
    //console.log("ID:", cliente.idCliente);
    // ABRIR LA MODAL DE LAS MASCOTAS
    setCliente(cliente);
    setMascotaSeleccionada(null);
    setTitulo(`Agendar cita para: ${cliente.nombres}`);
    // LLAMAR A LA FUNCION QUE OBTIENE LAS MASCOTAS Y MAPEARLAS DENTRO DEL SELECT
    setMascotas([]);
    obtener_mascotas(cliente.identificador);
    //VACIAR HORARIOS DISPONIBLES
    setHorariosDisponibles([]);
    // LLAMAR A LA FUNCION QUE OBTIENE LOS VETERINARIOS
    obtener_veterinarios();
    // ESTABLECER FECHA DEFAULT HOY
    setFechaSeleccionada(null);
    // OBTENER NUESTRO DNI DEL DUEñO
    setDni(cliente.identificador);
    setNombres(cliente.nombres);
    openAgendarCitaModal();
    // VACIAR LOS INPUTS
  };
  const obtener_mascotas = async (identificador: string) => {
    //console.log("Identificador:", autenticador);
    try {
      if (identificador || identificador.length == 8) {
        const path = `obtener_mascotas?dni=${identificador}`;
        const data = await appveterinariaserver.get(path);
        //console.log("Estas son las mascotas: ", data);
        setMascotas(data);
        Modal.setAppElement("#root");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud GET:", error);
    }
  };
  // MASCOTA SELECCIONADA:
  // Define la función para buscar la mascota seleccionada
  const buscarMascotaSeleccionada = (selectedMascotaId: number) => {
    if (selectedMascotaId === 0) {
      setMascotaSeleccionada(null);
    } else {
      const selectedMascota =
        mascotas.find((m) => m.idMascota === selectedMascotaId) || null;
      setMascotaSeleccionada(selectedMascota);
    }
  };
  // OBTENER VETERINARIOS
  const obtener_veterinarios = async () => {
    //console.log("Identificador:", autenticador);
    try {
      setTipoUsuarioFiltro(2); // BUSCAMOS SOLO VETERINARIOS
      const path = `obtener_usuarios?dni=&cod_tipo_usuario=${tipoUsuarioFiltro}`;
      const data = await appveterinariaserver.get(path);
      //console.log(data);
      setUsuarios(data);
    } catch (error) {
      console.error("Error al realizar la solicitud GET:", error);
    }
  };
  const buscarVeterinarioSeleccionado = (selectedVeterinarioId: number) => {
    if (selectedVeterinarioId === 0) {
      setVeterinarioSeleccionado(null);
    } else {
      const veterinarioSeleccionado =
        usuarios.find((m) => m.id === selectedVeterinarioId) || null;
      setVeterinarioSeleccionado(veterinarioSeleccionado);
    }
  };
  // BUSCAR HORARIOS
  const buscar_horarios_disponibles = (date: Date) => {
    try {
      //console.log(`Mi fecha es la siguiente: ${date}`);
      const fechaFormatoISO = date.toISOString();
      const fechaFormatoCorrecto = fechaFormatoISO.substring(0, 10);
      const path = `horarios_disponibles?fecha=${fechaFormatoCorrecto}&cod_usuario=${veterinarioSeleccionado?.id}`;
      //console.log(path);
      appveterinariaserver.get(path).then(function (data) {
        console.log("Estos son los horarios disponibles: ", data);
        setHorariosDisponibles(data);
      });
    } catch (error) {
      console.error("Error al realizar la solicitud GET:", error);
    }
  };

  const buscarHorarioSeleccionado = (selectedHorarioId: number) => {
    if (selectedHorarioId === 0) {
      setHorarioSeleccionado(null);
    } else {
      const horarioSeleccionado =
        horariosDisponibles.find((m) => m.cod_horario === selectedHorarioId) ||
        null;
      setHorarioSeleccionado(horarioSeleccionado);
    }
  };
  // GUARDAR CITA
  const guardarCitaAgendada = () => {
    if (
      cliente &&
      mascotaSeleccionada &&
      veterinarioSeleccionado &&
      horarioSeleccionado &&
      motivoCita &&
      observacionesCliente
    ) {
      console.log("Cliente:", cliente.nombres);
      console.log("Mascota:", mascotaSeleccionada.nombre);
      console.log("Veterinario:", veterinarioSeleccionado.nombres);
      console.log("Horario:", horarioSeleccionado.descripcion_horario);
      console.log("Motivo Cita:", motivoCita);
      console.log("Observaciones Cliente:", observacionesCliente);
      const mensaje = `Cliente: ${cliente.nombres}\nMascota: ${
        mascotaSeleccionada.nombre
      }\nVeterinario: ${
        veterinarioSeleccionado.nombres
      }\nFecha: ${fechaSeleccionada
        ?.toString()
        .substring(0, 15)}\nHorario Cita: ${
        horarioSeleccionado.descripcion_horario
      }\nMotivo Cita: ${motivoCita}\nObservaciones Cliente: ${observacionesCliente}`;

      if (window.confirm(`${mensaje}\n¿Confirmar la cita agendada?`)) {
        // Realizar aquí la llamada para agendar la cita
        console.log("Cita agendada con éxito");
        const cita = new CitaAgendadaEntity();
        cita.id_usuario = veterinarioSeleccionado.id;
        cita.id_cliente = cliente.idCliente;
        cita.id_mascota = mascotaSeleccionada.idMascota;
        cita.fecha_cita = fechaSeleccionada ? fechaSeleccionada.toISOString() : new Date().toISOString();
        cita.cod_tipo_horario_cita = horarioSeleccionado.cod_horario;
        cita.usuario_insercion = autenticador;
        cita.motivo_cita = motivoCita;
        cita.observaciones_cliente = observacionesCliente;

        // AGENDAR LA CITA
        appveterinariaserver
            .post("agendar_cita", cita)
            .then(function () {
              // LUEGO DE INSERTAR EL CLIENTE, HACER LA BUSQUEDA
              closeAgendarCitaModal();
            });

      }
    } else {
      // Alguno de los campos no está valorizado, muestra una alerta.
      alert("Por favor, completa todos los campos antes de agendar la cita.");
    }
  };

  return (
    <div id="root" className="bg-gray-100 md:h-[calc(100vh-80px)] p-8">
      <div className="text-center text-black flex flex-col space-y-5">
        <h1 className="text-3xl font-mono">
          <b>AGENDAR CITA</b>
        </h1>
        <div className="w-full flex space-x-6 items-center md:px-[200px]">
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
                      onClick={() => agendar_cita(cliente)}
                      className="text-white font-bold py-1 px-2 rounded bg-green-600 hover:bg-green-800 ease-in-out duration-300"
                    >
                      Agendar Cita
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-red-500 my-8">
            Agrega un DNI para seleccionar un cliente
          </p>
        )}
        <div id="modales">
          <Modal
            isOpen={citaModalIsOpen}
            onRequestClose={closeAgendarCitaModal}
            contentLabel="Agregar Cliente"
            className="flex items-center justify-center z-50"
          >
            <div className="bg-gray-200 text-black p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md space-y-5">
              <h2 className="text-2xl font-mono text-center w-[800px]">
                {titulo && titulo.length > 0 && <>{titulo}</>}
              </h2>
              <div className="flex">
                <div className="w-1/2 p-4">
                  <h3 className="text-xl font-semibold text-center">Cliente</h3>
                  <div className="mt-2">
                    <label className="block font-semibold">
                      Identificador:
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1"
                      value={cliente ? cliente.identificador : ""}
                      readOnly
                    />
                  </div>
                  <div className="mt-2">
                    <label className="block font-semibold">
                      Nombres y Apellidos:
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1"
                      value={
                        cliente ? `${cliente.apellidos} ${cliente.nombres}` : ""
                      }
                      readOnly
                    />
                  </div>
                  <div className="mt-2">
                    <label className="block font-semibold">Celular:</label>
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1"
                      value={cliente ? cliente.celular : ""}
                      readOnly
                    />
                  </div>
                  <div className="mt-2">
                    <label className="block font-semibold">
                      Correo Electrónico:
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1"
                      value={cliente ? cliente.email : ""}
                      readOnly
                    />
                  </div>
                  {/* Parte de la Mascota */}

                  <h3 className="text-xl font-semibold text-center mt-4">
                    Mascota
                  </h3>
                  {mascotas.length === 0 ? (
                    <p>El cliente no ha registrado una mascota.</p>
                  ) : (
                    <div className="mt-1">
                      <label className="block font-semibold">
                        Seleccionar Mascota:
                      </label>
                      <select
                        className="w-full rounded-md border border-[#E9EDF4] py-1 px-3 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none"
                        defaultValue="0"
                        onChange={(e) => {
                          const selectedMascotaId = parseInt(e.target.value);
                          buscarMascotaSeleccionada(selectedMascotaId);
                        }}
                      >
                        <option value="0" disabled>
                          Selecciona una mascota
                        </option>
                        {mascotas.map((mascota) => (
                          <option
                            key={mascota.idMascota}
                            value={mascota.idMascota}
                          >
                            {mascota.nombre}
                          </option>
                        ))}
                      </select>
                      {mascotaSeleccionada && (
                        <>
                          <div className="mt-2">
                            <label className="block font-semibold">Tipo:</label>
                            <input
                              type="text"
                              className="w-full border rounded px-2 py-1"
                              value={mascotaSeleccionada.tipo}
                              readOnly
                            />
                          </div>
                          <div className="mt-2">
                            <label className="block font-semibold">Edad:</label>
                            <input
                              type="text"
                              className="w-full border rounded px-2 py-1"
                              value={mascotaSeleccionada.edad}
                              readOnly
                            />
                          </div>
                          <div className="mt-2">
                            <label className="block font-semibold">Sexo:</label>
                            <input
                              type="text"
                              className="w-full border rounded px-2 py-1"
                              value={mascotaSeleccionada.sexo}
                              readOnly
                            />
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <div className="w-1/2 p-4">
                  <h3 className="text-xl font-semibold text-center">
                    Seleccionar Veterinario
                  </h3>
                  <select
                    className="w-full mt-2 rounded-md border border-[#E9EDF4] py-1 px-3 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none"
                    defaultValue="0"
                    onChange={(e) => {
                      const selectedVeterinarioId = parseInt(e.target.value);
                      buscarVeterinarioSeleccionado(selectedVeterinarioId);
                    }}
                  >
                    <option value="0" disabled>
                      Selecciona un veterinario
                    </option>
                    {usuarios.map((veterinario) => (
                      <option key={veterinario.id} value={veterinario.id}>
                        {`${veterinario.apellidos} ${veterinario.nombres} (${veterinario.rol_especialidad})`}
                      </option>
                    ))}
                  </select>
                  <h3 className="text-xl font-semibold mt-2">Fecha</h3>
                  <div className="w-full">
                    <DatePicker
                      selected={fechaSeleccionada}
                      onChange={(date) => {
                        setFechaSeleccionada(date);
                      }}
                      minDate={new Date()}
                      className="w-full mt-2 rounded-md border border-[#E9EDF4] py-1 px-3 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none"
                    />
                  </div>
                  {horariosDisponibles.length > 0 &&
                  veterinarioSeleccionado != null ? (
                    <select
                      className="w-full mt-2 rounded-md border border-[#E9EDF4] py-1 px-3 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none"
                      defaultValue="0"
                      onChange={(e) => {
                        const horarioId = parseInt(e.target.value);
                        buscarHorarioSeleccionado(horarioId);
                      }}
                    >
                      <option value="0" disabled>
                        Selecciona un horario
                      </option>
                      {horariosDisponibles.map((horario) => (
                        <option
                          key={horario.cod_horario}
                          value={horario.cod_horario}
                        >
                          {`${horario.descripcion_horario}`}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-center text-red-500 my-8">
                      Selecciona un veterinario y una fecha.
                    </p>
                  )}
                  <h3 className="text-xl font-semibold mt-2">Motivo Cita</h3>
                  <div className="w-full">
                    <textarea
                      rows={4} // Configura el número máximo de líneas
                      style={{ resize: "none" }}
                      className="w-full mt-2 rounded-md border border-[#E9EDF4] py-1 px-3 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none"
                      value={motivoCita} // Establece el valor del textarea
                      onChange={(e) => setMotivoCita(e.target.value)} // Actualiza el estado motivoCita cuando cambie el textarea
                    ></textarea>
                  </div>
                  <h3 className="text-xl font-semibold mt-2">
                    Observaciones Cliente
                  </h3>
                  <div className="w-full">
                    <textarea
                      rows={4} // Configura el número máximo de líneas
                      style={{ resize: "none" }}
                      className="w-full mt-2 rounded-md border border-[#E9EDF4] py-1 px-3 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none"
                      value={observacionesCliente} // Establece el valor del textarea
                      onChange={(e) => setObservacionesCliente(e.target.value)} // Actualiza el estado motivoCita cuando cambie el textarea
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  className="text-white font-bold py-1 px-2 rounded bg-blue-500 hover:bg-blue-800 ease-in-out duration-300"
                  onClick={guardarCitaAgendada}
                >
                  AgendarCita
                </button>
                <button
                  className="text-white font-bold py-1 px-2 rounded bg-red-500 hover:bg-red-800 ease-in-out duration-300"
                  onClick={closeAgendarCitaModal}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AgendarCita;
