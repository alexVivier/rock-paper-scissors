import { IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateGameDto {

  @IsDefined()
  @IsNumber()
  maxRoundToWin: number;

  @IsOptional()
  @IsString()
  playerId?: string;
}