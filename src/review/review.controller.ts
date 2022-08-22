import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";

import { JwtAuthGuard } from "../auth/guards/jwt.guards";
import { UserEmail } from "../decorators/user-email.decorator";
import { IdValidationPipe } from "../pipes/id-validation.pipe";
import { CreateReviewDto } from "./dto/create-review.dto";
import { REVIEW_NOT_FOUND } from "./review.constants";
import { ReviewService } from "./review.service";

@Controller("review")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Post("create")
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @Delete(":id")
  async delete(@Param("id", IdValidationPipe) id: string) {
    const deletedDoc = await this.reviewService.delete(id);

    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    // Automatic 200 OK response
  }

  @Get("byProduct/:productId")
  async getByProduct(@Param("productId", IdValidationPipe) productId: string) {
    return this.reviewService.findByProductId(productId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("byProduct/:productId")
  async deleteByProductId(@Param("id", IdValidationPipe) id: string, @UserEmail() email: string) {
    console.log(email);
    const { deletedCount } = await this.reviewService.deleteByProductId(id);

    console.log(deletedCount);
  }
}
