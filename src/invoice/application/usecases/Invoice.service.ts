import { Inject } from '@nestjs/common';

import { InvoiceService as InvoiceServiceInterface } from '../../domain/interfaces/InvoiceService.interface';

import {
  INVOICE_REPOSITORY,
  InvoiceRepository,
} from '../../domain/interfaces/InvoiceRepository.interface';
import { CreateInvoicePrimitives, Invoice } from '../../domain/models/Invoice.model';

export class InvoiceService implements InvoiceServiceInterface {
  constructor(
    @Inject(INVOICE_REPOSITORY)
    private invoiceRepository: InvoiceRepository<Invoice>,
  ) {}
  async createInvoice(invoice: CreateInvoicePrimitives): Promise<Invoice> {
    return this.invoiceRepository.createInvoice(invoice);
  }

  async listAllByCompanyId(companyId: string): Promise<Invoice[]> {
    return await this.invoiceRepository.listAllByCompanyId(companyId);
  }

  async listAllInvoicesByCompanyIdNotExpired(
    companyUuid: string,
  ): Promise<Invoice[]> {
    return await this.invoiceRepository.listAllByCompanyId(companyUuid);
  }
}
