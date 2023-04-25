import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ContactsEntity } from './contacts.entity';

@Entity('phone')
export class PhoneEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  home: string;

  @Column()
  mobile: string;

  @ManyToOne(() => ContactsEntity, (contact) => contact.phone, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'contactId' })
  contact: ContactsEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
