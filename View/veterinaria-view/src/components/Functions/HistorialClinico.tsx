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

const HistorialClinico: React.FC<Props> = ({ autenticador }) => {
  // TITULO DE LA MODAL REPORTE
  const [titulo, setTitulo] = useState("");
  // DEFINIR LAS CITAS ENCONTRADAS POR NUESTRA APLICACION
  const [citasEncontradas, setCitasEncontradas] = useState<CitaEntity[]>([]);
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

  const generar_reporte = async () => {
    await obtener_citas(); // Espera a que se obtengan las citas

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

    let pathByte = "";
    if (
      estadoFiltro === "" &&
      horarioFiltro === "" &&
      veterinarioFiltro === "" &&
      fechaFiltro === ""
    ) {
      pathByte = `generar_reporte?`;
    } else {
      pathByte = `generar_reporte?${estadoFiltro}${horarioFiltro}${veterinarioFiltro}${fechaFiltro}`;
    }

    try {
      const data = await appveterinariaserver.getByte(pathByte);
      const blob = new Blob([data], { type: "application/pdf" });
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "reporte_veterinaria.pdf";
      a.click();
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error al generar el reporte:", error);
    }
  };
  return (
    <div className="bg-gray-100 md:h-[calc(100vh-80px)] p-8">
      <div className="text-center text-black flex flex-col space-y-5">
        <h1 className="text-3xl font-mono">
          <b>HISTORIAL CLINICO</b>
        </h1>
        <div className="w-full flex space-x-6 items-center md:px-[300px]">
          <div className="w-full">
            <DatePicker
              selected={fechaSeleccionada}
              onChange={(date) => {
                setFechaSeleccionada(date);
              }}
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
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Buscar
          </button>
          <button
            onClick={generar_reporte}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Generar Reporte
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
                <th className="px-5 py-3">VETERINARIO</th>
                <th className="px-5 py-3">ESTADO CITA</th>
                <th className="px-7 py-3">CLIENTE</th>
                <th className="px-7 py-3">MASCOTA</th>
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
                  <td className="px-4 py-2">
                    {`${cita.usuario_apellidos} ${cita.usuario_nombres}`}
                  </td>
                  <td className="px-4 py-2">
                    {cita.descripcion_estado_cita}
                  </td>
                  <td className="px-4 py-2">
                    {`${cita.cliente_apellidos} ${cita.cliente_nombres}`}
                  </td>
                  <td className="px-4 py-2">
                    {cita.nombre_mascota}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-red-500 my-8">Citas no encontradas</p>
        )}
      </div>
    </div>
  );
};

export default HistorialClinico;
