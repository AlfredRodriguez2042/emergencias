import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ZodValidationException } from 'nestjs-zod';

interface IResponse {
  data: any;
  errors: Record<string, string>;
  statusCode: number;
}
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    //  const status = exception.getStatus();
    const exceptionData: any = exception.getResponse();
    const { statusCode, ...rest } = exceptionData;
    let errorCode = undefined;
    if (exception instanceof ZodValidationException) {
      errorCode = 422;
    }
    const errors = {
      ...rest,
      timestamp: new Date().toISOString(),
      path: request.url,
      stack: exception.stack,
    };
    const data: IResponse = {
      data: null,
      errors,
      statusCode: errorCode ?? statusCode,
    };
    response.status(data.statusCode).json(data);
  }
}
