import { IsString, IsNumber, IsNotEmpty } from "class-validator";

export class CreateConcertDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  description: string;
  date: string;

  @IsNumber( {}, { message: 'Total seats must be a number' } )
  @IsNotEmpty( { message: 'Total seats should not be empty' } )
  totalSeats: number;

  coverImage: string;
}
