import { initDatabase } from './data-source';

initDatabase()
  .then(() => console.log('insert records into customer_entity table'))
  .catch((err) => console.log((err as Error).message));
