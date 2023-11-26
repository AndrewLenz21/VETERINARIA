"use client";
import React from "react";

type Props = {};

const page = (props: Props) => {
  const handleRegister = () => {
    console.log("Función de registro");
  };

  return (
    <div>
      <h1>Registrarse</h1>
      <input type="text" placeholder="Nombre de usuario" />
      <input type="password" placeholder="Contraseña" />
      <button onClick={handleRegister}>Register</button>
      <p>
        ¿Ya tienes una cuenta? <a href="/login">Inicia Sesión</a>
      </p>
    </div>
  );
};

export default page;
