import {
  Controller,
  Get,
  Post,
  Param,
  Body,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatServies } from './cats.servies';
import { Cat } from './interfaces/cat.interface';

// @Controller({ host: 'localhost' })
@Controller('cats')
export class CatController {
  constructor(private catsSerive: CatServies) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Post()
  async create(@Body() CreateCatDto: CreateCatDto) {
    console.log(CreateCatDto);
    this.catsSerive.create(CreateCatDto);
  }

  @Get(':id')
  findOne(@Param() params: { id: number }): string {
    return `This action returns a #${params.id} cat`;
  }

  @Get()
  // @Get()
  // @HttpCode(201)
  // @Redirect('https://www.baidu.com', 301)
  findAll(): Cat[] {
    return this.catsSerive.findAll();
  }
}
