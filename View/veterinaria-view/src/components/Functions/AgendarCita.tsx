import React from "react";

type Props = {};

const AgendarCita = (props: Props) => {
  return (
    <div className="bg-gray-100 md:h-[calc(100vh-80px)] p-8">
      <div className="text-center text-black flex flex-col space-y-5">
        <h1 className="text-3xl font-mono">
          <b>AGENDAR CITA</b>
        </h1>
      </div>
    </div>
  );
};

export default AgendarCita;
