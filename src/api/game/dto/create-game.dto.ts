import { IsDefined, IsNumber } from "class-validator";

export class CreateGameDto {

  @IsDefined()
  @IsNumber()
  maxRoundToWin: number;

  playerScore?: number;
  computerScore?: number;
}