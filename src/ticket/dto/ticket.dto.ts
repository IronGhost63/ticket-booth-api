import { IsNumber, IsNotEmpty } from "class-validator";

export class TicketDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  concert: string;

  @IsNumber()
  @IsNotEmpty()
  seatNumber: number;
}
