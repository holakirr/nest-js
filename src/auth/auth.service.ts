import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { compare, genSalt, hash } from "bcryptjs";
import { InjectModel } from "nestjs-typegoose";

import { LOGIN_ERROR } from "./auth.constants";
import { AuthDto } from "./dto/auth.dto";
import { UserModel } from "./user.model";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly User: ModelType<UserModel>,
    private readonly jwtService: JwtService
  ) {}

  async createUser(dto: AuthDto) {
    const salt = await genSalt(10);
    const passwordHash = await hash(dto.password, salt);
    const newUser = new this.User({
      email: dto.login,
      passwordHash
    });

    return newUser.save();
  }

  async findUser(email: string) {
    return this.User.findOne({ email }).exec();
  }

  async validateUser(email: string, password: string): Promise<Pick<UserModel, "email">> {
    const user = await this.findUser(email);

    if (!user) {
      throw new UnauthorizedException(LOGIN_ERROR);
    }

    const isPasswordValid = await compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException(LOGIN_ERROR);
    }

    return { email: user.email };
  }

  async login(email: string) {
    const payload = { email };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken
    };
  }
}
