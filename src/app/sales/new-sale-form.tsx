import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { DialogHeader } from "../../components/ui/dialog";
import { useCallback, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronUp, ToggleLeft } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import { format } from "date-fns";

export interface SaleData {
    value: number
    description: string
    installments: number
    installmentValue: number
}

export interface SaleFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export function NewSaleForm({ isOpen, onClose }: SaleFormProps) {
    const finalAmountRef = useRef('');
    const [isValueValid, setIsValueValid] = useState(false);
    const [isInstallmentOpen, setIsInstallmentOpen] = useState(false);
    const [singleDueDate, setSingleDueDate] = useState<Date>();


    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        finalAmountRef.current = value;

        const num = Number.parseFloat(value);
        const valid = value !== '' && !isNaN(num) && num > 0;
        setIsValueValid(valid);
    }, []);

    const toggleInstallmentSection = () => {
        if (isValueValid) {
            setIsInstallmentOpen(prev => !prev)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-full h-full sm:max-w-lg sm:h-auto flex flex-col justify-between bg-red-50">
                <DialogHeader>
                    <DialogTitle>Novo Lançamento</DialogTitle>
                </DialogHeader>

                <form className="space-y-4 flex-1 flex flex-col bg-red-50">
                    <div>
                        <label htmlFor="totalValue" className="block text-sm font-medium text-gray-500 mb-1">
                            Valor
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="totalValue"
                                name="totalValue"
                                onChange={handleChange}
                                placeholder="50,00"
                                className="block w-full px-3 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-[#0065FF] focus:border-[#0065FF] text-sm bg-gray-100"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-500 mb-1">
                            Descrição da venda
                        </label>
                        <textarea
                            id="description"
                            rows={3}
                            className="block w-full px-3 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-[#0065FF] focus:border-[#0065FF] text-sm"
                            placeholder="Descrição"
                        />
                    </div>

                    {!isInstallmentOpen && (
                        <div>
                            <label htmlFor="dueDate" className="block text-sm font-medium text-[#0065FF] mb-1">
                                Data do vencimento
                            </label>
                            <DatePicker
                                date={singleDueDate}
                                setDate={setSingleDueDate}
                            />
                        </div>
                    )}

                    <div className="pt-2 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={toggleInstallmentSection}
                            disabled={!isValueValid}
                            className={`flex w-full justify-between items-center text-left focus:outline-none py-2 ${isValueValid ? "text-[#0065FF]" : "text-gray-400 cursor-not-allowed"
                                }`}
                        >
                            <span className="text-base font-medium">Parcelamento</span>
                            {isInstallmentOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </button>
                        {!isValueValid && (
                            <p className="text-xs text-gray-500 mt-1">Informe um valor válido para habilitar o parcelamento</p>
                        )}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}