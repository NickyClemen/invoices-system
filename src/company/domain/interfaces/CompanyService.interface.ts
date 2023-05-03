import { Company, CreateCompanyPrimitives } from '../models/Company.model';

export const COMPANY_SERVICE = 'COMPANY SERVICE';

export interface CompanyService {
  findCompanyById(uuid: string): Promise<Company>;
  filterInvoicesByCompanyUuid(uuid: string): Promise<Company>;
}
