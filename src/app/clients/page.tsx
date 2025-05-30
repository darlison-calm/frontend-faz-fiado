"use client"

import {
  Search,
  Calculator,
  EyeOff,
  Eye,
  Sun,
  Moon,
} from "lucide-react"
import { JSX, useEffect, useState } from "react";
import FilterOptions from "./components/FilterOptions";
import AddClientForm from "./components/AddClientForm";
import AddClientButton from "./components/AddClientButton";
import { useClients } from "./hooks/useClient";
import ClientItem from "./components/ClientItem";
import { Client } from "../../types/clientType";
import EditClientForm from "./components/EditClientForm";
import { LoadingOverlay } from "@/components/ui/loadingOverlay";

/**

@component ClientsListing

@description
Componente principal responsável por listar, adicionar, editar e remover clientes no sistema.
Apresenta a lista de clientes, permite alternar entre modo escuro/claro, exibe valores a receber com opção de ocultar,
e oferece recursos de busca e filtragem.

@features
Busca e exibição de lista de clientes
Alternância para ocultar/exibir valores financeiros
Abertura de modal para adição e edição de clientes
Integração com o hook useClients para operações de CRUD

@state
hideValues (boolean): controla visibilidade do valor a receber
isModalOpen (boolean): controla exibição do modal de adicionar cliente
isEditModalOpen (boolean): controla exibição do modal de edição
selectedClientId (number): ID do cliente selecionado para edição

@effects
useEffect na montagem do componente chama getClients para carregar os dados

@dependencies
useClients: hook customizado para lógica de negócios (fetch, create, edit, delete, redirect)
lucide-react: ícones para UI

Componentes filhos:
FilterOptions, AddClientForm, AddClientButton, ClientItem, EditClientForm

LoadingOverlay (mostrado durante carregamento)

@returns {JSX.Element} UI com barra superior de controle, valor a receber, busca, lista de clientes e modais
*/
export default function ClientsListing(): JSX.Element {
  const {
    clients,
    isLoading,
    createClient,
    editClient,
    getClients,
    goToClientDetailsPage,
    removeClient
  } = useClients()

  const [darkMode, setDarkMode] = useState(false);
  const [hideValues, setHideValues] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number>(0);
  const total = 900;

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal;
    getClients(signal);
    return () => {
      controller.abort()
    }
  }, [getClients]);

  const changeColorMode = () => {
    setDarkMode(prev => !prev)
  }

  function handleEditClient(id: number) {
    setSelectedClientId(id);
    setEditModalOpen(true);
  }

  if (isLoading) {
    return (
      <LoadingOverlay />
    )
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

      <div className="rounded-t-3xl -mt-8 px-4 pt-4 pb-4 space-y-6 bg-[var(--background)] flex flex-col">
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
        <div className="flex-1 overflow-y-auto  p-2">
          <ul className="space-y-2">
            {clients.map((client: Client) => (
              <ClientItem
                key={client.id} client={client}
                onEditClient={handleEditClient}
                onDeleteClient={removeClient}
                onViewDetails={goToClientDetailsPage}
              />))}
          </ul>
        </div>
      </div>
      <AddClientButton onClick={() => setModalOpen(true)} />
      <AddClientForm open={isModalOpen} onCreateClient={createClient} setOpen={setModalOpen} />
      <EditClientForm open={isEditModalOpen} setOpen={setEditModalOpen} clientId={selectedClientId} onEditClient={editClient} />
    </div>
  );
}