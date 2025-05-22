import { ChangeEvent } from "react";

interface ValueInputProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    totalAmount: string
}

export function TotalAmountInput({ onChange, totalAmount }: ValueInputProps) {
    return (
        <div>
            <label htmlFor="totalValue" className="block text-sm font-medium text-gray-500 mb-1">
                Valor
            </label>
            <div className="relative">
                <input value={totalAmount}
                    type="text"
                    id="totalAmount"
                    name="totalAmount"
                    onChange={onChange}
                    placeholder="50,00"
                    className="block w-full px-3 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-[#0065FF] focus:border-[#0065FF] text-sm bg-gray-100"
                />
            </div>
        </div>
    );
}