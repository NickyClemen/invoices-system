import { Inject, Injectable } from '@nestjs/common';
import {
  INVOICE_SERVICE,
  InvoiceService,
} from '../../domain/interfaces/InvoiceService.interface';
import {
  AccountStatement,
  AccountStatementPrimitives,
} from '../../domain/models/AccountStatement.model';
import { AccountStatementNotCreatedException } from '../../domain/exceptions/AccountStatementNotCreated.exception';
import { AccountStatementMessages } from '../../domain/enums/AccountStatementMessages.enum';
@Injectable()
export class CreateAccountStatementService {
  constructor(
    @Inject(INVOICE_SERVICE) private invoiceService: InvoiceService,
  ) {}

  async execute(
    uuid: string,
  ): Promise<AccountStatementNotCreatedException | AccountStatementPrimitives> {
    const accountStatement: AccountStatement =
      await this.invoiceService.createAccountStatement(uuid);

    if (accountStatement.accountStatementEmpty()) {
      return new AccountStatementNotCreatedException(
        AccountStatementMessages.ACCOUNT_STATEMENT_NOT_CREATED,
      );
    }

    return accountStatement.toPrimitives();
  }
}
