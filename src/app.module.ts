import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { InvoiceModule } from './invoice/invoice.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [CompanyModule, InvoiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
