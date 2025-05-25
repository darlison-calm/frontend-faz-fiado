import { addDays } from "date-fns";
import { ChangeEvent } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { SaleData } from "../new-sale-form";

export function useAddSaleForm() {
    const { register, setValue, control, handleSubmit, getValues } = useForm<SaleData>({
        defaultValues: {
            totalAmount: '',
            installments: [{ value: '', deadline: addDays(new Date(), 30) }]
        }
    })

    const { fields, update } = useFieldArray({
        name: 'installments',
        control
    })
    const handleTotalAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
        const rawValue = event.target.value.replace(/[^0-9]/g, '');

        if (rawValue.length >= 14) {
            return;
        }
        const numericValue = (Number.parseFloat(rawValue) / 100)

        if (Number.isNaN(numericValue)) {
            setValue("totalAmount", "");
            return;
        }
        const formattedValue = numericValue.toLocaleString(
            "pt-BR",
            { minimumFractionDigits: 2 }
        );
        setValue("totalAmount", formattedValue);
    }

    const submit = (formFields: SaleData) => {
        console.log(formFields);
    }

    const setInstallmentDeadline = (index: number, date: Date | undefined) => {
        const currentField = getValues(`installments.${index}`);
        update(index, {
            ...currentField,
            deadline: date
        });
    };

    return {
        register, submit, handleTotalAmountChange, fields, handleSubmit, setInstallmentDeadline
    }
}