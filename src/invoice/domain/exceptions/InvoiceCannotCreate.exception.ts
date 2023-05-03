import { BaseException } from '../../../../shared/domain/BaseException';

export class InvoiceCannotCreateException extends BaseException {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, InvoiceCannotCreateException.prototype);
  }
}
