import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Purchase } from './entities/purchase.entity';
import { Rent } from './entities/rent.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Product,User,Purchase,Rent])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
