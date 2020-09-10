/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  HttpCode,
  Redirect,
  Query,
  HttpException,
  HttpStatus,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatServies } from './cats.servies';
import { Cat } from './interfaces/cat.interface';
import { ForbiddenException } from 'src/exception/forbidden.exception';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';
import { JoiValidataionPipe } from 'src/pipe/joiValidation.pipe';
import { ParseIntPipe } from 'src/pipe/parse-int.pipe';

@Controller('cats')
export class CatController {
  constructor(private readonly catsSerive: CatServies) {}

  @Post()
  @HttpCode(201)
  @UseFilters(HttpExceptionFilter)
  // @UsePipes(new JoiValidataionPipe(createCatSchema))
  async create(@Body() CreateCatDto: CreateCatDto) {
    try {
      console.log(CreateCatDto);
      this.catsSerive.create(CreateCatDto);
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  @Get('single/:id')
  findOne(@Param('id', ParseIntPipe) id): void {
    console.log(id, 'id');
    this.catsSerive.findOne(id);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsSerive.findAll();
  }

  @Get('docs')
  @Redirect('https://www.baidu.com', 302)
  getDocs(@Query('version') version) {
    console.log(version);
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
}
