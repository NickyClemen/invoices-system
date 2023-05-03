import { Invoice, InvoicePrimitives } from './Invoice.model';
import { Uuid } from '../../../../shared/domain/Uuid';
import { Amount } from './Amount.model';

export type AccountStatementPrimitives = {
  companyUuid: string;
  invoices: InvoicePrimitives[];
  totalAmount: number;
};

export class AccountStatement {
  private companyUuid: Uuid;
  private invoices: Invoice[];
  private totalAmount: Amount;
  constructor(accountStatement: AccountStatementPrimitives) {
    this.companyUuid = new Uuid(accountStatement.companyUuid);
    this.invoices = accountStatement.invoices.map(
      (invoice: InvoicePrimitives) => Invoice.fromPrimitives(invoice),
    );
    this.totalAmount = new Amount(accountStatement.totalAmount);
  }
  accountStatementEmpty(): boolean {
    return this.invoices.length === 0 && this.totalAmount.getValue() === 0;
  }

  toPrimitives(): AccountStatementPrimitives {
    return {
      companyUuid: this.companyUuid.getValue(),
      invoices: this.invoices.map((invoice: Invoice) => invoice.toPrimitives()),
      totalAmount: this.totalAmount.getValue(),
    };
  }
}
