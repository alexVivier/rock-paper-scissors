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

    find(filter) {
        return this.userModel.findOne(filter)
    }

}