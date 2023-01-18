import { Body, Controller, Post } from "@nestjs/common";
import { GameService } from "./game.service";
import { CreateGameDto } from "./dto/create-game.dto";

@Controller('game')
export class GameController {

  constructor(private readonly service: GameService) {
  }

  @Post('create')
  createGame(@Body() body: CreateGameDto) {
    try {
      return this.service.createGame(body);
    } catch (err) {
      throw err;
    }
  }
}