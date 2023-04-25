import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const initSwagger = (app: INestApplication) => {
  const config =
    app.get<ConfigService>(ConfigService)['internalConfig']['config'];
  const swaggerConfig = new DocumentBuilder()
    .setTitle(config.project.name)
    .setDescription(config.project.description)
    .setVersion(config.project.version)
    .build();
  const docs = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(
    `${config.server.basePath}/${config.swagger.path}`,
    app,
    docs,
  );
};
