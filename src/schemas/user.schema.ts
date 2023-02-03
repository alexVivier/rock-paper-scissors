import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  pseudo: string;

  @Prop({default: 0})
  winCounter: number;

  @Prop({default: 0})
  playedGames: number;

  @Prop({default: 0})
  lossCounter: number;
}

export const UserSchema = SchemaFactory.createForClass(User);