import { BaseException } from '../../../../shared/domain/BaseException';

export class CompanyNotFoundException extends BaseException {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CompanyNotFoundException.prototype);
  }
}
