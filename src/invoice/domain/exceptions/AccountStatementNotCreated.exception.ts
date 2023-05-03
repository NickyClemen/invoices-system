import { BaseException } from '../../../../shared/domain/BaseException';

export class AccountStatementNotCreatedException extends BaseException {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, AccountStatementNotCreatedException.prototype);
  }
}
