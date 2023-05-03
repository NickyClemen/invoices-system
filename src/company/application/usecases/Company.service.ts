import { CompanyService as CompanyServiceInterface } from '../../domain/interfaces/CompanyService.interface';
import { Inject, Injectable } from '@nestjs/common';
import {
  COMPANY_REPOSITORY,
  CompanyRepository,
} from '../../domain/interfaces/CompanyRepository.interface';
import { Company } from '../../domain/models/Company.model';
import { Company as CompanyEntity } from '../../domain/entities/Company.entity';

@Injectable()
export class CompanyService implements CompanyServiceInterface {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private companyRepository: CompanyRepository<CompanyEntity>,
  ) {}

  async findCompanyById(uuid: string): Promise<Company> {
    const [company] = await this.companyRepository.findBy({ where: { uuid } });

    return company.toDomain();
  }

  async filterInvoicesByCompanyUuid(uuid: string): Promise<Company> {
    const [company] = await this.companyRepository.findBy({
      where: { uuid },
      relations: ['invoice'],
    });

    return company.toDomain();
  }
}
