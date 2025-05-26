export const formatCurrency = (rawValue: string): string => {
    const cleanedValue = rawValue.replace(/[^0-9]/g, '');

    if (cleanedValue.length >= 14) {
        return rawValue;
    }

    const numericValue = Number.parseFloat(cleanedValue) / 100;

    if (Number.isNaN(numericValue)) {
        return "";
    }

    return numericValue.toLocaleString("pt-BR", {
        minimumFractionDigits: 2
    });
};

