"use client"

import {
  Search,
  Calculator,
  EyeOff,
  Eye,
  Sun,
  Moon,
} from "lucide-react"
import { useState } from "react";
import FilterOptions from "./components/filterOptions";
import AddClientForm from "./components/addClientForm";
import AddClientButton from "./components/addClientButton";
import { useClients } from "./hooks/useClient";
import ClientItem from "./components/clientItem";
import { Client } from "./types/clientType";

export default function ClientsInteface() {
  const { clients, isLoading, error, createClient, removeClient } = useClients()
  const [darkMode, setDarkMode] = useState(false);
  const [hideValues, setHideValues] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const total = 900;

  function changeColorMode() {
    setDarkMode(prev => !prev)
  }

  return (
    <div className="min-h-dvh">
      <div className="text-white pt-4 pb-12 px-4 bg-[var(--highlight)]">

        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-medium">Clientes</h1>
          <div className="space-x-2">
            <button className="p-1 rounded-md hover:bg-[#0057DB]" onClick={changeColorMode}>
              {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
            <button className="p-1 rounded-md hover:bg-[#0057DB]">
              <Calculator className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="mb-2">
          <p className="text-white/80 text-sm">Valor a receber</p>
          <p className="text-2xl font-semibold">{hideValues ? "R$ ••••" : `R$ ${total}`}</p>
        </div>

        <button className="flex items-center text-white/80 text-sm" onClick={() => setHideValues(!hideValues)}>
          {hideValues ? (
            <>
              <Eye className="h-4 w-4 mr-1" />
              <span>Mostrar valores</span>
            </>
          ) : (
            <>
              <EyeOff className="h-4 w-4 mr-1" />
              <span>Ocultar valores</span>
            </>
          )}
        </button>

      </div>

      <div className="rounded-t-3xl -mt-8 px-4 pt-4 pb-4 space-y-6 bg-[var(--background)]">
        <div className="space-y-4">
          {/* Barra de pesquisa */}
          <div className="relative">
            <input type="text" className="block w-full pl-9 py-1 pr-2 border border-border rounded-md bg-white focus:ring-[#0066ff] focus:border-[#0065FF] outline-none shadow-sm" placeholder="Buscar cliente..." />
            <div className="absolute left-2 bottom-[9px]">
              <Search className="h-4 text-[#6B7A99] mr-2" />
            </div>
          </div>
          <FilterOptions />
        </div>
        {isLoading && <div>Carregando.............</div>}
        <div className="space-y-2">
          {clients.map((client: Client) => (
            <ClientItem onDeleteClient={removeClient} key={client.id} client={client} />
          ))}
        </div>
      </div>
      <AddClientButton onClick={() => setModalOpen(true)} />
      <AddClientForm open={isModalOpen} onCreateClient={createClient} setOpen={setModalOpen} />
    </div>
  );
}