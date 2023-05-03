import { invoiceApiClient } from '../../../jest.setup';
import {
  DefaultCompany,
  UndefinedCompany,
} from '../../../shared/mocks/companies';
import { HttpStatus } from '@nestjs/common';

import { DefaultInvoice } from '../../../shared/mocks/invoices';
import { InvoiceMessages } from '../../../../src/invoice/domain/enums/InvoiceMessages.enum';

describe('ListInvoicesNotExpiredController', () => {
  beforeEach(async () => {
    await invoiceApiClient.createInvoice(DefaultCompany.uuid, DefaultInvoice);
  });

  it('should error if params are invalid.', async () => {
    const response = await invoiceApiClient.listAllInvoicesByCompany();

    const { status } = response;
    expect(status).toBe(HttpStatus.NOT_FOUND);
  });

  it('should error if company not found.', async () => {
    const response = await invoiceApiClient.listAllInvoicesByCompany(
      UndefinedCompany.uuid,
    );

    const { status, body } = response;
    expect(status).toBe(HttpStatus.NOT_FOUND);
    expect(body.message).toBe(InvoiceMessages.INVOICES_BY_COMPANY_NOT_FOUND);
  });

  it('list all invoices not expired by company uuid', async () => {
    const response = await invoiceApiClient.listAllInvoicesByCompany(
      DefaultCompany.uuid,
    );

    const { body, status } = response;
    expect(status).toBe(HttpStatus.OK);
    expect(body.length).toBeGreaterThan(0);
  });
});
