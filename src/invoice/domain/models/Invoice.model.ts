import { Uuid } from '../../../../shared/domain/Uuid';

import { Amount } from './Amount.model';
import { Description } from './Description.model';
import { ExpirationDate } from './ExpirationDate.model';

export type InvoicePrimitives = {
  uuid: string;
  amount: number;
  expirationDate: Date;
  description: string;
  companyUuid: string;
};

export type CreateInvoicePrimitives = Omit<InvoicePrimitives, 'uuid'>;
export type PartialInvoicePrimitives = Omit<
  CreateInvoicePrimitives,
  'expirationDate'
>;
export class Invoice {
  private uuid: Uuid;
  private amount: Amount;
  private expirationDate: ExpirationDate;
  private description: Description;
  private companyUuid: Uuid;
  constructor(invoice: InvoicePrimitives) {
    this.uuid = new Uuid(invoice.uuid);
    this.amount = new Amount(invoice.amount);
    this.expirationDate = new ExpirationDate(invoice.expirationDate);
    this.description = new Description(invoice.description);
    this.companyUuid = new Uuid(invoice.companyUuid);
  }
  static fromPrimitives(invoice: InvoicePrimitives): Invoice {
    return new Invoice(invoice);
  }
  toPrimitives(): InvoicePrimitives {
    return {
      uuid: this.uuid.getValue(),
      amount: this.amount.getValue(),
      expirationDate: this.expirationDate.getExpirationDateAsJsDate(),
      description: this.description.getValue(),
      companyUuid: this.companyUuid.getValue(),
    };
  }

  invoiceNotExpired(): boolean {
    return this.expirationDate.isExpired();
  }
}
