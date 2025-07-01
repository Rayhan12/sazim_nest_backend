import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseInterceptors, UploadedFile, Query, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CategoryEnum, CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { File as MulterFile } from 'multer';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('categories')
  getCategories() {
    return Object.values(CategoryEnum).map(value => ({
      value,
      label: this.formatLabel(value),
    }));
  }

  private formatLabel(value: string): string {
    // Converts 'home_appliances' -> 'Home Appliances'
    return value
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  @Post()
  @UseInterceptors(FileInterceptor('product_image'))
  create(@UploadedFile() file: MulterFile, @Body(ValidationPipe) createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto, file);
  }

@Get()
findAll(@Query('user_id') userIdRaw?: string) {
  const user_id = userIdRaw !== undefined ? parseInt(userIdRaw, 10) : undefined;

  if (userIdRaw !== undefined && (user_id === undefined || isNaN(user_id))) {
    throw new BadRequestException('user_id must be a number');
  }

  return this.productService.findAll(user_id);
}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
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
