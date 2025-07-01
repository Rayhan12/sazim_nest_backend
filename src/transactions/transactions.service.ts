import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Rent } from './entities/rent.entity';
import { Purchase } from './entities/purchase.entity';
import { PurchaseDto } from './dto/purchase.dto';
import { RentDto } from './dto/rent.dto';
import { buildMessage } from 'class-validator';
import { buildResponse } from 'src/util/response-helpoer';

@Injectable()
export class TransactionsService {

    constructor(
        @InjectRepository(User) private readonly userRepo: EntityRepository<User>,
        @InjectRepository(Product) private readonly productRepo: EntityRepository<Product>,
        @InjectRepository(Rent) private readonly rentRepo: EntityRepository<Rent>,
        @InjectRepository(Purchase) private readonly purchaseRepo: EntityRepository<Purchase>,
        private readonly em: EntityManager
    ){}

async createPurchase(purchaseDto :PurchaseDto){
    const user = await this.userRepo.findOne(purchaseDto.buyer_id)
    if(!user)
    {
        throw new BadRequestException('User not found');
    }

    const product = await this.productRepo.findOne(purchaseDto.product_id)

    if(!product)
    {
        throw new BadRequestException('Invalid product requsted')
    }

    const purchase = this.purchaseRepo.create({ product, buyer: user });
    await this.em.persistAndFlush(purchase)
    return buildResponse(201,'Purchased Successfully',purchase)
}

async getAllPurchase(user_id? : number){
    const user = await this.userRepo.findOne({id: user_id})
    if(!user)
    {
        throw new BadRequestException('User not found');
    }

    const purchases = await this.productRepo.find(user)
    return buildResponse(200,'Data Found',purchases)

}

async getPurchaseById(id:number){
    const purchase = await this.productRepo.findOne(id)
    if(!purchase)
    {
        throw new BadRequestException('Invalid id received')
    }
    return buildResponse(200,'Data Found',purchase)

}




async createRent(rentDto :RentDto){
    const user = await this.userRepo.findOne({id: rentDto.renter_id})
    if(!user)
    {
        throw new BadRequestException('User not found');
    }

    const product = await this.productRepo.findOne({id: rentDto.product_id})

    if(!product)
    {
        throw new BadRequestException('Invalid product requsted')
    }

    const rent = this.rentRepo.create({ product, renter:user, ...rentDto });
    await this.em.persistAndFlush(rent)
    return buildResponse(201,'rented Successfully',rent)
}

async getAllRent(user_id? : number){
    const user = await this.userRepo.findOne({id: user_id})
    if(!user)
    {
        throw new BadRequestException('User not found');
    }

    const rents = await this.rentRepo.find(user)
    return buildResponse(200,'Data Found',rents)
}

async getRentById(id:number){
    const rent = await this.rentRepo.findOne(id)
    if(!rent)
    {
        throw new BadRequestException('Invalid id received')
    }
    return buildResponse(200,'Data Found',rent)
}


}
