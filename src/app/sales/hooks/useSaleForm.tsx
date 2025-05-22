import { useState, useRef, useCallback } from "react";

export function useSaleForm() {
    const [finalAmount, setFinalAmount] = useState('');
    const [isValueValid, setIsValueValid] = useState(false);
    const [isInstallmentOpen, setIsInstallmentOpen] = useState(false);
    const [singleDueDate, setSingleDueDate] = useState<Date>();
    const [installmentsCount, setInstallmentsCount] = useState<string>("2")


    const handleTotalAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        let rawValue = e.target.value.replace(/[^\d]/g, "");
        let numericValue = parseFloat(rawValue) / 100;

        const isValid = !isNaN(numericValue) && numericValue > 0;
        setIsValueValid(isValid);

        const formatted = numericValue.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        setFinalAmount(formatted);
    }, []);

    const toggleInstallmentSection = useCallback(() => {
        if (isValueValid) {
            setIsInstallmentOpen(prev => !prev)
        }
    }, [isValueValid]);

    return {
        finalAmount,
        isValueValid,
        isInstallmentOpen,
        singleDueDate,
        setSingleDueDate,
        handleTotalAmountChange,
        toggleInstallmentSection,
        setInstallmentsCount,
        installmentsCount
    };
}