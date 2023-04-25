import { registerAs } from '@nestjs/config';

interface IConfigJson {
  [key: string]: Record<string, string | number>;
}

export default registerAs(
  'config',
  (): IConfigJson => ({
    project: {
      apiPrefix: 'api/v1',
      name: process.env.npm_package_name,
      version: Number(process.env.npm_package_version),
      description: process.env.npm_package_description,
    },
    server: {
      env: process.env.NEST_ENV,
      port: process.env.NEST_API_PORT,
      host: '127.0.0.1',
      basePath: process.env.NEST_BASE_PATH,
      origins: process.env.NEST_ORIGIN_CORS || '*',
      allowedHeaders: process.env.NEST_ALLOWED_HEADERS,
      allowedMethods: process.env.NEST_ALLOWED_METHODS,
      corsEnabled: process.env.NEST_CORS_ENABLED,
      corsCredentials: process.env.NEST_CORS_CREDENTIALS,
    },
    swagger: {
      path: process.env.NEST_SWAGGER_PATH,
      enabled: process.env.NEST_SWAGGER_ENABLED,
    },
  }),
);
