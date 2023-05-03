import { faker } from '@faker-js/faker';

import {
  Company,
  CompanyPrimitives,
  CreateCompanyPrimitives,
} from '../../../../../src/company/domain/models/Company.model';

export class CompanyObjectMother {
  static create(
    company: CreateCompanyPrimitives = {
      uuid: faker.datatype.uuid(),
      name: faker.company.name(),
    },
  ): Company {
    return new Company(company as CompanyPrimitives);
  }

  static createRandomCompanies(): Company[] {
    return Array(10)
      .fill(null)
      .map(() => CompanyObjectMother.create());
  }
}
