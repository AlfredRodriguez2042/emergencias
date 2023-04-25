import { Test, TestingModule } from '@nestjs/testing';
import { ContactsController } from './contacts.controller';

describe('ContactsController', () => {
  let controller: ContactsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsController],
      providers: [
        {
          provide: 'CONTACT_SERVICE',
          useValue: {
            findAll: jest.fn((x) => x),
          },
        },
      ],
    }).compile();

    controller = module.get<ContactsController>(ContactsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
