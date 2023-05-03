import { CreateInvoiceDto } from '../../../src/invoice/infraestructure/dto/CreateInvoice.dto';

export const DefaultInvoice: CreateInvoiceDto = {
  amount: 10000,
  description: 'a fake invoice description',
};

export const SecondInvoice: CreateInvoiceDto = {
  amount: 20000,
  description: 'another fake invoice description',
};
