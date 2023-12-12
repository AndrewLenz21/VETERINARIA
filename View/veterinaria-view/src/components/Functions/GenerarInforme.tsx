import React, { useState, useEffect } from "react";
import appveterinariaserver from "@/api/appveterinariaserver";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from "date-fns/addDays";

type Props = {
  autenticador: string;
};

class CitaEntity {
  codigo_cita!: number;
  cod_estado_cita!: number;
  descripcion_estado_cita!: string;
  id_usuario!: number;
  usuario_apellidos!: string;
  usuario_nombres!: string;
  id_cliente!: number;
  id_mascota!: number;
  nombre_mascota!: string;
  cliente_apellidos!: string;
  cliente_nombres!: string;
  fecha_cita!: Date;
  cod_horario_cita!: number;
  descripcion_horario_cita!: string;
  diagnostico!: string;
  receta_detalle!: string;
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
class HorariosDisponiblesEntity {
  cod_horario!: number;
  descripcion_horario!: string;
}

const GenerarInforme: React.FC<Props> = ({ autenticador }) => {
  // TITULO DE LA MODAL REPORTE
  const [titulo, setTitulo] = useState("");
  // ABRIR CERRAR MODAL
  const [citaModalIsOpen, setCitaModalIsOpen] = useState(false);
  const openModal = () => {
    setCitaModalIsOpen(true);
  };
  const closeModal = () => {
    setCitaModalIsOpen(false);
  };
  // DEFINIR LAS CITAS ENCONTRADAS POR NUESTRA APLICACION
  const [citasEncontradas, setCitasEncontradas] = useState<CitaEntity[]>([]);
  const [citaSeleccionada, setCitaSeleccionada] = useState<CitaEntity | null>(
    null
  );
  // DIAGNOSTICO
  const [diagnostico, setDiagnostico] = useState("");
  const [receta, setReceta] = useState("");

  const buscarCitaSeleccionada = (selectedCitaId: number) => {
    if (selectedCitaId === 0) {
      setCitaSeleccionada(null);
    } else {
      const citaSeleccionada =
        citasEncontradas.find((m) => m.codigo_cita === selectedCitaId) || null;
      setCitaSeleccionada(citaSeleccionada);
    }
  };
  // ARRAY VETERINARIOS
  const [tipoUsuarioFiltro, setTipoUsuarioFiltro] = useState(2);
  const [usuarios, setUsuarios] = useState<UsuarioRegistradoEntity[]>([]);
  const [veterinarioSeleccionado, setVeterinarioSeleccionado] =
    useState<UsuarioRegistradoEntity | null>(null);
  // FECHA SELECCIONADA
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null);
  const [tipoEstadoCita, setTipoEstadoCita] = useState(0);
  // CODUSUARIO
  const [codUsuario, setCodUsuario] = useState(0);
  // BUSQUEDA HORARIOS DISPONIBLES
  const [horariosDisponibles, setHorariosDisponibles] = useState<
    HorariosDisponiblesEntity[]
  >([]);
  const [horarioSeleccionado, setHorarioSeleccionado] =
    useState<HorariosDisponiblesEntity | null>(null);

  useEffect(() => {
    buscar_horarios();
    obtener_veterinarios();
    //console.log(autenticador);
  }, []);

