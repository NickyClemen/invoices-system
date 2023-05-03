import { CreateInvoicePrimitives } from '../models/Invoice.model';

export const INVOICE_REPOSITORY = 'INVOICE REPOSITORY';
export interface InvoiceRepository<T> {
  createInvoice(invoice: CreateInvoicePrimitives): Promise<T>;
  listAllByCompanyId(companyId: string): Promise<T[]>;
}
