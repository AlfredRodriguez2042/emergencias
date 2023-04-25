import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';
import {
  ContactDto,
  ContactSchma,
  ErrorSchema,
  SearchQuery,
} from '../../domain/models/contacts';
import { ContactKeys, IContactService } from '../../domain/ports';

@ApiTags('search')
@Controller('contacts/search')
export class SearchController {
  constructor(
    @Inject(ContactKeys.CONTACT_SERVICE) public service: IContactService,
  ) {}
  @ApiResponse({
    status: 200,
    schema: zodToOpenAPI(ContactSchma),
  })
  @ApiResponse({
    status: 404,
    schema: zodToOpenAPI(ErrorSchema),
  })
  @ApiQuery({ type: SearchQuery })
  @Get()
  async findBy(@Query() query: ContactDto) {
    return await this.service.findBy(query);
  }
}
