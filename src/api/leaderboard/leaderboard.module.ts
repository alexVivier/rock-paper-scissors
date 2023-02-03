import {Module} from "@nestjs/common";
import { LeaderboardService } from "./leaderboard.service";

@Module({
    exports: [],
    imports: [],
    providers: [LeaderboardService],
    controllers: []
})
export class LeaderboardModule{}