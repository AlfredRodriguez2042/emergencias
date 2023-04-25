import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NextFunction, Request, Response } from 'express';
import { AppModule } from './app.module';
import {
  HttpExceptionFilter,
  initSwagger,
} from './contacts/infrastructure/providers';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config =
    app.get<ConfigService>(ConfigService)['internalConfig']['config'];

  app.enableShutdownHooks();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use((req: Request, res: Response, next: NextFunction) => {
    req.setTimeout(10000, () => {
      throw new HttpException('Server Timeout', HttpStatus.REQUEST_TIMEOUT);
    });

    res.setTimeout(10000);

    next();
  });
  if (config.swagger.enabled) {
    initSwagger(app);
  }
  await app.listen(3000);
}
bootstrap();
