import { Controller, Get, Param } from "@nestjs/common";
import { LeaderboardService } from "./leaderboard.service";

@Controller('leaderboard')
export class LeaderboardController {

  constructor(private readonly service: LeaderboardService) {
  }

  @Get(':strategy')
  async get(@Param('strategy') strategy,) {
    return this.service.getLeaderboard(strategy);
  }
}