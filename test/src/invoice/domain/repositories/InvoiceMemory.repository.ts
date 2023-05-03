import { Injectable } from '@nestjs/common';

import { InvoiceObjectMother } from '../models/InvoiceObjectMother';
import { InvoiceRepository } from '../../../../../src/invoice/domain/interfaces/InvoiceRepository.interface';
import {
  CreateInvoicePrimitives,
  Invoice,
} from '../../../../../src/invoice/domain/models/Invoice.model';

@Injectable()
export class InvoiceMemoryRepository implements InvoiceRepository<Invoice> {
  private invoices: Invoice[];
  constructor() {
    this.invoices = InvoiceObjectMother.createRandomInvoices();
  }
  async createInvoice(invoice: CreateInvoicePrimitives): Promise<Invoice> {
    const newInvoice: Invoice = InvoiceObjectMother.create(invoice);
    this.invoices.push(newInvoice);

    return newInvoice;
  }

  async listAllByCompanyId(companyUuid: string): Promise<Invoice[]> {
    return this.invoices.filter(
      (invoice: Invoice): boolean =>
        invoice.toPrimitives().companyUuid === companyUuid,
    );
  }
}
