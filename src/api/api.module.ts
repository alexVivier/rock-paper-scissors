import {Module} from "@nestjs/common";
import { GameModule } from "./game/game.module";
import { UserModule } from "./user/user.module";

@Module({
    exports: [
      GameModule,
      UserModule,
    ],
    imports: [
      GameModule,
      UserModule,
    ],
    providers: [],
    controllers: []
})
export class ApiModule{}