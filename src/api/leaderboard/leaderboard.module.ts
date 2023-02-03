import {Module} from "@nestjs/common";
import { LeaderboardService } from "./leaderboard.service";
import { LeaderboardController } from "./leaderboard.controller";
import { UserModule } from "../user/user.module";

@Module({
    exports: [LeaderboardService],
    imports: [UserModule],
    providers: [LeaderboardService],
    controllers: [LeaderboardController]
})
export class LeaderboardModule{}