import { Inject } from '@nestjs/common';

import {
  INVOICE_SERVICE,
  InvoiceService,
} from '../../domain/interfaces/InvoiceService.interface';
import { Invoice, InvoicePrimitives } from '../../domain/models/Invoice.model';

import { InvoiceMessages } from '../../domain/enums/InvoiceMessages.enum';
import { InvoicesByCompanyUuidNotFoundException } from '../../domain/exceptions/InvoicesByCompanyUuidNotFound.exception';
export class InvoiceShowerService {
  constructor(
    @Inject(INVOICE_SERVICE) private invoiceService: InvoiceService,
  ) {}

  async execute(
    companyUuid: string,
  ): Promise<InvoicePrimitives[] | InvoicesByCompanyUuidNotFoundException> {
    const invoices: Invoice[] =
      await this.invoiceService.listAllInvoicesByCompanyIdNotExpired(
        companyUuid,
      );

    if (!invoices || invoices.length === 0) {
      return new InvoicesByCompanyUuidNotFoundException(
        InvoiceMessages.INVOICES_BY_COMPANY_NOT_FOUND,
      );
    }

    return invoices.map((invoice: Invoice) => invoice.toPrimitives());
  }
}
