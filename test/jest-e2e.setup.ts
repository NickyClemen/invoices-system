import 'reflect-metadata';

import { TestClient } from './shared/api/TestClient';
import { ApiClient } from './shared/api/ApiClient';

import { CustomerEntity } from '../src/customers/domain/entities/Customer.entity';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AddCreditCustomerController } from '../src/customers/infraestructure/controllers/AddCreditCustomer.controller';
import { ListAllCustomersController } from '../src/customers/infraestructure/controllers/ListAllCustomers.controller';
import { CUSTOMER_REPOSITORY } from '../src/customers/domain/interfaces/CustomerRepository.interface';
import { CustomerService } from '../src/customers/application/usecases/Customer.service';
import { CUSTOMER_SERVICE } from '../src/customers/domain/interfaces/CustomerService.interface';
import { AddCreditCustomerService } from '../src/customers/application/usecases/AddCreditCustomer.service';
import { CustomerFinder } from '../src/customers/application/usecases/CustomerFinder.service';
import { CustomerTypeOrmRepository } from '../src/customers/domain/interfaces/CustomerTypeOrm.repository';

import dataSource, {
  dataSourceOptions,
  initDatabase,
} from '../shared/infraestructure/database/data-source';

let client: TestClient;

export let apiClient: ApiClient;

beforeEach(async () => {
  const moduleRef = TestClient.moduleBuilder({
    imports: [
      TypeOrmModule.forFeature([CustomerEntity]),
      TypeOrmModule.forRoot(dataSourceOptions),
    ],
    controllers: [AddCreditCustomerController, ListAllCustomersController],
    providers: [
      {
        useClass: CustomerTypeOrmRepository,
        provide: CUSTOMER_REPOSITORY,
      },
      {
        useClass: CustomerService,
        provide: CUSTOMER_SERVICE,
      },
      AddCreditCustomerService,
      CustomerFinder,
    ],
  });

  client = await TestClient.getTestClient(moduleRef);
  apiClient = new ApiClient(client);

  await initDatabase();
});

afterEach(async () => {
  await dataSource.query(`DROP TABLE "customer_entity"`);
  await dataSource.destroy();
});
