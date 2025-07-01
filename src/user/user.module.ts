import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs/mikro-orm.module';
import { User } from './entities/user.entity';

@Module({
  imports : [MikroOrmModule.forFeature([User]),],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
