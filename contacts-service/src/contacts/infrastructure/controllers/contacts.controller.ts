import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe, zodToOpenAPI } from 'nestjs-zod';
import {
  ContactDto,
  ContactSchma,
  ErrorSchema,
} from '../../domain/models/contacts';
import { ContactKeys, IContactService } from '../../domain/ports';

@ApiTags('contacts')
@Controller('contacts')
export class ContactsController {
  constructor(
    @Inject(ContactKeys.CONTACT_SERVICE) private service: IContactService,
  ) {}
  @Get()
  @ApiResponse({
    status: 200,
    isArray: true,
    schema: zodToOpenAPI(ContactSchma),
  })
  @ApiResponse({
    status: 402,
    schema: zodToOpenAPI(ErrorSchema),
  })
  async findAll() {
    return await this.service.findAll({
      relations: ['phone', 'address'],
    });
  }
  @ApiResponse({
    status: 200,
    schema: zodToOpenAPI(ContactSchma),
  })
  @ApiResponse({
    status: 404,
    schema: zodToOpenAPI(ErrorSchema),
  })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findOne({
      where: { id },
      relations: ['phone', 'address'],
    });
  }
  @ApiResponse({
    status: 201,
    schema: zodToOpenAPI(ContactSchma),
  })
  @ApiBody({
    schema: zodToOpenAPI(ContactSchma),
  })
  @ApiResponse({
    status: 422,
    schema: zodToOpenAPI(ErrorSchema),
  })
  @Post()
  @UsePipes(ZodValidationPipe)
  async create(@Body() contact: ContactDto): Promise<any> {
    return await this.service.create(contact);
  }

  @ApiResponse({
    status: 200,
    schema: zodToOpenAPI(ContactSchma),
  })
  @ApiBody({
    schema: zodToOpenAPI(ContactSchma),
  })
  @ApiResponse({
    status: 404,
    schema: zodToOpenAPI(ErrorSchema),
  })
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: any) {
    return await this.service.update(id, payload);
  }
  @ApiResponse({
    status: 200,
    schema: zodToOpenAPI(ContactSchma),
  })
  @ApiResponse({
    status: 404,
    schema: zodToOpenAPI(ErrorSchema),
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.service.delete(id);
  }
}
