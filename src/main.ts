import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import * as ejsMate from 'ejs-mate';
import * as loaderConnect from 'loader-connect';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  // 这个位置可以绑定中间件到每个路由
  // app.use(middleware)

  // const environment = configService.get<EnvironmentConfig>('environment');

  // // 获取根目录
  const rootDir = join(__dirname, '../src');

  // if (isDevelopment) {
  //   app.use(loaderConnect.less(rootDir));
  // }
  app.useStaticAssets(join(rootDir, 'assets'), {
    prefix: '/assets',
  });
  // 指定视图引擎 处理.html后缀文件
  app.engine('html', ejsMate);
  // 视图引擎
  app.set('view engine', 'html');
  // 配置模板（视图）的基本目录
  app.setBaseViewsDir(join(rootDir, 'views'));

  await app.listen(7010);
}
bootstrap().catch(console.error);
