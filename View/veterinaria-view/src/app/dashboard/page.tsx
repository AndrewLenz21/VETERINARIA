"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import FunctionsPage from "@/components/FunctionsPage";
//FUNCIONES
import AgendarCita from "@/components/Functions/AgendarCita";
import GenerarInforme from "@/components/Functions/GenerarInforme";
import HistorialClinico from "@/components/Functions/HistorialClinico";
import Pacientes from "@/components/Functions/Pacientes";
import Usuario from "@/components/Functions/Usuario";
import Veterinarios from "@/components/Functions/Veterinarios";

type Props = {};

const page = (props: Props) => {
  const [identificador, setIdentificador] = useState("");
  const [codTipoUsuario, setCodTipoUsuario] = useState(0);

  const [currentFunction, setCurrentFunction] = useState(1);
  const handleCodTipoUsuarioChange = (codTipoUsuario: number) => {
    setCodTipoUsuario(codTipoUsuario);
  };

  const renderFunctionComponent = (number: number) => {
    switch (number) {
      //Nuestras funciones tienen un numero identificativo
      case 1:
        return (
          //NUESTRA PAGINA DE FUNCIONES
          <FunctionsPage
            onFunctionSelect={(num: number) => setCurrentFunction(num)}
            codTipoUsuario={codTipoUsuario}
          />
        );
      case 2:
        return <Pacientes autenticador={identificador}/>;
      case 3:
        return <AgendarCita />;
      case 4:
        return <Usuario />;
      case 5:
        return <Veterinarios />;
      case 6:
        return <HistorialClinico />;
      case 7:
        return <GenerarInforme />;
      // Añade casos para otros componentes basándose en el número
    }
  };

  const router = useRouter();
  useEffect(() => {
    const identifier = localStorage.getItem("identifier");
    setIdentificador(identifier ? identifier : "");
    //console.log(identifier);
  }, []);

  //LLAMAMOS AL COMPONENTE NAVBAR Y LUEGO A LA FUNCION SELECCIONADA
  return (
    <div>
      <NavBar
        autenticador={identificador}
        onLogoClick={() => setCurrentFunction(1)}
        onCodTipoUsuarioChange={handleCodTipoUsuarioChange}
      />
      {renderFunctionComponent(currentFunction)}
    </div>
  );
};

export default page;
