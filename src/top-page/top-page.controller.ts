import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";

import { default as FindTopPageDto } from "./dto/find-top-page.dto";
import { default as TopPageModel } from "./top-page.model";

@Controller("top-page")
export default class TopPageController {
  @Post("create")
  async create(@Body() dto: Omit<TopPageModel, "_id">) {
    return "Product created";
  }

  @Get(":id")
  async get(@Param("id") id: string) {}

  @Delete(":id")
  async delete(@Param("id") id: string) {}

  @Patch(":id")
  async patch(@Param("id") id: string, @Body() dto: TopPageModel) {}

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindTopPageDto) {}
}
