import { BadRequestException, Body, Controller, Get, Param, Post, Query, ValidationPipe } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { PurchaseDto } from './dto/purchase.dto';
import { RentDto } from './dto/rent.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  @Post("purchase")
  createPurchase(@Body(ValidationPipe) purchaseDto: PurchaseDto) {
    return this.transactionsService.createPurchase(purchaseDto);
  }

  @Get("purchase")
  findAllPurchases(@Query('user_id') userIdRaw?: string) {
    const user_id = userIdRaw !== undefined ? parseInt(userIdRaw, 10) : undefined;

    if (userIdRaw !== undefined && (user_id === undefined || isNaN(user_id))) {
      throw new BadRequestException('user_id must be a number');
    }

    return this.transactionsService.getAllPurchase(user_id);
  }


  @Get("purchase/:id")
  getPurchaseById(@Param('id') id: number) {
    return this.transactionsService.getPurchaseById(id)
  }


  // * -------------------------------------------------------------------------- *

  @Post("rent")
  createRent(@Body(ValidationPipe) rentDto: RentDto) {
    return this.transactionsService.createRent(rentDto);
  }

  @Get("rent")
  findAllRents(@Query('user_id') userIdRaw?: string) {
    const user_id = userIdRaw !== undefined ? parseInt(userIdRaw, 10) : undefined;

    if (userIdRaw !== undefined && (user_id === undefined || isNaN(user_id))) {
      throw new BadRequestException('user_id must be a number');
    }

    return this.transactionsService.getAllRent(user_id);
  }

  @Get()


  @Get("rent/:id")
  getRentById(@Param('id') id: number) {
    return this.transactionsService.getRentById(id)
  }


}
