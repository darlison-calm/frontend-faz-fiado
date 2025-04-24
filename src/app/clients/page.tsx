"use client"

import clients from "@/app/clients/clients.json";
import {
  Search,
  Calendar
} from "lucide-react"

export default function ClientsInteface() {
  
  return (
    <div className="flex flex-col min-h-dvh">
       {/* Search and filter bar */}
        <div className="top flex flex-col p-4 space-y-4 sticky top-0 bg-white z-10">
          <div className="relative">
            <input type="text" className="block w-full px-4 py-1 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#0066ff] focus:border-[#0066ff] outline-none" placeholder="Buscar cliente..." />
            <div className="absolute right-2 bottom-2">
              <Search className="h-5 text-gray-400"/>
            </div>
            </div>
          <div className="flex">
            <button className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <Calendar className="h-5" style={{ color: 'var(--highlight)' }} />
              <span className="ml-1">Data</span>
            </button>
            <div className="flex"></div>
            <div className="flex"></div>
          </div>
        </div>
    </div>  
  );

}

