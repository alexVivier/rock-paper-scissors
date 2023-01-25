import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "../api/user/user.service";
import { SignupAuthDto } from "./dto/signup-auth.dto";
import { AuthService } from "./auth.service";
import { LoginAuthDto } from "./dto/login-auth.dto";

@Controller('auth')
export class AuthController {

    constructor(
      private readonly service: AuthService
    ) {
    }

    @Post('signup')
    signup(@Body() body: SignupAuthDto) {
        return this.service.signup(body);
    }

    @Post('login')
    login(@Body() body: LoginAuthDto) {
        return this.service.login(body);
    }
}