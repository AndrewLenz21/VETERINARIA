"use client";
import React, {useEffect} from 'react'
import { useRouter } from "next/navigation";

type Props = {}

const page = (props: Props) => {

    const router = useRouter();
    console.log("identificativo")
    useEffect(() => {
        const identifier = localStorage.getItem('identifier');
        console.log(identifier);
    }, []);
    
  return (
    <div>Estas son las funciones</div>
  )
}

export default page