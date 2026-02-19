import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsEmail( {}, { message: 'Invalid email address' } )
  email: string;

  @IsNotEmpty( { message: 'Password should not be empty' } )
  password: string;

  @IsNotEmpty( { message: 'Name should not be empty' } )
  name: string;
}
