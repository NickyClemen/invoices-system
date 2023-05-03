import { Inject } from '@nestjs/common';

import {
  INVOICE_SERVICE,
  InvoiceService,
} from '../../domain/interfaces/InvoiceService.interface';
import {
  Invoice,
  InvoicePrimitives,
  PartialInvoicePrimitives,
} from '../../domain/models/Invoice.model';
import { ExpirationDate } from '../../domain/models/ExpirationDate.model';
import { Company } from '../../../company/domain/models/Company.model';
import { CompanyNotFoundException } from '../../../company/domain/exceptions/CompanyNotFound.exception';
import { InvoiceCannotCreateException } from '../../domain/exceptions/InvoiceCannotCreate.exception';
import { InvoiceMessages } from '../../domain/enums/InvoiceMessages.enum';
import { CompanyFinderService } from '../../../company/application/usecases/CompanyFinder.service';

export type CreateInvoiceServiceResponse =
  | CompanyNotFoundException
  | InvoicePrimitives
  | InvoiceCannotCreateException;

export class CreateInvoiceService {
  constructor(
    @Inject(CompanyFinderService) private companyFinderService,
    @Inject(INVOICE_SERVICE) private invoiceService: InvoiceService,
  ) {}

  async execute(
    partialInvoiceData: PartialInvoicePrimitives,
  ): Promise<CreateInvoiceServiceResponse> {
    const company: Company | CompanyNotFoundException =
      await this.companyFinderService.execute(partialInvoiceData.companyUuid);

    if (company instanceof CompanyNotFoundException) {
      return company;
    }

    const invoice: Invoice = await this.invoiceService.createInvoice({
      ...partialInvoiceData,
      expirationDate: ExpirationDate.newExpirationDate().toJSDate(),
    });

    if (!invoice) {
      return new InvoiceCannotCreateException(
        InvoiceMessages.NOT_CREATE_INVOICE,
      );
    }

    return invoice.toPrimitives();
  }
}
