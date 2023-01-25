import { IsDefined, IsEmail, IsString } from "class-validator";

export class SignupAuthDto {

  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  password: string;
}