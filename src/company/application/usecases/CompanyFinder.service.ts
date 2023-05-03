import { Inject, Injectable } from '@nestjs/common';

import { Company, CompanyPrimitives } from '../../domain/models/Company.model';
import { CompanyNotFoundException } from '../../domain/exceptions/CompanyNotFound.exception';
import { CompanyMessages } from '../../domain/enums/CompanyMessages.enum';
import {
  COMPANY_SERVICE,
  CompanyService,
} from '../../domain/interfaces/CompanyService.interface';

@Injectable()
export class CompanyFinderService {
  constructor(
    @Inject(COMPANY_SERVICE) private companyService: CompanyService,
  ) {}

  async execute(
    uuid: string,
  ): Promise<CompanyPrimitives | CompanyNotFoundException> {
    const company: Company = await this.companyService.findCompanyById(uuid);

    if (!company) {
      return new CompanyNotFoundException(CompanyMessages.NOT_FOUND);
    }

    return company.toPrimitives();
  }
}
