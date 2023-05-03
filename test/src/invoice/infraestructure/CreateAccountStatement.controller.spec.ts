import { HttpStatus } from '@nestjs/common';
import { invoiceApiClient } from '../../../jest.setup';
import {
  DefaultCompany,
  UndefinedCompany,
} from '../../../shared/mocks/companies';
import { DefaultInvoice, SecondInvoice } from '../../../shared/mocks/invoices';
import { AccountStatementMessages } from '../../../../src/invoice/domain/enums/AccountStatementMessages.enum';

describe('CreateAccountStatementServiceController', () => {
  beforeEach(async () => {
    await invoiceApiClient.createInvoice(DefaultCompany.uuid, DefaultInvoice);
    await invoiceApiClient.createInvoice(DefaultCompany.uuid, SecondInvoice);
  });

  it('should error if params are invalid.', async () => {
    const response = await invoiceApiClient.createAccountStatement();

    const { status } = response;
    expect(status).toBe(HttpStatus.NOT_FOUND);
  });

  it('should error if company not found.', async () => {
    const response = await invoiceApiClient.createAccountStatement(
      UndefinedCompany.uuid,
    );

    const { status, body } = response;
    expect(status).toBe(HttpStatus.CONFLICT);
    expect(body.message).toBe(
      AccountStatementMessages.ACCOUNT_STATEMENT_NOT_CREATED,
    );
  });

  it('create invoice if company is exists', async () => {
    const response = await invoiceApiClient.createAccountStatement(
      DefaultCompany.uuid,
    );

    const { body, status } = response;

    expect(status).toBe(HttpStatus.CREATED);

    expect(body.companyUuid).toMatch(DefaultCompany.uuid);
    expect(body.invoices.length).toBe(2);
    expect(body.totalAmount).toEqual(
      body.invoices.reduce((a, b) => a + b.amount, 0),
    );
  });
});
