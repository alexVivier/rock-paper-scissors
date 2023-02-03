import {Module} from "@nestjs/common";
import { GameModule } from "./game/game.module";
import { UserModule } from "./user/user.module";
import { LeaderboardModule } from "./leaderboard/leaderboard.module";

@Module({
    exports: [
      GameModule,
      UserModule,
      LeaderboardModule,
    ],
    imports: [
      GameModule,
      UserModule,
      LeaderboardModule,
    ],
    providers: [],
    controllers: []
})
export class ApiModule{}