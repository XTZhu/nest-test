import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import * as ejsMate from 'ejs-mate';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  // 这个位置可以绑定中间件到每个路由
  // app.use(middleware)

  // 获取根目录
  const rootDir = join(__dirname, '../src');
  // 指定视图引擎 处理.html后缀文件
  app.engine('html', ejsMate);
  // 视图引擎
  app.set('view engine', 'html');
  // 配置模板（视图）的基本目录
  console.log(join(rootDir, 'views'));
  app.setBaseViewsDir(join(rootDir, 'views'));

  await app.listen(7010);
}
bootstrap().catch(console.error);
