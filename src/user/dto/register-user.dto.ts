import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterUserDto{
    @ApiProperty({
        description: 'User email address',
        example: 'john.doe@example.com'
    })
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @ApiProperty({
        description: 'User first name',
        example: 'John'
    })
    @IsNotEmpty()
    first_name!: string;
    
    @ApiProperty({
        description: 'User last name',
        example: 'Doe'
    })
    @IsNotEmpty()
    last_name!: string;
    
    @ApiProperty({
        description: 'User address',
        example: '123 Main Street, City, State 12345'
    })
    @IsNotEmpty()
    address!: string;
    
    @ApiProperty({
        description: 'Firebase console manager token',
        example: 'DUMMY TOKEN',
        required: false
    })
    firebase_console_manager_token: string = "DUMMY TOKEN";
    
    @ApiProperty({
        description: 'User password (minimum 6 characters)',
        example: 'password123'
    })
    @IsNotEmpty()
    password!: string;
    
}