export class BaseException extends Error {
  constructor(errMsg: string) {
    super(errMsg);

    Object.setPrototypeOf(this, BaseException.prototype);
  }

  public getErrorMessage(): string {
    return this.message;
  }
}
