import { SaleData } from '@/types/salesTypes';
import { addDays } from 'date-fns';

export const SALE_FORM_DEFAULTS: SaleData = {
  totalAmount: '',
  installments: [
    {
      value: '00,00',
      deadline: addDays(new Date(), 30)
    }
  ],
  description: ''
};

export const MAX_AMOUNT_LENGTH = 14;

