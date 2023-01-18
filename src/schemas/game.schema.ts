import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type GameDocument = HydratedDocument<Game>;

@Schema()
export class Game {

  @Prop({ required: true })
  maxRoundToWin: number;

  @Prop()
  playerScore: number;

  @Prop()
  computerScore: number;

  @Prop()
  rounds: [];
}

export const GameSchema = SchemaFactory.createForClass(Game);