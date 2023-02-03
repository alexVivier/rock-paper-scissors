import { Injectable } from "@nestjs/common";
import { GameService } from "../game/game.service";
import { leaderboardStrategies } from "./leaderboard.strategies";

@Injectable()
export class LeaderboardService {

  constructor(
    private readonly gameService: GameService,
  ) {
  }

  getLeaderboard(strategy, data) {
    return this.gameService.findByFilter(leaderboardStrategies[strategy](data))
  }
}