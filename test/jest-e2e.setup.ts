import 'reflect-metadata';

import { TestClient } from './shared/api/TestClient';

import { TypeOrmModule } from '@nestjs/typeorm';

import { InvoiceApiClient } from './shared/api/InvoiceApiClient';
import { CreateInvoiceController } from '../src/invoice/infraestructure/controllers/CreateInvoice.controller';
import { ListInvoicesNotExpiredController } from '../src/invoice/infraestructure/controllers/ListInvoicesNotExpired.controller';
import { CreateAccountStatementController } from '../src/invoice/infraestructure/controllers/CreateAccountStatement.controller';
import { CompanyFinderService } from '../src/company/application/usecases/CompanyFinder.service';
import { COMPANY_REPOSITORY } from '../src/company/domain/interfaces/CompanyRepository.interface';
import { COMPANY_SERVICE } from '../src/company/domain/interfaces/CompanyService.interface';
import { CreateInvoiceService } from '../src/invoice/application/usecases/CreateInvoice.service';
import { InvoiceShowerService } from '../src/invoice/application/usecases/InvoiceShower.service';
import { CreateAccountStatementService } from '../src/invoice/application/usecases/CreateAccountStatement.service';
import { INVOICE_REPOSITORY } from '../src/invoice/domain/interfaces/InvoiceRepository.interface';
import { INVOICE_SERVICE } from '../src/invoice/domain/interfaces/InvoiceService.interface';
import { InvoiceService } from '../src/invoice/application/usecases/Invoice.service';
import { CompanyService } from '../src/company/application/usecases/Company.service';
import { CompanyTypeOrmRepository } from '../src/company/domain/repositories/Company.repository';
import { InvoiceTypeOrmRepository } from '../src/invoice/domain/repositories/InvoiceTypeOrm.repository';
import { Invoice } from '../src/invoice/domain/entities/Invoice.entity';
import { Company } from '../src/company/domain/entities/Company.entity';

import dataSource, {
  dataSourceOptions,
  initDatabase,
} from '../shared/infraestructure/database/data-source';

let invoiceClient: TestClient;

export let invoiceApiClient: InvoiceApiClient;

beforeEach(async () => {
  invoiceClient = await TestClient.getTestClient(
    TestClient.moduleBuilder({
      controllers: [
        CreateInvoiceController,
        ListInvoicesNotExpiredController,
        CreateAccountStatementController,
      ],
      imports: [
        TypeOrmModule.forFeature([Invoice, Company]),
        TypeOrmModule.forRoot(dataSourceOptions),
        {
          module: class CompanyFakeModule {},
          exports: [CompanyFinderService],
          providers: [
            {
              useClass: CompanyTypeOrmRepository,
              provide: COMPANY_REPOSITORY,
            },
            {
              useClass: CompanyService,
              provide: COMPANY_SERVICE,
            },
            CompanyFinderService,
          ],
        },
      ],
      providers: [
        CreateInvoiceService,
        InvoiceShowerService,
        CreateAccountStatementService,
        {
          useClass: InvoiceTypeOrmRepository,
          provide: INVOICE_REPOSITORY,
        },
        {
          useClass: InvoiceService,
          provide: INVOICE_SERVICE,
        },
      ],
    }),
  );

  invoiceApiClient = new InvoiceApiClient(invoiceClient);

  await initDatabase();
});

afterEach(async () => {
  await dataSource.query(`DROP TABLE "companies"`);
  await dataSource.query(`DROP TABLE "invoices"`);
  await dataSource.destroy();
});
