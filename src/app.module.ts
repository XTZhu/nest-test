import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatController } from './Cat/cats.controller';
import { CatServies } from './Cat/cats.servies';
@Module({
  imports: [],
  controllers: [AppController, CatController],
  providers: [AppService, CatServies],
})
export class AppModule {}
