import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { Company } from '../entities/Company.entity';
import {
  CompanyRepository,
  FindFilters,
} from '../interfaces/CompanyRepository.interface';

@Injectable()
export class CompanyTypeOrmRepository implements CompanyRepository<Company> {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}
  async findBy(findFilters: FindFilters): Promise<Company[]> {
    return await this.companyRepository.find(findFilters);
  }
}
