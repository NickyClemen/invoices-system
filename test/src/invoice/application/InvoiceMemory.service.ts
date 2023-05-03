import { Inject, Injectable } from '@nestjs/common';

import { InvoiceService } from '../../../../src/invoice/domain/interfaces/InvoiceService.interface';
import {
  INVOICE_REPOSITORY,
  InvoiceRepository,
} from '../../../../src/invoice/domain/interfaces/InvoiceRepository.interface';
import {
  CreateInvoicePrimitives,
  Invoice,
} from '../../../../src/invoice/domain/models/Invoice.model';
import { AccountStatement } from '../../../../src/invoice/domain/models/AccountStatement.model';
import { Uuid } from '../../../../shared/domain/Uuid';

@Injectable()
export class InvoiceMemoryService implements InvoiceService {
  constructor(
    @Inject(INVOICE_REPOSITORY)
    private invoiceRepository: InvoiceRepository<Invoice>,
  ) {}

  async createInvoice(invoice: CreateInvoicePrimitives): Promise<Invoice> {
    return await this.invoiceRepository.createInvoice(invoice);
  }

  async listAllByCompanyId(companyUuid: string): Promise<Invoice[]> {
    return await this.invoiceRepository.listAllByCompanyId(companyUuid);
  }

  async listAllInvoicesByCompanyIdNotExpired(
    companyUuid: string,
  ): Promise<Invoice[]> {
    const invoices: Invoice[] = await this.listAllByCompanyId(companyUuid);

    return invoices.filter((invoice: Invoice) => invoice.invoiceNotExpired());
  }

  async createAccountStatement(companyUuid: string): Promise<AccountStatement> {
    const invoices: Invoice[] = await this.listAllInvoicesByCompanyIdNotExpired(
      companyUuid,
    );

    return new AccountStatement({
      companyUuid,
      invoices: invoices.map((invoices: Invoice) => invoices.toPrimitives()),
      totalAmount: invoices.reduce(
        (a: number, b: Invoice) => a + b.toPrimitives().amount,
        0,
      ),
    });
  }
}
