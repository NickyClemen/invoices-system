import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { InvoiceRepository } from '../interfaces/InvoiceRepository.interface';
import { Invoice } from '../entities/Invoice.entity';
import { CreateInvoicePrimitives } from '../models/Invoice.model';

export class InvoiceTypeOrmRepository implements InvoiceRepository<Invoice> {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
  ) {}

  async createInvoice(invoice: CreateInvoicePrimitives): Promise<Invoice> {
    return await this.invoiceRepository.save(invoice);
  }

  listAllByCompanyId(companyUuid: string): Promise<Invoice[]> {
    return this.invoiceRepository.find({ where: { companyUuid } });
  }
}
