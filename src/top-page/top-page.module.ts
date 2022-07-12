import { Module } from "@nestjs/common";

import { default as TopPageController } from "./top-page.controller";

@Module({
  controllers: [TopPageController]
})
export default class TopPageModule {}
