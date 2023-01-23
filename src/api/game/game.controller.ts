import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { GameService } from "./game.service";
import { CreateGameDto } from "./dto/create-game.dto";
import { AddRoundGameDto } from "./dto/add-round-game.dto";
import { GameStatusGuard } from "../../guards/game-status.guard";

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

  @Get('computer-choice')
  getComputerChoice() {
    try {
      return this.service.getComputerChoice();
    } catch(err) {
      throw err
    }
  }

  @Get(':id')
  getById(@Param('id') _id: string) {
    try {
      return this.service.getGame(_id);
    } catch(err) {
      throw err;
    }
  }

  @UseGuards(GameStatusGuard)
  @Post(':id/round-finished')
  addPlayedRound(@Param('id') _id: string, @Body() body: AddRoundGameDto) {
    try {
      return this.service.addPlayedRound(_id, body);
    } catch(err) {
      throw err;
    }
  }
}