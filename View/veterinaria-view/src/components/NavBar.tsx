import React, { useEffect, useState } from "react";
import appveterinariaserver from "@/api/appveterinariaserver";

type Props = {
  autenticador: string;
  onLogoClick: () => void;
  onCodTipoUsuarioChange: (codTipoUsuario: number) => void;
};

const NavBar: React.FC<Props> = ({
  autenticador,
  onLogoClick,
  onCodTipoUsuarioChange,
}) => {
  const [userData, setUserData] = useState({
    nombres: "",
    apellidos: "",
    cod_tipo_usuario: "",
  });

  useEffect(() => {
    obtener_informacion_usuario();
  }, [autenticador]);

  const obtener_informacion_usuario = async () => {
    //console.log("Identificador:", autenticador);
    try {
      if (autenticador) {
        const path = `informacion?identificador=${autenticador}`;
        const data = await appveterinariaserver.get(path);
        // Manejo de los datos recibidos
        setUserData({
          nombres: data.nombres,
          apellidos: data.apellidos,
          cod_tipo_usuario: data.cod_tipo_usuario,
        });
        onCodTipoUsuarioChange(data.cod_tipo_usuario);
        console.log(data);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud GET:", error);
    }
  };

  const signOut = () => {
    console.log("Usuario ha cerrado sesión.");
    // Lógica de cierre de sesión
  };

  return (
    <nav className="flex justify-between items-center h-[80px] p-3 text-black bg-gray-100">
      <div onClick={onLogoClick} className="font-bold cursor-pointer text-2xl">
        DOGVET
      </div>
      <div>
        <span className="mr-5">
          {`${userData.apellidos} ${userData.nombres}` || ""}
        </span>
        <button
          onClick={signOut}
          className="bg-gray-800 rounded-md py-2 px-4 text-white hover:bg-gray-600 ease-in-out duration-300"
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
