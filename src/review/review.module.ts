import { Module } from "@nestjs/common";

import { default as ReviewController } from "./review.controller";

@Module({
  controllers: [ReviewController]
})
export default class ReviewModule {}
