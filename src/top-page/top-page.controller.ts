import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { Types } from "mongoose";

import { IdValidationPipe } from "../pipes/id-validation.pipe";
import { CreateTopPageDto } from "./dto/create-top-page.dto";
import { FindTopPageDto } from "./dto/find-top-page.dto";
import { ERROR_TOP_PAGE_EXISTS, ERROR_TOP_PAGE_NOT_FOUND_CAT, ERROR_TOP_PAGE_NOT_FOUND_ID } from "./top-page.constants";
import { TopPageService } from "./top-page.service";

@Controller("top-page")
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @Post("create")
  async create(@Body() dto: CreateTopPageDto) {
    const oldTopPage = await this.topPageService.findByAlias(dto.alias);

    if (oldTopPage) throw new BadRequestException(ERROR_TOP_PAGE_EXISTS);

    return this.topPageService.create(dto);
  }

  @Get(":id")
  async get(@Param("id", IdValidationPipe) id: Types.ObjectId) {
    const topPage = await this.topPageService.findById(id);

    if (topPage === undefined) throw new NotFoundException(ERROR_TOP_PAGE_NOT_FOUND_ID);

    return topPage;
  }

  @Get("/byAlias:alias")
  async getByAlias(@Param("alias") alias: string) {
    const topPage = await this.topPageService.findByAlias(alias);

    if (topPage === undefined) throw new NotFoundException(ERROR_TOP_PAGE_NOT_FOUND_ID);

    return topPage;
  }

  @Delete(":id")
  async delete(@Param("id", IdValidationPipe) id: Types.ObjectId) {
    const topPage = await this.topPageService.deleteById(id);

    if (topPage === undefined) throw new NotFoundException(ERROR_TOP_PAGE_NOT_FOUND_ID);
  }

  @Patch(":id")
  async patch(@Param("id", IdValidationPipe) id: Types.ObjectId, @Body() dto: CreateTopPageDto) {
    const topPage = await this.topPageService.updateById(id, dto);

    if (topPage === undefined) throw new NotFoundException(ERROR_TOP_PAGE_NOT_FOUND_ID);

    return topPage;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("find")
  async find(@Body() dto: FindTopPageDto) {
    const topPage = await this.topPageService.findByFirstCategory(dto);

    if (topPage === undefined) throw new NotFoundException(ERROR_TOP_PAGE_NOT_FOUND_CAT);

    return topPage;
  }
}
