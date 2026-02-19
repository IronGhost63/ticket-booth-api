import { IsNumber, IsNotEmpty } from "class-validator";

export class RefreshDto {
  @IsNotEmpty( { message: 'Missing user ID' } )
  userId: number;

  @IsNotEmpty( { message: 'Missing refresh token' } )
  refreshToken: string;
}
