import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../api/user/user.service";

const argon2 = require("argon2");


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {
  }

  async signup(body) {
    const userCreated = await this.userService.signup(body);
    return this.signToken(userCreated);
  }

  async login(body) {
    const user = await this.userService.findOne({
      email: body.email
    });
    if (!user) {
      throw new HttpException("Error while login.", HttpStatus.BAD_REQUEST);
    }
    const isPasswordOk = argon2.verify(user.password, body.password);
    if (!isPasswordOk) {
      throw new HttpException("Error while login.", HttpStatus.BAD_REQUEST);
    }
    return this.signToken(user);
  }

  signToken(user) {
    const payload = {
      id: user._id,
      pseudo: user.pseudo
    };
    return this.jwtService.sign(payload);
  }
}