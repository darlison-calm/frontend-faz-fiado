import { SaleData } from "@/types/salesTypes";
import { formatCurrency } from "@/utils/formatCurrency";
import { addDays } from "date-fns";
import { ChangeEvent, useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { number } from "zod";

export function useAddSaleForm() {
    const { register, setValue, control, handleSubmit, getValues, watch } = useForm<SaleData>({
        defaultValues: {
            grossAmount: '00,00',
            interestRate: '',
            installments: [{ value: '00,00', deadline: addDays(new Date(), 30) }],
            description: ''
        }
    });
    const grossAmount = watch("grossAmount");
    const interestRate = watch("interestRate");
    const [isInstallmentOpen, setIsInstallmentOpen] = useState(false);



    const isValidGrossAmount = useMemo(() => {
        return grossAmount && !isNaN(Number.parseFloat(grossAmount)) && Number.parseFloat(grossAmount) > 0
    }, [grossAmount])

    const toggleInstallmentSection = () => {
        if (isValidGrossAmount) {
            setIsInstallmentOpen(!isInstallmentOpen)
        }
    }

    const { fields, update } = useFieldArray({
        name: 'installments',
        control
    })

    const handleGrossAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatCurrency(event.target.value);
        setValue("grossAmount", formattedValue);
    }


    const submit = (formFields: SaleData) => {
        console.log({ ...formFields });
    }

    const setInstallmentDeadline = (index: number, date: Date | undefined) => {
        const installment = getValues(`installments.${index}`);
        update(index, {
            ...installment,
            deadline: date
        });
    };

    const formatInterestRate = (rawValue: string) => {
        if (!rawValue) return "";

        const numbers = rawValue.replace(/\D/g, "");
        if (!numbers) return "";

        return `${numbers}%`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const interestRate = formatInterestRate(e.target.value);
        setValue("interestRate", interestRate)
    };

    return {
        register,
        submit,
        handleGrossAmountChange,
        fields,
        handleSubmit,
        setInstallmentDeadline,
        isInstallmentOpen,
        toggleInstallmentSection,
        isValidGrossAmount,
        handleChange
    }
}