import { DynamicModule } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './TypeOrmConfig.service';

export class TypeOrmClientFactory {
  static createTypeOrmConnection(): DynamicModule {
    return TypeOrmModule.forRootAsync(TypeOrmConfig.typeOrmConfiguration());
  }
}