  // BUSCAR HORARIOS
  const buscar_horarios = () => {
    try {
      //console.log(`Mi fecha es la siguiente: ${date}`);
      const path = `horarios_disponibles?`;
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
  // BUSCAR VETERINARIOS
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

  const obtener_citas = () => {
    setCitasEncontradas([]);
    /*
    DATOS A PASAR:
    fecha
    cod_tipo_estado_cita
    cod_tipo_horario_cita
    id_veterinario
    */
    // FILTROS DINAMICOS
    const estadoFiltro =
      tipoEstadoCita != 0
        ? `&cod_tipo_estado_cita=${tipoEstadoCita.toString()}`
        : "";
    const horarioFiltro = horarioSeleccionado
      ? `&cod_tipo_horario_cita=${horarioSeleccionado.cod_horario}`
      : "";
    const veterinarioFiltro = veterinarioSeleccionado
      ? `&cod_usuario=${veterinarioSeleccionado.id}`
      : "";
    const fechaFiltro = fechaSeleccionada
      ? `&fecha=${fechaSeleccionada.toISOString().substring(0, 19)}`
      : "";

    let path = "";
    if (
      estadoFiltro === "" &&
      horarioFiltro === "" &&
      veterinarioFiltro === "" &&
      fechaFiltro === ""
    ) {
      path = `buscar_citas?`;
    } else {
      path = `buscar_citas?${estadoFiltro}${horarioFiltro}${veterinarioFiltro}${fechaFiltro}`;
    }

    console.log(path);

    appveterinariaserver.get(path).then(function (data) {
      console.log("Estas son las citas agendadas: ", data);
      setCitasEncontradas(data);
    });
  };

  const revisarDiagnostico = (cita: CitaEntity) => {
    openModal();
    buscarCitaSeleccionada(cita.codigo_cita);
    Modal.setAppElement("#root");
  };

  const registrarDiagnostico = () => {
    try {
      //console.log(`Mi fecha es la siguiente: ${date}`);
      const path = `generar_diagnostico?cod_cita=${citaSeleccionada?.codigo_cita}&diagnostico=${diagnostico}&receta=${receta}`;
      //console.log(path);
      appveterinariaserver.get(path).then(function () {
        closeModal();
        obtener_citas();
      });
    } catch (error) {
      console.error("Error al realizar la solicitud GET:", error);
    }
  };
  return (
    <div id="root" className="bg-gray-100 md:h-[calc(100vh-80px)] p-8">
      <div className="text-center text-black flex flex-col space-y-5">
        <h1 className="text-3xl font-mono">
          <b>Selecciona una cita</b>
        </h1>
        <div className="w-full flex space-x-6 items-center md:px-[300px]">
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
          <select
            className="w-full mt-2 rounded-md border border-[#E9EDF4] py-1 px-3 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none"
            defaultValue="0"
            onChange={(e) => {
              const horarioId = parseInt(e.target.value);
              buscarHorarioSeleccionado(horarioId);
            }}
          >
            <option value="0">Selecciona un horario</option>
            {horariosDisponibles.map((horario) => (
              <option key={horario.cod_horario} value={horario.cod_horario}>
                {`${horario.descripcion_horario}`}
              </option>
            ))}
          </select>
          <select
            className="w-full mt-2 rounded-md border border-[#E9EDF4] py-1 px-3 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none"
            defaultValue="0"
            onChange={(e) => {
              const selectedVeterinarioId = parseInt(e.target.value);
              buscarVeterinarioSeleccionado(selectedVeterinarioId);
            }}
          >
            <option value="0">Selecciona un veterinario</option>
            {usuarios.map((veterinario) => (
              <option key={veterinario.id} value={veterinario.id}>
                {`${veterinario.apellidos} ${veterinario.nombres} (${veterinario.rol_especialidad})`}
              </option>
            ))}
          </select>
          <select
            className="w-full mt-2 rounded-md border border-[#E9EDF4] py-1 px-3 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none"
            defaultValue="0"
            onChange={(e) => {
              setTipoEstadoCita(parseInt(e.target.value));
            }}
          >
            <option value="0">Selecciona un estado</option>
            <option value="1">Pendiente</option>
            <option value="2">Finalizada</option>
            <option value="3">Cancelada</option>
          </select>
          <button
            onClick={obtener_citas}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Buscar
          </button>
        </div>
      </div>
      {/* MAPEO DE RESULTADOS */}
      <div className="mt-8 md:mx-24 relative overflow-x-auto shadow-md sm:rounded-lg">
        {citasEncontradas.length > 0 ? (
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="bg-gray-700 text-white">
              <tr className="text-[20px]">
                <th className="px-5 py-3">FECHA</th>
                <th className="px-5 py-3">HORARIO</th>
                <th className="px-5 py-3">ESTADO CITA</th>
                <th className="px-7 py-3">CLIENTE</th>
                <th className="px-7 py-3">MASCOTA</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {citasEncontradas.map((cita, index) => (
                <tr key={`${cita.codigo_cita}_${index}`}>
                  <td className="px-4 py-2">
                    {cita.fecha_cita
                      ? cita.fecha_cita.toString().substring(0, 10)
                      : ""}
                  </td>
                  <td className="px-4 py-2">{cita.descripcion_horario_cita}</td>
                  <td className="px-4 py-2">{cita.descripcion_estado_cita}</td>
                  <td className="px-4 py-2">
                    {`${cita.cliente_apellidos} ${cita.cliente_nombres}`}
                  </td>
                  <td className="px-4 py-2">{cita.nombre_mascota}</td>
                  <td className="px-4 py-2 flex justify-center space-x-3">
                    <button
                      onClick={() => revisarDiagnostico(cita)}
                      className="text-white font-bold py-1 px-2 rounded bg-blue-500 hover:bg-blue-800 ease-in-out duration-300"
                    >
                      Realizar Diagnostico
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-red-500 my-8">Citas no encontradas</p>
        )}
      </div>
      <div id="modales">
        <Modal
          isOpen={citaModalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Agregar Cliente"
          className="flex items-center justify-center z-50"
        >
          <div className="bg-gray-200 text-black p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md space-y-5">
            <h2 className="text-2xl font-mono text-center w-[800px]">
              {titulo && titulo.length > 0 && <>{titulo}</>}
            </h2>
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold text-center">Cliente</h3>
              <div className="mt-2">
                <label className="block font-semibold">
                  Nombres y Apellidos:
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1"
                  value={
                    citaSeleccionada
                      ? `${citaSeleccionada.cliente_apellidos} ${citaSeleccionada.cliente_nombres}`
                      : ""
                  }
                  readOnly
                />
              </div>
              {/* Parte de la Mascota */}

              <h3 className="text-xl font-semibold text-center mt-4">
                Mascota
              </h3>
              <>
                <div className="mt-2">
                  <label className="block font-semibold">Tipo:</label>
                  <input
                    type="text"
                    className="w-full border rounded px-2 py-1"
                    value={citaSeleccionada?.nombre_mascota}
                    readOnly
                  />
                </div>
              </>
              <h3 className="text-xl font-semibold mt-2">Diagnostico</h3>
              <div className="w-full">
                <textarea
                  rows={4} // Configura el número máximo de líneas
                  style={{ resize: "none" }}
                  className="w-full mt-2 rounded-md border border-[#E9EDF4] py-1 px-3 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none"
                  value={diagnostico} // Establece el valor del textarea
                  onChange={(e) => setDiagnostico(e.target.value)} // Actualiza el estado motivoCita cuando cambie el textarea
                ></textarea>
              </div>
              <h3 className="text-xl font-semibold mt-2">Receta Detalles</h3>
              <div className="w-full">
                <textarea
                  rows={4} // Configura el número máximo de líneas
                  style={{ resize: "none" }}
                  className="w-full mt-2 rounded-md border border-[#E9EDF4] py-1 px-3 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none"
                  value={receta} // Establece el valor del textarea
                  onChange={(e) => setReceta(e.target.value)} // Actualiza el estado motivoCita cuando cambie el textarea
                ></textarea>
              </div>
            </div>
            <div className="flex justify-between">
            <button
              className="text-white font-bold py-1 px-2 rounded bg-blue-500 hover:bg-blue-800 ease-in-out duration-300"
              onClick={registrarDiagnostico}
            >
              Realizar Registro
            </button>
            <button
              className="text-white font-bold py-1 px-2 rounded bg-red-500 hover:bg-red-800 ease-in-out duration-300"
              onClick={closeModal}
            >
              Cerrar
            </button>
          </div>
          </div>
          
        </Modal>
      </div>
    </div>
  );
};

export default GenerarInforme;
