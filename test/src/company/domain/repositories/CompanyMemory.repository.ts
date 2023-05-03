import { Injectable } from '@nestjs/common';

import { Company } from '../../../../../src/company/domain/models/Company.model';
import {
  CompanyRepository,
  FindFilters,
} from '../../../../../src/company/domain/interfaces/CompanyRepository.interface';
import { CompanyObjectMother } from '../models/CompanyObjectMother';
import { DefaultCompany } from '../../../../shared/mocks/companies';

@Injectable()
export class CompanyMemoryRepository implements CompanyRepository<Company> {
  private companies: Company[];

  constructor() {
    this.companies = [
      CompanyObjectMother.create(DefaultCompany),
      ...CompanyObjectMother.createRandomCompanies(),
    ];
  }

  async findBy(findFilters: FindFilters): Promise<Company[]> {
    const { where, relations } = findFilters;

    return this.companies.filter((company: Company) => {
      for (const [key, value] of Object.entries(where)) {
        return company.toPrimitives()[key] === value;
      }
    });
  }
}
