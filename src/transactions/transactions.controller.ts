import { Body, Controller, Get, Param, Post, Query, ValidationPipe } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { PurchaseDto } from './dto/purchase.dto';
import { RentDto } from './dto/rent.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post("purchase")
  createPurchase(@Body(ValidationPipe) purchaseDto :PurchaseDto){
    return this.transactionsService.createPurchase(purchaseDto);
  }

  @Get("purchase")
  getAllPurchase(@Query() user_id? : number){
    return this.transactionsService.getAllPurchase(user_id)
  } 

  @Get("Purchase/:id")
  getPurchaseById(@Param('id') id:number){
    return this.transactionsService.getPurchaseById(id)
  }


  // * -------------------------------------------------------------------------- *

  @Post("rent")
  createRent(@Body(ValidationPipe) rentDto :RentDto){
    return this.transactionsService.createRent(rentDto);
  }

  @Get("rent")
  getAllRent(@Query() user_id? : number){
    return this.transactionsService.getAllRent(user_id)
  }

  @Get("rent/:id")
  getRentById(@Param('id') id:number){
    return this.transactionsService.getRentById(id)
  }


}
