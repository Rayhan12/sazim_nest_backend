import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('User Management')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ 
    status: 201, 
    description: 'User successfully registered',
    schema: {
      example: {
        id: 1,
        email: 'john.doe@example.com',
        first_name: 'John',
        last_name: 'Doe',
        address: '123 Main Street, City, State 12345'
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
  @ApiBody({ type: RegisterUserDto })
  @Post("register")
  register(@Body(ValidationPipe) registerUserDto:RegisterUserDto){
    return this.userService.register(registerUserDto)
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ 
    status: 200, 
    description: 'User successfully logged in',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: 1,
          email: 'john.doe@example.com',
          first_name: 'John',
          last_name: 'Doe'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - invalid credentials' })
  @ApiBody({ type: LoginUserDto })
  @Post("login")
  login(@Body(ValidationPipe) loginUserDto:LoginUserDto){
    return this.userService.login(loginUserDto)
  }

}
