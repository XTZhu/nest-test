import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  // data, ctx
  (__: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
