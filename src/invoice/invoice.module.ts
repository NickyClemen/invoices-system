import { Module } from '@nestjs/common';

import { CreateInvoiceController } from './infraestructure/controllers/CreateInvoice.controller';
import { CompanyModule } from '../company/company.module';
import { CreateInvoiceService } from './application/usecases/CreateInvoice.service';

@Module({
  imports: [CompanyModule],
  controllers: [CreateInvoiceController],
  providers: [CreateInvoiceService],
})
export class InvoiceModule {}
