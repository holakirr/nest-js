import { Module } from "@nestjs/common";

import TopPageController from "./top-page.controller";

@Module({
  controllers: [TopPageController]
})
export default class TopPageModule {}
