import { IsNumber, IsNotEmpty } from "class-validator";

export class CreateTicketDto {
  @IsNumber()
  @IsNotEmpty()
  concertId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  seatNumber: number;
}
