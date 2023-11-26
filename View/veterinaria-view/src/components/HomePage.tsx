import React from "react";
import Link from "next/link";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className="bg-gray-800 h-screen flex justify-center items-center">
      <div className="text-center flex flex-col space-y-5">
        {/* Enlace para ir a la página "seccion_1" */}
        <Link href={{ pathname: "/login" }}>
          <p className="bg-white border-2 border-black rounded-md py-5 px-7 text-black hover:bg-gray-400 ease-in-out duration-300">Iniciar Sesion</p>
        </Link>
        {/* Enlace para ir a la página "seccion_2" */}
        <Link href={{ pathname: "/register" }}>
          <p className="bg-white border-2 border-black rounded-md py-5 px-7 text-black hover:bg-gray-400 ease-in-out duration-300">Registrarse(prueba)</p>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
