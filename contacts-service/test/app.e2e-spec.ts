import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AddressEntity } from '../src/contacts/domain/entities/address.entity';
import { ContactsEntity } from '../src/contacts/domain/entities/contacts.entity';
import { PhoneEntity } from '../src/contacts/domain/entities/phone.entity';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'sqlite',
            database: 'database.sqlite',
            entities: [ContactsEntity, AddressEntity, PhoneEntity],
            synchronize: false,
          }),
        }),
        TypeOrmModule.forFeature([ContactsEntity, AddressEntity, PhoneEntity]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
  it('/contacts (GET)', () => {
    return request(app.getHttpServer()).get('/contacts').expect(200);
  });
});
