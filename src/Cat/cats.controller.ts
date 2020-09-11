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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatServies } from './cats.servies';
import { Cat } from './interfaces/cat.interface';
import { ForbiddenException } from 'src/core/exception/forbidden.exception';
import { HttpExceptionFilter } from 'src/core/exception/http-exception.filter';
import { JoiValidataionPipe } from 'src/core/pipe/joiValidation.pipe';
import { ParseIntPipe } from 'src/core/pipe/parse-int.pipe';
import { RolesGuard } from 'src/core/guard/roles.guard';
import { Roles } from 'src/core/decorator/roles.decorator';
import { LoggingInterceptor } from 'src/core/interceptor/logging.interceptor';
import { TransformInterceptor } from 'src/core/interceptor/transform.interceptor';
import { User } from 'src/core/decorator/user.decorator';
import { UserEntity } from './entity/user.entity';

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatController {
  constructor(private readonly catsSerive: CatServies) {}

  @Post()
  @HttpCode(201)
  @UseFilters(HttpExceptionFilter)
  @Roles('admin')
  // @UsePipes(new JoiValidataionPipe(createCatSchema))
  async create(@Body() CreateCatDto: CreateCatDto) {
    try {
      this.catsSerive.create(CreateCatDto);
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  @Get('single/:id')
  findOne(@Param('id', ParseIntPipe) id): void {
    this.catsSerive.findOne(id);
  }

  @Get()
  @UseInterceptors(TransformInterceptor)
  async findAll(@User() user: UserEntity): Promise<Cat[]> {
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
