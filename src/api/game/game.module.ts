import { Module } from "@nestjs/common";
import { getModelToken, MongooseModule } from "@nestjs/mongoose";
import { Game, GameSchema } from "../../schemas/game.schema";
import { GameService } from "./game.service";
import { GameController } from "./game.controller";
import { UserModule } from "../user/user.module";


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
    UserModule,
  ],
  providers: [
    GameService,
  ],
  controllers: [
    GameController
  ],

})
export class GameModule {}