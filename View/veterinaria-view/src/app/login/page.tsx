"use client";
import React, {useEffect, useState} from "react";
import appveterinariaserver from "@/api/appveterinariaserver";
import { useRouter } from "next/navigation";

type Props = {};

const page = (props: Props) => {

  const router = useRouter();
  //Definicion de variables con useState
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  //Obtencion del token "identifier" para verificar una sesion
  useEffect(() => {
    const identifier = localStorage.getItem('identifier');
    console.log(identifier);
    //Si existe una sesion, entonces andar directamente al dashboard
    if (identifier && /^[0-9]{8}$/.test(identifier))  {
        //router.push('/dashboard');
    }
    //Si no existe, quedarse en el Login
  }, []);
 
  const handleSignIn = async () => {
    try {
      const credentials = {email: usuario,password: password}
      // Construye la URL con los parámetros
      var message = `Nuestro usuario tiene credenciales: ${usuario} y ${password}`
      console.log(message);
 
      const data = await appveterinariaserver.post(`login`, credentials);
      
      console.log('Respuesta del servidor:', data);

      //Con la respuesta del servidor, asignamos el identifier
      if(data.isAuthenticated == true) {
        localStorage.setItem('identifier', data.identifier);
        //router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
    
  };
  return (
    <section className="bg-[#F4F7FF] h-screen">
      <div className="h-screen flex justify-center items-center">
        <div className="bg-white flex flex-col text-gray-800 space-y-5 rounded-lg p-8 shadow-md w-full md:w-1/3">
          <h1 className="text-3xl text-center font-mono">Iniciar Sesión</h1>
          <input
            className="w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none"
            type="text"
            placeholder="Credencial"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <input
            className="w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-blue-700 text-white rounded-md py-3 w-36 mx-auto hover:bg-blue-500 ease-in-out duration-300"
            onClick={handleSignIn}
          >
            Sign In
          </button>
          <p>
            ¿No tienes una cuenta? <a className="text-blue-700 hover:text-blue-500 ease-in-out duration-300" href="/register">Regístrate</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default page;
