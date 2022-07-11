import { Module } from "@nestjs/common";

import AppController from "./app.controller";
import AppService from "./app.service";
import AuthModule from "./auth/auth.module";
import { default as ProductModule } from "./product/product.module";
import { default as ReviewModule } from "./review/review.module";
import { default as TopPageModule } from "./top-page/top-page.module";

@Module({
  imports: [AuthModule, TopPageModule, ProductModule, ReviewModule],
  controllers: [AppController],
  providers: [AppService]
})
export default class AppModule {}
