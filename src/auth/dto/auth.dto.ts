import { IsString } from "class-validator";

import { LOGIN_EMAIL_INCORRECT, LOGIN_PASSWORD_INCORRECT } from "../auth.constants";

export class AuthDto {
  @IsString({ message: LOGIN_EMAIL_INCORRECT })
  login: string;

  @IsString({ message: LOGIN_PASSWORD_INCORRECT })
  password: string;
}
