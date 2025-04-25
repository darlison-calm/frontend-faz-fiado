"use client"

import clients from "@/app/clients/clients.json";
import {
  Search,
  Calendar,
  ArrowDownZA,
  ArrowUpAZ,
  Calculator,
  User,
  EyeOff,
  Eye,
  Filter,
  MoreVertical
} from "lucide-react"
import { useState } from "react";
import ButtonWithIcon from "./components/buttonWithIcon";

export default function ClientsInteface() {
  const [isAlphaOrderUp, setAlphaOrder] = useState(true);
  const [hideValues, setHideValues] = useState(false)
  const totalDebt = 900;

  function changeButtonOrder() {
    setAlphaOrder((prev) => !prev);
  }

  return (
    <div className="flex flex-col min-h-dvh">
      <div className="px-4">
        <div className="text-white pt-4 pb-8 -mx-4" style={{ backgroundColor: 'var(--highlight)' }} >
          <div className="px-4">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-xl font-medium">Clientes</h1>
              <button className="p-1 rounded-md hover:bg-[#0057DB]">
                <Calculator className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-2">
              <p className="text-white/80 text-sm">Valor a receber</p>
              <p className="text-2xl font-semibold">{hideValues ? "R$ ••••" : `R$ ${totalDebt.toFixed(2)}`}</p>
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
        </div>

        <div className="flex flex-col rounded-t-3xl -mt-4 bg-white p-4 -mx-4" style={{ backgroundColor: 'var(--background)' }}>
          <div className="space-y-2">
            {/* Search filter bar */}
            <div className="relative">
              <input type="text" className="block w-full pl-9 py-1 pr-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#0066ff] focus:border-[#0066ff] outline-none" placeholder="Buscar cliente..." />
              <div className="absolute left-2 bottom-[9px]">
                <Search className="h-4 text-gray-400 mr-2" />
              </div>
            </div>
            {/* Top options */}
            <div className="flex gap-1">
              <ButtonWithIcon label="Data">
                <Calendar className="h-5 mr-1" style={{ color: 'var(--highlight)' }} />
              </ButtonWithIcon>
              <ButtonWithIcon onClick={changeButtonOrder} label={isAlphaOrderUp ? "A-Z" : "Z-A"}>
                {isAlphaOrderUp ? (
                  <ArrowUpAZ className="h-5 text-white mr-1" style={{ color: 'var(--highlight)' }} />
                ) : (
                  <ArrowDownZA className="h-5 text-white mr-1" style={{ color: 'var(--highlight)' }} />
                )}
              </ButtonWithIcon>
              <ButtonWithIcon label="Filtros">
                <Filter className="h-5 mr-1" style={{ color: 'var(--highlight)' }} />
              </ButtonWithIcon>
            </div>
          </div>
        </div>

        {/* Lista de clientes */}
        <div className="flex flex-col space-y-2 ">
          {clients.map((client) => (
            <div
              key={client.id}
              className="flex items-center py-3 px-3 bg-[#FBFFFE] rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow w-full"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 bg-[#0065FF]/10"
              >
                <User className="h-4 w-4 text-[#0065FF]" />
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <span className="text-sm font-medium block truncate leading-tight">{client.nome}</span>
              </div>
              <div className="flex items-center">
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <MoreVertical className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
}