import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from '../../domain/entities/address.entity';
import { ContactsEntity } from '../../domain/entities/contacts.entity';
import { PhoneEntity } from '../../domain/entities/phone.entity';
import { ContactsRepository } from './../../infrastructure/repository/contacs.repository';
import { ContactsService } from './contacts.service';

describe('ContactsService', () => {
  let service: ContactsService;
  const contactMock = {
    id: 1,
    name: 'alfredooo',
    lastName: 'alfred',
    documentType: 'CUIT',
    documentNumber: 1111111,
    age: 22,
    email: 'alfred1@email',
    phone: [
      {
        home: '444444',
        mobile: '13123',
      },
    ],
    address: [
      {
        location: 'glew',
        hight: 'casa 1444',
        street: 'calle 441',
      },
      {
        location: 'guernica',
        hight: 'casa siempre 2',
        description: 'algo',
        street: 'calle glew 3',
      },
    ],
  };
  const expected = {
    id: expect.any(Number),
    name: expect.any(String),
    lastName: expect.any(String),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'sqlite',
            database: 'database.sqlite',
            entities: [ContactsEntity, AddressEntity, PhoneEntity],
            synchronize: true,
          }),
        }),
        TypeOrmModule.forFeature([ContactsEntity, AddressEntity, PhoneEntity]),
      ],
      providers: [
        ContactsService,
        {
          provide: 'CONTACT_REPOSITORY',
          useClass: ContactsRepository,
        },
      ],
    }).compile();

    service = module.get<ContactsService>(ContactsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('create a contact', async () => {
    const contact = await service.create(contactMock);

    expect(contact).toMatchObject(expected);
  });
  it('find single user', async () => {
    const contact = await service.findOne({
      where: { email: 'alfred1@email' },
    });
    expect(contact).toMatchObject(expected);
  });
  it('update contact', async () => {
    const contact = await service.update(1, { name: 'alfred' });
    expect(contact.name).toEqual('alfred');
  });
  it('get all contacts', async () => {
    const contacts = await service.findAll({});

    expect(contacts[0]).toMatchObject(expected);
  });
});
