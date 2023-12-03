import React, { useState, useEffect } from "react";
import appveterinariaserver from "@/api/appveterinariaserver";

type Props = {
  onFunctionSelect: (functionName: number) => void;
  codTipoUsuario: number;
};

class UsuarioFuncionesEntity {
  cod_tipo_funcion!: number;
  desc_tipo_funcion!: string;
  path_imagen!: string;
}

const FunctionsPage: React.FC<Props> = ({
  onFunctionSelect,
  codTipoUsuario,
}) => {
  const [functionsData, setFunctionsData] = useState<UsuarioFuncionesEntity[]>(
    []
  );

  //CAMBIOS EXTERNOS (codTipoUsuario)
  useEffect(() => {
    if (codTipoUsuario > 0) {
      console.log("codTipoUsuario:", codTipoUsuario);
      //OBTENER FUNCIONES
      obtener_funciones_usuario();
    }
  }, [codTipoUsuario]);

  const obtener_funciones_usuario = async () => {
    //console.log("Identificador:", autenticador);
    try {
      if (codTipoUsuario) {
        const path = `funciones_usuario?id=${codTipoUsuario}`;
        const data = await appveterinariaserver.get(path);
        console.log(data);
        setFunctionsData(data);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud GET:", error);
    }
  };

  return (
    <div className="bg-gray-100 md:h-[calc(100vh-80px)] p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 mx-[100px]">
        {functionsData.map((item, index) => (
          <div
            key={index}
            className="bg-white text-center flex flex-col justify-center p-4 rounded-lg shadow-md max-h-[30vh] cursor-pointer hover:bg-gray-100 ease-in-out duration-300"
            onClick={() => onFunctionSelect(item.cod_tipo_funcion)}
          >
            <p className="text-gray-800">
              Cod Tipo Función: {item.cod_tipo_funcion}
            </p>
            <h1 className="text-gray-800 text-2xl">
              <b>{item.desc_tipo_funcion}</b>
            </h1>
            <img
              src={`/imagenes_funciones/${item.path_imagen}.jpg`}
              alt={item.path_imagen}
              className="mt-4 object-contain h-40 w-40 m-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default FunctionsPage;
