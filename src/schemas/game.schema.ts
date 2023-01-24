import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type GameDocument = HydratedDocument<Game>;

@Schema()
export class Game {

  @Prop({ required: true })
  maxRoundToWin: number;

  @Prop({default: 0})
  playerScore: number;

  @Prop({default: 0})
  computerScore: number;

  @Prop()
  rounds: any[];

  @Prop({default: 'started' })
  status: string;

  @Prop({default: null })
  winner: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);