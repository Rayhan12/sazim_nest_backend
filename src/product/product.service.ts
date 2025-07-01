import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { File as MulterFile } from 'multer';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { User } from 'src/user/entities/user.entity';
import { buildResponse } from 'src/util/response-helpoer';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private readonly productRepo: EntityRepository<Product>,
    @InjectRepository(User) private readonly userRepo: EntityRepository<User>,

    private readonly em : EntityManager
  ){}


  async create(createProductDto: CreateProductDto, file?: MulterFile) {
    const user = await this.userRepo.findOne(+createProductDto.user_id);

    if(!user){
      throw new BadRequestException('Invalid User')
    }

    const imagePath = file ? `/uploads/${file.filename}` : undefined;
     

  const product = this.productRepo.create({
    product_image: imagePath,
    user,
    ...createProductDto,
    date_posted: createProductDto.date_posted ?? new Date(),
  });

  await this.em.persistAndFlush(product);
  return product;
  }

  async findAll(user_id? :number) {
    if(user_id){
      const user = await this.userRepo.findOne({ id: user_id });
      if(!user){
        throw new BadRequestException('Invalid User')
      }

      const userProducts = await this.productRepo.find(user);
      return buildResponse(200,'All products found',userProducts)
    }

    const products = await this.productRepo.findAll();
    return buildResponse(200,'All products found',products)

  }

  async findOne(id: number) {
    const product = await this.productRepo.find(id);
    if(!product)
    {
      throw new BadRequestException('Invalid product reference')
    }
      return buildResponse(200,'All products found',product)
  }

  async update(id: number, updateProductDto: UpdateProductDto, file? : MulterFile) {
    const product = await this.productRepo.findOne({ id }, { populate: ['user'] });

  if (!product) {
    throw new BadRequestException('Product not found');
  }

  // Optional: re-validate user if user_id is passed during update
  if (updateProductDto.user_id) {
    const user = await this.userRepo.findOne(updateProductDto.user_id);
    if (!user) {
      throw new BadRequestException('Invalid user');
    }
    product.user = user;
  }

  // If new image file is uploaded, replace the path
  if (file) {
    product.product_image = `/uploads/${file.filename}`;
  }

  // Update fields from DTO
  // Exclude user_id from updateProductDto before assigning
  const { user_id, ...rest } = updateProductDto;
  this.em.assign(product, {
    ...rest,
    date_posted: updateProductDto.date_posted ?? product.date_posted,
  });

  await this.em.persistAndFlush(product);
  return buildResponse(200, 'Product updated successfully', product);
  }

  async remove(id: number) {
    const product = await this.productRepo.find(id);
    if(!product)
    {
      throw new BadRequestException('Invalid product reference')
    }
      this.em.remove(product)
      return buildResponse(200,'The producct was deleted',product)
  }
}
