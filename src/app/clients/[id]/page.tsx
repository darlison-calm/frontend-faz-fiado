"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Phone, MapPin, Eye, EyeOff, Plus, Search, MoreHorizontal } from "lucide-react"
import { useParams } from "next/navigation"
import type { Client } from "../../../types/clientType"
import { loadClient } from "../services/clientService"
import { LoadingOverlay } from "@/components/ui/loadingOverlay"
import { useRouter } from "next/navigation"
import { NewSaleForm } from "@/app/sales/new-sale-form"
interface Transaction {
    id: string
    amount: number
    date: string
    description?: string
    installment?: {
        current: number
        total: number
    }
    dueDate?: string
    paidAmount?: number
}


export default function ClientDetail() {
    const [hideValues, setHideValues] = useState(false)
    const [isNewSaleModalOpen, setIsNewSaleModalOpen] = useState(false);
    const [client, setClient] = useState<Client>()
    const { id } = useParams<{ id: string }>()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    useEffect(() => {
        if (id) {
            const fetchClient = async () => {
                setIsLoading(true)
                try {
                    const fetchedClient = await loadClient(Number(id))
                    setClient(fetchedClient)
                } catch (error) {
                    console.error("Erro ao carregar cliente:", error)
                } finally {
                    setIsLoading(false)
                }
            }

            fetchClient()
        }
    }, [id])

    const transactions: Transaction[] = [
        {
            id: "1",
            amount: 10.0,
            date: "05/05/2025 17:49",
        },
        {
            id: "2",
            amount: 25.0,
            date: "04/05/2025 22:32",
            description: "Top",
            installment: {
                current: 2,
                total: 2,
            },
            dueDate: "03/06/2025",
        },
        {
            id: "3",
            amount: 25.0,
            date: "04/05/2025 22:32",
            description: "Top",
            installment: {
                current: 1,
                total: 2,
            },
            dueDate: "09/05/2025",
            paidAmount: 15.0,
        },
    ]
    if (!client) return null

    if (isLoading) {
        return <LoadingOverlay />
    }


    return (
        <div className="flex flex-col h-screen">
            <div className="bg-[var(--highlight)] text-white pb-3">
                <div className="flex justify-between items-center px-4 pt-3 pb-2">
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => router.push("/clients")}
                            className="rounded-full hover:bg-white/10 transition-colors mr-2"
                        >
                            <ArrowLeft className="h-5 w-5 text-white" />
                        </button>
                        <h1 className="text-2xl sm:text-2xl font-bold">{client.fullName}</h1>
                    </div>

                    <button className="flex items-center text-white/80 text-xs" onClick={() => setHideValues(!hideValues)}>
                        {hideValues ? (
                            <>
                                <Eye className="h-3.5 w-3.5 mr-1" />
                                <span>Mostrar valores</span>
                            </>
                        ) : (
                            <>
                                <EyeOff className="h-3.5 w-3.5 mr-1" />
                                <span className="font-bold">Ocultar valores</span>
                            </>
                        )}
                    </button>
                </div>

                <div className="px-4 pb-5 sm:pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-start">
                        <div className="flex-1 flex flex-col sm:flex-row sm:justify-between">
                            <div className="text-white text-center sm:text-left">
                                {client.phoneNumber && (
                                    <div className="flex items-center mt-1 justify-center sm:justify-start">
                                        <Phone className="h-3.5 w-3.5 mr-1.5" />
                                        <span className="text-sm">{client.phoneNumber}</span>
                                    </div>
                                )}

                                {client.address && (
                                    <div className="flex items-center mt-1 justify-center sm:justify-start">
                                        <MapPin className="h-3.5 w-3.5 mr-1.5" />
                                        <span className="text-sm">{client.address}</span>
                                    </div>
                                )}

                                {client.observation && (
                                    <div className="mt-1.5 text-white/80 text-xs sm:text-sm">{client.observation}</div>
                                )}
                            </div>

                            <div className="mt-3 sm:mt-0 sm:ml-4 flex flex-col items-center sm:items-end sm:justify-start">
                                <div className="text-center sm:text-right">
                                    <p className="text-white/80 text-xs font-bold">Valor a receber</p>
                                    <p className="text-2xl sm:text-3xl font-bold text-white">{hideValues ? "R$ ••••" : `R$500`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-[#F7F9FC] rounded-t-3xl -mt-6 flex flex-col">
                <div className="p-3 sm:p-4 border-b border-[#E1E8F0]">
                    <h2 className="text-base sm:text-lg font-medium text-center text-[#2D3748] mb-3">Lançamentos</h2>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-[#6B7A99]" />
                        </div>
                        <input
                            type="text"
                            placeholder="Pesquisa"
                            className="block w-full pl-9 sm:pl-10 pr-3 py-1.5 sm:py-2 border border-[#E1E8F0] rounded-lg bg-white focus:ring-[#0065FF] focus:border-[#0065FF] outline-none text-sm"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {transactions.map((transaction) => (
                        <div key={transaction.id} className="border border-gray-200 p-3 sm:p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-lg sm:text-xl font-medium text-[#0065FF]">
                                        {hideValues ? "R$ ••••" : `R$ ${transaction.amount.toFixed(2)}`}
                                    </div>

                                    {transaction.installment && (
                                        <div className="flex items-center text-[#718096] mt-0.5">
                                            <span className="text-sm">
                                                {transaction.installment.current}/{transaction.installment.total} - {transaction.description}
                                            </span>
                                        </div>
                                    )}

                                    {transaction.dueDate && (
                                        <div className="text-xs sm:text-sm text-[#718096]">Vencimento: {transaction.dueDate}</div>
                                    )}

                                    {transaction.paidAmount && (
                                        <div className="text-xs sm:text-sm text-[#718096] mt-0.5">
                                            {hideValues ? "R$ ••••" : `R$ ${transaction.paidAmount.toFixed(2)}`}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center">
                                    <div className="text-xs sm:text-sm text-[#718096]">{transaction.date}</div>
                                    <button className="p-1 ml-1 sm:ml-2">
                                        <MoreHorizontal className="h-4 w-4 sm:h-5 sm:w-5 text-[#6B7A99]" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6">
                <button onClick={() => setIsNewSaleModalOpen(true)} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-[#0057DB] to-[#0065FF] flex items-center justify-center shadow-lg hover:from-[#004FC7] hover:to-[#005AE6] transition-colors">
                    <Plus className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </button>
            </div>

            <NewSaleForm isOpen={isNewSaleModalOpen} onClose={() => setIsNewSaleModalOpen(false)} />

        </div>
    )
}
