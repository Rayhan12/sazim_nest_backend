import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { buildResponse } from 'src/util/response-helpoer';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User)
    private userRepo : EntityRepository<User>,

    private readonly em: EntityManager
  ){}


  // async create(createUserDto: CreateUserDto) {
  //   const user = this.userRepo.create(createUserDto)
  //   await this.em.persistAndFlush(user)
  //   return user;
  // }


  async register(registerUserDto: RegisterUserDto) {

    const {password, email} = registerUserDto
    if(password.length < 6)
    {
      throw new BadRequestException('Password length must be at least 6 characters')
    }
    
    const userWithEmail = await this.userRepo.findOne({email:email});
    if(userWithEmail)
    {
      throw new BadRequestException("An user with this email already exist")
    }

    const user = this.userRepo.create(registerUserDto)
    await this.em.persistAndFlush(user);
    return buildResponse(200,"Registered Successfully",{
      user:user,
      token: "WE CAN USE THIS LATER 😁"
    },)
  }

  async login(loginUserDto: LoginUserDto) {

    const {email , password} = loginUserDto;

    const user = await this.userRepo.findOne({email})
    if(!user)
    {
      throw new UnauthorizedException('Invalid credentials')
    }

    if(!(user.password === password)){
      throw new UnauthorizedException('Invalid credentials')
    }

     return buildResponse(200, 'Login successful', {
    user:user,
    token: "WE CAN USE THIS LATER 😁"
  });
  }
  
}
