import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactsService } from './application/service/contacts.service';
import { AddressEntity } from './domain/entities/address.entity';
import { ContactsEntity } from './domain/entities/contacts.entity';
import { PhoneEntity } from './domain/entities/phone.entity';
import { ContactKeys } from './domain/ports';
import { ContactsController } from './infrastructure/controllers/contacts.controller';
import { ContactsRepository } from './infrastructure/repository/contacs.repository';
import { SearchController } from './infrastructure/controllers/search.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactsEntity, AddressEntity, PhoneEntity]),
  ],
  providers: [
    { useClass: ContactsService, provide: ContactKeys.CONTACT_SERVICE },
    { useClass: ContactsRepository, provide: ContactKeys.CONTACT_REPOSITORY },
  ],
  controllers: [ContactsController, SearchController],
})
export class ContactsModule {}
