import { invoiceApiClient } from '../../../jest.setup';
import {
  DefaultCompany,
  UndefinedCompany,
} from '../../../shared/mocks/companies';
import { HttpStatus } from '@nestjs/common';
import { CompanyMessages } from '../../../../src/company/domain/enums/CompanyMessages.enum';
import { DefaultInvoice } from '../../../shared/mocks/invoices';

describe.skip('CreateInvoiceController', () => {
  it('should error if params are invalid.', async () => {
    const response = await invoiceApiClient.createInvoice();

    const { status } = response;
    expect(status).toBe(HttpStatus.NOT_FOUND);
  });

  it('should error if company not found.', async () => {
    const response = await invoiceApiClient.createInvoice(
      UndefinedCompany.uuid,
      DefaultInvoice,
    );

    const { status, body } = response;
    expect(status).toBe(HttpStatus.CONFLICT);
    expect(body.message).toBe(CompanyMessages.NOT_FOUND);
  });

  it('create invoice if company is exists', async () => {
    const response = await invoiceApiClient.createInvoice(
      DefaultCompany.uuid,
      DefaultInvoice,
    );

    const { body, status } = response;

    expect(status).toBe(HttpStatus.CREATED);

    expect(body).toHaveProperty('uuid');
    expect(body).toHaveProperty('expirationDate');

    expect(body.amount).toEqual(DefaultInvoice.amount);
    expect(body.description).toEqual(DefaultInvoice.description);
    expect(body.companyUuid).toEqual(DefaultCompany.uuid);
  });
});
