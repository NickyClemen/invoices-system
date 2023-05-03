import * as dotenv from 'dotenv';
import * as path from 'path';

import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const environtment = ['development', 'test'];
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.HOST,
  port: Number(process.env.PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.DATABASE,
  entities: [
    path.join(
      __dirname,
      '../../../src/company/domain/entities/*.entity{.ts,.js}',
    ),
    path.join(
      __dirname,
      '../../../src/invoice/domain/entities/*.entity{.ts,.js}',
    ),
  ],
  migrations: [path.join(__dirname, './migrations/*{.ts,.js}')],
  synchronize: environtment.includes(process.env.NODE_ENV),
};

const dataSource: DataSource = new DataSource(dataSourceOptions);

// export async function initDatabase() {
//   const customers: CustomerPrimitives[] = [
//     CustomerMother.create(DefaultCustomer),
//     ...CustomerMother.createRandomCustomers(),
//   ].map((customer: Customer) => customer.toPrimitives());
//
//   await dataSource
//     .initialize()
//     .then(() => {
//       console.log('Data Source has been initialized!');
//     })
//     .catch((err) => {
//       console.error('Error during Data Source initialization', err);
//     });
//
//   await dataSource
//     .createQueryBuilder()
//     .insert()
//     .into(CustomerEntity)
//     .values(customers)
//     .execute();
// }

export default dataSource;
