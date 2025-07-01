import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './user/entities/user.entity';
import { ProductModule } from './product/product.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
      MikroOrmModule.forRoot(),
      ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads', // this URL prefix maps to the folder
    }),
      UserModule,
      ProductModule,
      TransactionsModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
