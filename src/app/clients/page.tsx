"use client"

import clients from "@/app/clients/clients.json";
import {
  Search,
  Calendar,
  ArrowDownZA,
  ArrowUpAZ,
  Calculator,
  User
} from "lucide-react"
import { useState } from "react";
import ButtonWithIcon from "./components/buttonWithIcon";

export default function ClientsInteface() {
  const [isAlphaOrderUp, setAlphaOrder] = useState(true);

  function changeButtonOrder() {
    setAlphaOrder((prev) => !prev);
  }

  return (
    <div className="flex flex-col min-h-dvh">
      <div className="top flex flex-col p-2 space-y-3 sticky top-0 bg-white z-10">
        {/* Search filter bar */}
        <div className="relative">
          <input type="text" className="block w-full pl-9 py-1 pr-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-[#0066ff] focus:border-[#0066ff] outline-none" placeholder="Buscar cliente..." />
          <div className="absolute left-2 bottom-[9px]">
            <Search className="h-4 text-gray-400 mr-2" />
          </div>
        </div>
        {/* Top options */}
        <div className="flex justify-between gap-1">
          <ButtonWithIcon label="Data">
            <Calendar className="h-5 mr-1" style={{ color: 'var(--highlight)' }} />
          </ButtonWithIcon>
          <ButtonWithIcon onClick={changeButtonOrder} label="Ordem">
            {isAlphaOrderUp ? (
              <ArrowUpAZ className="h-5 text-white mr-1" style={{ color: 'var(--highlight)' }} />
            ) : (
              <ArrowDownZA className="h-5 text-white mr-1" style={{ color: 'var(--highlight)' }} />
            )}
          </ButtonWithIcon>
          <ButtonWithIcon label="Calculadora">
            <Calculator className="h-5 mr-1" style={{ color: 'var(--highlight)' }} />

          </ButtonWithIcon>
        </div>
        {/* Clients list */}
        <div className="flex flex-col gap-1 py-1">
          {clients.map((client) => (
            <div
              key={client.id}
              className="flex flex-1 items-center py-1.5 px-2 bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-md transition-shadow w-full"
            >
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-[#0066ff]" />
              </div>
              <div className="ml-2 flex-1 min-w-0">
                <span className="text-xs font-medium block truncate leading-tight">{client.nome}</span>
              </div>
              <div className="flex items-center">
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <Calculator className="h-3.5 w-3.5 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}

