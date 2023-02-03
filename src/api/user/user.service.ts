import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../../schemas/user.schema";
const argon2 = require('argon2');


@Injectable()
export class UserService {
    constructor(
      @InjectModel(User.name) private userModel: Model<User>
    ) {}

    async signup(body) {
        body.password = await argon2.hash(body.password);
        return await this.userModel.create(body);
    }

    findOne(filter) {
        return this.userModel.findOne(filter)
    }

    async addWin(userId) {
        const user = await this.userModel.findOne({_id: userId});
        const userUpdated = await this.userModel.updateOne({_id: user._id}, {
            winCounter: user.winCounter+1,
            playedGames: user.playedGames+1,
        })
        return !!userUpdated;
    }

    async addLose(userId) {
        const user = await this.userModel.findOne({_id: userId});
        const userUpdated = await this.userModel.updateOne({_id: user._id}, {
            lossCounter: user.lossCounter+1,
            playedGames: user.playedGames+1,
        })
        return !!userUpdated;
    }

}