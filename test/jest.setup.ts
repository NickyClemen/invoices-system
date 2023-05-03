import { TestClient } from './shared/api/TestClient';

import { InvoiceApiClient } from './shared/api/InvoiceApiClient';

import { CompanyMemoryService } from './src/company/application/CompanyMemory.service';
import { COMPANY_SERVICE } from '../src/company/domain/interfaces/CompanyService.interface';
import { CompanyMemoryRepository } from './src/company/domain/repositories/CompanyMemory.repository';
import { COMPANY_REPOSITORY } from '../src/company/domain/interfaces/CompanyRepository.interface';

import { CompanyFinderService } from '../src/company/application/usecases/CompanyFinder.service';
import { CreateAccountStatementService } from '../src/invoice/application/usecases/CreateAccountStatement.service';
import { CreateInvoiceController } from '../src/invoice/infraestructure/controllers/CreateInvoice.controller';
import { ListInvoicesNotExpiredController } from '../src/invoice/infraestructure/controllers/ListInvoicesNotExpired.controller';
import { CreateInvoiceService } from '../src/invoice/application/usecases/CreateInvoice.service';
import { InvoiceShowerService } from '../src/invoice/application/usecases/InvoiceShower.service';
import { InvoiceMemoryRepository } from './src/invoice/domain/repositories/InvoiceMemory.repository';
import { INVOICE_REPOSITORY } from '../src/invoice/domain/interfaces/InvoiceRepository.interface';
import { InvoiceMemoryService } from './src/invoice/application/InvoiceMemory.service';
import { INVOICE_SERVICE } from '../src/invoice/domain/interfaces/InvoiceService.interface';
import { CreateAccountStatementController } from '../src/invoice/infraestructure/controllers/CreateAccountStatement.controller';

let invoiceClient: TestClient;

export let invoiceApiClient: InvoiceApiClient;

beforeEach(async (): Promise<void> => {
  invoiceClient = await TestClient.getTestClient(
    TestClient.moduleBuilder({
      controllers: [
        CreateInvoiceController,
        ListInvoicesNotExpiredController,
        CreateAccountStatementController,
      ],
      imports: [
        {
          module: class CompanyFakeModule {},
          exports: [CompanyFinderService],
          providers: [
            {
              useClass: CompanyMemoryRepository,
              provide: COMPANY_REPOSITORY,
            },
            {
              useClass: CompanyMemoryService,
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
          useClass: InvoiceMemoryRepository,
          provide: INVOICE_REPOSITORY,
        },
        {
          useClass: InvoiceMemoryService,
          provide: INVOICE_SERVICE,
        },
      ],
    }),
  );

  invoiceApiClient = new InvoiceApiClient(invoiceClient);
});

afterEach(async (): Promise<void> => await invoiceClient.closeServer());
