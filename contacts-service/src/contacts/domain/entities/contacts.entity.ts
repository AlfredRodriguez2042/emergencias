import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IContact, IDocumentType } from '../models/contacts';
import { AddressEntity } from './address.entity';
import { PhoneEntity } from './phone.entity';
@Entity('contacts')
export class ContactsEntity implements IContact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  documentType: IDocumentType;

  @Column()
  documentNumber: number;

  @Column()
  age: number;

  @Column()
  email: string;

  @OneToMany(() => PhoneEntity, (phone) => phone.contact, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  phone: PhoneEntity[];

  @OneToMany(() => AddressEntity, (address) => address.contact, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  address: AddressEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
