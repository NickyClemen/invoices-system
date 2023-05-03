import { CreateInvoicePrimitives, Invoice } from '../models/Invoice.model';
import { AccountStatement } from '../models/AccountStatement.model';

export const INVOICE_SERVICE = 'INVOICE SERVICE';

export interface InvoiceService {
  createInvoice(invoice: CreateInvoicePrimitives): Promise<Invoice>;
  listAllByCompanyId(companyId: string): Promise<Invoice[]>;
  listAllInvoicesByCompanyIdNotExpired(companyUuid: string): Promise<Invoice[]>;
  createAccountStatement(companyUuid: string): Promise<AccountStatement>;
}
