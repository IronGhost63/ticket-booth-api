import { IsEmail, IsNotEmpty, IsBoolean } from "class-validator";

export class CreateUserDto {
  @IsEmail( {}, { message: 'Invalid email address' } )
  email: string;

  @IsNotEmpty( { message: 'Password should not be empty' } )
  password: string;

  @IsNotEmpty( { message: 'Name should not be empty' } )
  name: string;

  @IsBoolean( { message: 'isAdmin must be a boolean value' } )
  isAdmin: boolean;
}
