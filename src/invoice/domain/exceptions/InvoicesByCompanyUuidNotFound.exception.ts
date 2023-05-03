import { BaseException } from '../../../../shared/domain/BaseException';

export class InvoicesByCompanyUuidNotFoundException extends BaseException {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(
      this,
      InvoicesByCompanyUuidNotFoundException.prototype,
    );
  }
}
