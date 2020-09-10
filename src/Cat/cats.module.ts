import { CatServies } from './cats.servies';
import { CatController } from './cats.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [CatController],
  providers: [CatServies],
  exports: [CatServies],
})
export class CatModule {}
