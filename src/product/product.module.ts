import { Module } from "@nestjs/common";

import { default as ProductController } from "./product.controller";

@Module({
  controllers: [ProductController]
})
export default class ProductModule {}
