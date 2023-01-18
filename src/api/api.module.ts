import {Module} from "@nestjs/common";
import { GameModule } from "./game/game.module";

@Module({
    exports: [
      GameModule
    ],
    imports: [
      GameModule
    ],
    providers: [],
    controllers: []
})
export class ApiModule{}