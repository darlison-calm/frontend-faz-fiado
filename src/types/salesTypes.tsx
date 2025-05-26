export type SaleData = {
    grossAmount: string,
    installments: Installment[],
    description: string,
    interestRate: string | undefined
}

export interface Installment {
    value: string;
    deadline: Date | undefined;
}
