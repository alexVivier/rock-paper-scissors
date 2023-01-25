import {Module} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../api/user/user.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
    exports: [],
    imports: [UserModule, JwtModule.register({ secret: 'hard!to-guess_secret' })],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule{}