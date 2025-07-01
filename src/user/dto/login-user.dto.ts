import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto{
    @ApiProperty({
        description: 'User email address',
        example: 'john.doe@example.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @ApiProperty({
        description: 'User password (minimum 6 characters)',
        example: 'password123'
    })
    @IsNotEmpty()
    @MinLength(6)
    password!: string
}