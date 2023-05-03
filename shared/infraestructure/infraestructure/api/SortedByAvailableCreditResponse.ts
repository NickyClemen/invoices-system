import {
  Customer,
  CustomerPrimitives,
} from '../../../src/customers/domain/models/Customer.model';

export class SortedByAvailableCreditResponse {
  constructor(private customers: Customer[]) {}

  execute(): CustomerPrimitives[] {
    return this.customers
      .map((customer: Customer) => customer.toPrimitives())
      .sort(
        (a: CustomerPrimitives, b: CustomerPrimitives) =>
          a.availableCredit - b.availableCredit,
      );
  }
}
