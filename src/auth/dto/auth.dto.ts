import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthDto {
  @IsEmail( {}, { message: 'Invalid email address' } )
  email: string;

  @IsNotEmpty( { message: 'Password should not be empty' } )
  password: string;
}
