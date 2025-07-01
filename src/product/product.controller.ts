import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { File as MulterFile } from 'multer';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FileInterceptor('product_image'))
  create(@UploadedFile() file: MulterFile, @Body(ValidationPipe) createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto, file);
  }

  @Get()
  findAll(@Query('user_id') user_id?: number) {
    return this.productService.findAll(user_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('product_image'))
  update(@Param('id') id: string, @Body(ValidationPipe) updateProductDto: UpdateProductDto, @UploadedFile() file: MulterFile,) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
