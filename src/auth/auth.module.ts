import { Module } from "@nestjs/common";

import { default as AuthController } from "./auth.controller";

@Module({
  controllers: [AuthController]
})
export default class AuthModule {}
