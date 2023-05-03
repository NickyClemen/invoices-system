import { DateTime, Duration } from 'luxon';
export class ExpirationDate {
  private static currentDate: DateTime = DateTime.now();
  private expirationDate: DateTime;
  constructor(expirationDate: Date) {
    this.expirationDate = DateTime.fromJSDate(expirationDate);
  }
  static newExpirationDate(): DateTime {
    return ExpirationDate.currentDate.plus({ months: 3 });
  }
  getExpirationDate(): DateTime {
    return this.expirationDate;
  }
  getExpirationDateAsJsDate(): Date {
    return this.expirationDate.toJSDate();
  }
  isExpired(): boolean {
    const calculateDiffBetweenDates: Duration = this.expirationDate.diff(
      ExpirationDate.currentDate,
      'days',
    );

    return calculateDiffBetweenDates.toObject().days >= 0;
  }
}
