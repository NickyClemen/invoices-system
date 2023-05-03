import { faker } from '@faker-js/faker';

import {
  Invoice,
  CreateInvoicePrimitives,
} from '../../../../../src/invoice/domain/models/Invoice.model';
import { ExpirationDate } from '../../../../../src/invoice/domain/models/ExpirationDate.model';

export class InvoiceObjectMother {
  static create(
    invoice: CreateInvoicePrimitives = {
      amount: Number(faker.finance.amount()),
      description: faker.finance.transactionDescription(),
      companyUuid: faker.datatype.uuid(),
      expirationDate: ExpirationDate.newExpirationDate().toJSDate(),
    },
  ): Invoice {
    return new Invoice({
      uuid: faker.datatype.uuid(),
      ...invoice,
    });
  }

  static createRandomInvoices(): Invoice[] {
    return Array(10)
      .fill(null)
      .map(() => InvoiceObjectMother.create());
  }
}
