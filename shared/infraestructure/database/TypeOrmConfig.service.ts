import * as path from 'path';

import { ConfigModule, ConfigService } from '@nestjs/config';

import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export class TypeOrmConfig {
  static typeOrmConfiguration(): TypeOrmModuleAsyncOptions {
    return {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        ...TypeOrmConfig.createTypeOrmOptions(configService),
      }),
    };
  }

  static createTypeOrmOptions(
    configService: ConfigService,
  ): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configService.get<string>('HOST'),
      port: configService.get<number>('PORT'),
      username: configService.get<string>('POSTGRES_USER'),
      password: configService.get<string>('POSTGRES_PASSWORD'),
      database: configService.get<string>('DATABASE'),
      logging: true,
      entities: [path.join(__dirname, '../../**/**/*.entity{.ts,.js}')],
      migrations: [path.join(__dirname, './**/*{.ts,.js}')],
      synchronize: TypeOrmConfig.setSyncronize(
        configService.get<string>('NODE_ENV'),
      ),
    };
  }

  static setSyncronize(nodeEnv: string): boolean {
    const stagging: string[] = ['development', 'test'];

    return stagging.includes(nodeEnv);
  }
}