import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export interface Address {
  description: string;
  street: string;
  hight: string;
  location: string;
}
export interface Phone {
  home: string;
  mobile: string;
}
export const DocumentType = z.enum(['CUIT', 'DNI']);
export type IDocumentType = z.infer<typeof DocumentType>;
export interface IContact {
  name: string;
  lastName: string;
  documentType: IDocumentType;
  documentNumber: number;
  age: number;
  email: string;
  phone: Phone[];
  address: Address[];
}

export const ContactSchma = z.object({
  name: z.string(),
  lastName: z.string(),
  documentType: DocumentType,
  documentNumber: z.number(),
  age: z.number(),
  email: z.string(),
  phone: z.array(
    z.object({
      id: z.number().optional(),
      home: z.number(),
      mobile: z.number(),
    }),
  ),
  address: z.array(
    z.object({
      location: z.string(),
      hight: z.string(),
      description: z.string().optional(),
      street: z.string(),
    }),
  ),
});
export class ContactDto extends createZodDto(ContactSchma) {}
enum EnumType {
  'DNI' = 'DNI',
  'CUIT' = 'CUIT',
}
export class SearchQuery {
  @ApiProperty({ required: false })
  name?: string;
  @ApiProperty({ required: false })
  lastName?: string;
  @ApiProperty({
    enum: EnumType,
    required: false,
    default: EnumType.DNI,
  })
  documentType: EnumType;
  @ApiProperty({ required: false })
  documentNumber: number;
  @ApiProperty({ required: false })
  age: number;
  @ApiProperty({ required: false })
  email: string;
  @ApiProperty({ required: false })
  phone: number;
  @ApiProperty({ required: false })
  address: string;
}
export const ErrorSchema = z.object({
  data: z.null(),
  errors: z.object({
    message: z.string(),
    error: z.string(),
  }),
  statusCode: z.number(),
});
