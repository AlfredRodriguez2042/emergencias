import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    // return {
    //   type: 'sqlite',
    //   database: 'database.sqlite',
    //   entities: ['dist/**/*.entity.{ts,js}'],
    //   synchronize: true,
    // };
    return {
      type: 'postgres',
      host: this.config.get<string>('NEST_DB_HOST') || '0.0.0.0',
      port: this.config.get<number>('NEST_DB_PORT'),
      database: this.config.get<string>('NEST_DB_NAME'),
      username: this.config.get<string>('NEST_DB_USER'),
      password: this.config.get<string>('NEST_DB_PASSWORD'),
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/migrations/*.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',
      logger: 'file',
      synchronize: this.config.get('NEST_DB_SYNC') === 'true', // never use TRUE in production!
      ssl: this.config.get('NEST_DB_SSL') === 'true',
    };
  }
}
