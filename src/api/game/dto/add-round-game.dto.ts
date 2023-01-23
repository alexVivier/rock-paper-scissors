import { IsDefined, IsString } from "class-validator";

export class AddRoundGameDto {

  @IsString()
  @IsDefined()
  computerChoice: string;

  @IsString()
  @IsDefined()
  playerChoice: string;
}