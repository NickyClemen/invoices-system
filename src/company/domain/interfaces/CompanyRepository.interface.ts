import { CompanyPrimitives } from '../models/Company.model';

export const COMPANY_REPOSITORY = 'COMPANY REPOSITORY';

export type FindFilters = {
  where: Partial<CompanyPrimitives>;
  relations?: string[];
};

export interface CompanyRepository<T> {
  findBy(findFilters: FindFilters): Promise<T[]>;
}
