import { FindManyOptions, FindOneOptions } from 'typeorm';

interface Base {
  findAll: (options: FindManyOptions) => Promise<any[]>;
  findOne: (query: FindOneOptions) => Promise<any>;
  findBy: (query: any) => Promise<any>;
  create: (contact: any) => Promise<any>;
  update: (id: number, query: any) => Promise<any>;
  delete: (id: number) => Promise<any>;
}

export interface IContactRepository extends Base {}

export interface IContactService extends Base {}

export class ContactKeys {
  public static readonly CONTACT_SERVICE = 'CONTACT_SERVICE';
  public static readonly CONTACT_REPOSITORY = 'CONTACT_REPOSITORY';
}
