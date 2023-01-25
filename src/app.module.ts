import { Module } from "@nestjs/common";
import { ApiModule } from "./api/api.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";


@Module({
  imports: [
    ApiModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost/rockpaperscissors')
  ]
})
export class AppModule {
}