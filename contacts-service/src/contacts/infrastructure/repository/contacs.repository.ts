import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { AddressEntity } from '../../domain/entities/address.entity';
import { ContactsEntity } from '../../domain/entities/contacts.entity';
import { PhoneEntity } from '../../domain/entities/phone.entity';
import { IContactRepository } from '../../domain/ports';

export class ContactsRepository implements IContactRepository {
  constructor(
    @InjectRepository(ContactsEntity)
    private readonly repository: Repository<ContactsEntity>,
    @InjectRepository(PhoneEntity)
    private readonly phoneRepository: Repository<PhoneEntity>,
    @InjectRepository(AddressEntity)
    private readonly AddressRepository: Repository<AddressEntity>,
  ) {}
  async findAll(options: FindManyOptions): Promise<ContactsEntity[]> {
    return await this.repository.find(options);
  }
  async findOne(query: FindOneOptions): Promise<ContactsEntity> {
    return await this.repository.findOne(query);
  }
  async findBy(query: FindOptionsWhere<ContactsEntity>) {
    return await this.repository.findBy(query);
  }
  async create(contact: any): Promise<any> {
    const Contact = this.repository.create(contact);
    return await this.repository.save(Contact);
  }

  async update(id: number, query: any): Promise<ContactsEntity> {
    const { address, phone, ...contact } = query;
    const findAndUpdate = await this.repository.update(id, { ...contact });
    const newAddress = address?.map((add) => ({ contact: id, ...add }));
    const newPhone = phone?.map((ph) => ({ contact: id, ...ph }));
    if (!findAndUpdate.affected) {
      throw new NotFoundException();
    }
    address && (await this.AddressRepository.save(newAddress));

    phone && (await this.phoneRepository.save(newPhone));

    return await this.repository.findOne({
      where: { id },
      relations: ['phone', 'address'],
    });
  }
  async delete(id: number): Promise<any> {
    return await this.repository.delete(id);
  }
}
