import { Inject, Injectable } from '@nestjs/common';

import { CompanyService } from '../../../../src/company/domain/interfaces/CompanyService.interface';
import {
  COMPANY_REPOSITORY,
  CompanyRepository,
} from '../../../../src/company/domain/interfaces/CompanyRepository.interface';
import { Company } from '../../../../src/company/domain/models/Company.model';

@Injectable()
export class CompanyMemoryService implements CompanyService {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private companyRepository: CompanyRepository<Company>,
  ) {}

  async findCompanyById(uuid: string): Promise<Company> {
    const [company] = await this.companyRepository.findBy({ where: { uuid } });

    return company;
  }

  filterInvoicesByCompanyUuid(uuid: string): Promise<Company> {
    return Promise.resolve(undefined);
  }
}
