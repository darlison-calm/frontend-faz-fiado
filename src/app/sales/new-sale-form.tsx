import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import { ChangeEvent, useState } from "react";
import { addDays } from "date-fns";
import { useFieldArray, useForm } from "react-hook-form";
import { useAddSaleForm } from "./hooks/useAddSaleForm";


export interface SaleData {
    totalAmount: string
    description: string
    installments: Installment[]
}
export type Installment = {
    value: string
    deadline: Date | undefined
}
interface SaleFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export function NewSaleForm({ isOpen, onClose }: SaleFormProps) {
    const {
        submit,
        register,
        handleSubmit,
        handleTotalAmountChange,
        setInstallmentDeadline,
        fields,
        isInstallmentOpen,
        isValidTotalAmount,
        toggleInstallmentSection
    } = useAddSaleForm();


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-full sm:max-w-lg sm:h-auto max-h-screen flex flex-col justify-between ">
                <DialogHeader>
                    <DialogTitle>Nova Venda</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(submit)} className="space-y-4 flex-1 flex flex-col overflow-y-auto">
                    <div>
                        <label htmlFor="totalValue" className="block text-sm font-medium text-gray-500 mb-1">
                            Valor
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                {...register("totalAmount", { required: true, onChange: handleTotalAmountChange })}
                                maxLength={14}
                                inputMode="numeric"
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
                                date={fields[0].deadline}
                                setDate={date => setInstallmentDeadline(0, date)}
                            />
                        </div>)
                    }
                    <div className="pt-2 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={toggleInstallmentSection}
                            disabled={!isValidTotalAmount}
                            className={`flex w-full justify-between items-center text-left focus:outline-none py-2 ${isValidTotalAmount ? "text-[#0065FF]" : "text-gray-400 cursor-not-allowed"
                                }`}
                        >
                            <span className="text-base font-medium">Parcelamento</span>
                            {isInstallmentOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </button>
                    </div>
                    {isInstallmentOpen && (
                        <div className="space-y-4 pt-2">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="installmentsCount" className="block text-sm font-medium text-gray-500 mb-1">
                                        Quantidade de parcelas
                                    </label>
                                    <input
                                        type="text"
                                        id="installmentsCount"
                                        className={`block w-full px-3 py-3 border "border-red-500" : "border-gray-200"
                                            } rounded-lg shadow-sm focus:ring-[#0065FF] focus:border-[#0065FF] text-sm bg-gray-100`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="daysBetween" className="block text-sm font-medium text-gray-500 mb-1">
                                    Dias entre parcelas
                                </label>
                                <input
                                    type="text"
                                    id="daysBetween"
                                    className="block w-full px-3 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-[#0065FF] focus:border-[#0065FF] text-sm bg-gray-100"
                                />
                            </div>
                            {/* <div className={`p-3 rounded-md ${Math.abs(totalDiscrepancy) > 0.01 ? "bg-red-50" : "bg-blue-50"}`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    {Math.abs(totalDiscrepancy) > 0.01 ? (
                                        <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                                    ) : (
                                        <div className="h-4 w-4 bg-[#0065FF] rounded-full mr-2"></div>
                                    )}
                                    <span className="text-sm font-medium">
                                        {Math.abs(totalDiscrepancy) > 0.01
                                            ? "Valores das parcelas não correspondem ao total"
                                            : "Valores das parcelas correspondem ao total"}
                                    </span>
                                </div>
                                <span
                                    className={`text-sm font-medium ${Math.abs(totalDiscrepancy) > 0.01 ? "text-red-500" : "text-blue-600"}`}
                                >
                                    {currentInstallmentsTotal.toFixed(2)} / {finalAmount}
                                </span>
                            </div>

                        </div> */}
                            {fields.map((field, index) => (
                                <div key={index} className="space-y-2">
                                    <h3 className="text-[#0065FF] font-medium text-base">{index + 1}° PARCELA</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor={`installmentValue-${index}`} className="block text-xs text-gray-500 mb-1">
                                                Valor
                                            </label>
                                            <div className="relative">
                                                <input
                                                    key={field.id}
                                                    {...register(`installments.${index}.value`)}
                                                    type="text"
                                                    id={`installmentValue-${index}`}
                                                    className="block w-full px-3 py-3 border
                                                    rounded-lg shadow-sm focus:ring-[#0065FF] focus:border-[#0065FF] text-sm bg-blue-50"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor={`installmentDate-${index}`} className="block text-xs text-gray-500 mb-1">
                                                Data do vencimento
                                            </label>
                                            <DatePicker
                                                date={field.deadline}
                                                setDate={(date) => setInstallmentDeadline(index, date)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <button type="submit"> confirmar</button>
                </form>
            </DialogContent>
        </Dialog>
    );
}


// Função que  calcula o total atual somando os valores de todas as parcelas

// Função calcula a diferença entre o valor final esperado e a soma das parcelas atuais


// Sempre que o valor final, quantidade de parcelas ou intervalo de dias mudar,
// recalcula as parcelas

// useEffect(() => {
//     // Se nenhuma informação foi preenchida, limpa as parcelas

//     // Converte as entradas para números

//     // Verifica se os dados são inválidos (não numéricos ou quantidade de parcelas <= 0)

//     // Se os dados forem inválidos, limpa as parcelas e sai
//     // Calcula o valor base de cada parcela

//     // Converte valores para centavos

//     // Calcula o resto (diferença) que precisa ser distribuído para ajustar o total final
//     // Cria as parcelas com os valores e datas de vencimento

//     // Atualiza o estado com os novos detalhes das parcelas

// }, [finalAmount, installmentsCount, daysBetween])


// // Lidar com a alteração do valor da parcela
// const handleInstallmentValueChange = (index: number, newValue: string) => {
//     const input = newValue.replace(/[^\d]/g, "")

//     if (input === "") {
//         const newDetails = [...installmentDetails]
//         newDetails[index].value = 0
//         newDetails[index].isEdited = true
//         setInstallmentDetails(newDetails)
//         return
//     }
//     const totalValue = Number.parseFloat(finalAmount)
//     if (!finalAmount || Number.isNaN(totalValue)) return

//     const number = Number.parseInt(input, 10) / 100
//     const newDetails = [...installmentDetails]

//     // Armazene o valor anterior para calcular a diferença
//     const previousValue = newDetails[index].value

//     // Atualiza o valor e marca como editado
//     newDetails[index].value = number
//     newDetails[index].isEdited = true

//     // Calcula o quanto precisa ser distruibuido nas outras parcelas
//     const difference = previousValue - number

//     // Busca parcelas não editadas para distruibuir a diferença
//     const uneditedIndices = newDetails
//         .map((detail, i) => (i !== index && !detail.isEdited ? i : -1))
//         .filter((i) => i !== -1)


//     // Se tiver parcelas não editadas, distribua a diferença entre elas
//     if (uneditedIndices.length > 0) {
//         const adjustmentPerInstallment = difference / uneditedIndices.length

//         for (const i of uneditedIndices) {
//             newDetails[i].value += adjustmentPerInstallment
//         }
//     }
//     // Se todas as parcelas forem editadas, distribua entre todas, exceto a atual
//     else {
//         const otherIndices = newDetails.map((_, i) => (i !== index ? i : -1)).filter((i) => i !== -1)

//         if (otherIndices.length > 0) {
//             const adjustmentPerInstallment = difference / otherIndices.length

//             for (const i of otherIndices) {
//                 newDetails[i].value += adjustmentPerInstallment
//             }
//         }
//     }

//     // Arrendoda todos os valores das parcelas para 2 casas decimais
//     for (let i = 0; i < newDetails.length; i++) {
//         newDetails[i].value = Math.round(newDetails[i].value * 100) / 100
//     }

//     // Soma todas a parcelas e calcula se existe diferença da soma para o valor total
//     const currentTotal = newDetails.reduce((sum, detail) => sum + detail.value, 0)
//     const remainingDifference = totalValue - currentTotal

//     // Adicione qualquer diferença restante à última parcela que não é a atual


// }