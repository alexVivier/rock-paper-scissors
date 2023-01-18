import { Injectable } from "@nestjs/common";
import { Game, GameDocument } from "../../schemas/game.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateGameDto } from "./dto/create-game.dto";

@Injectable()
export class GameService {

  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {

  }

  createGame(body: CreateGameDto) {
    const createdGame = new this.gameModel(body);
    createdGame.playerScore = 0;
    createdGame.computerScore = 0;
    return createdGame.save();
  }
}