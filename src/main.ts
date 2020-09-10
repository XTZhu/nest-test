import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 这个位置可以绑定中间件到每个路由
  // app.use(middleware)
  await app.listen(7010);
}
bootstrap();
