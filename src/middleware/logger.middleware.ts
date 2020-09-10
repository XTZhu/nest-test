/* eslint-disable @typescript-eslint/ban-types */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function): void {
    console.log('Request....');
    next();
  }
}
