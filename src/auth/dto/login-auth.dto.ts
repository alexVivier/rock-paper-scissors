import { IsDefined, IsEmail, IsString } from "class-validator";

export class LoginAuthDto {

  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  password: string;
}