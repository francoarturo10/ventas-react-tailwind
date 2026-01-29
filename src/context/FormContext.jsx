import { useEffect } from "react";
import { createContext, useState } from "react"
import api from '../api/api';

const FormContext = createContext();

export const ClientesProvider = ({children}) => {

    const [clientes, setClientes] = useState();

    useEffect( ()=>{
        api.get('/clientes')
    })

    return (
        <div>FormContext</div>
    )
}
