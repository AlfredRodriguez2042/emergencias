import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ContactKeys,
  IContactRepository,
  IContactService,
} from '../../domain/ports';

@Injectable()
export class ContactsService implements IContactService {
  constructor(
    @Inject(ContactKeys.CONTACT_REPOSITORY)
    private repository: IContactRepository,
  ) {}
  async findAll(options: any): Promise<any[]> {
    return await this.repository.findAll(options);
  }
  async findOne(query: any): Promise<any> {
    const contact = await this.repository.findOne(query);
    if (!contact) {
      throw new NotFoundException();
    }
    return contact;
  }
  async findBy(query: any): Promise<any> {
    const isRelation = Object.keys(query).some((k) =>
      ['phone', 'address'].includes(k),
    );
    const findByRelations = [
      { phone: { home: query.phone } },
      { phone: { mobile: query.phone } },
      { address: { street: query.address } },
      { address: { location: query.address } },
      { address: { hight: query.address } },
    ];
    const where = isRelation ? findByRelations : query;
    const contact = await this.repository.findAll({
      where,
      relations: ['phone', 'address'],
    });
    if (!contact.length) {
      throw new NotFoundException();
    }
    return contact[0];
  }
  async create(contact: any): Promise<any> {
    const exist = await this.repository.findOne({
      where: { email: contact.email },
    });
    if (exist) {
      throw new ConflictException('The resouce already exist');
    }
    return await this.repository.create(contact);
  }
  async update(id: number, query: any): Promise<any> {
    return await this.repository.update(id, query);
  }
  async delete(id: number): Promise<any> {
    return await this.repository.delete(id);
  }
}
