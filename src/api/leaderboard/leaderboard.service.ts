import { Injectable } from "@nestjs/common";
import { leaderboardStrategies } from "./leaderboard.strategies";
import { UserService } from "../user/user.service";

@Injectable()
export class LeaderboardService {

  constructor(
    private readonly userService: UserService,
  ) {
  }

  getLeaderboard(strategy) {
    return this.userService.findAndSortBy(leaderboardStrategies[strategy](), 20)
  }
}