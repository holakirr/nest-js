import { Injectable } from "@nestjs/common";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { Types } from "mongoose";
import { InjectModel } from "nestjs-typegoose";

import { CreateTopPageDto } from "./dto/create-top-page.dto";
import { FindTopPageDto } from "./dto/find-top-page.dto";
import { TopPageModel } from "./top-page.model";

@Injectable()
export class TopPageService {
  constructor(@InjectModel(TopPageModel) private readonly topPageModel: ModelType<TopPageModel>) {}

  async create(dto: CreateTopPageDto) {
    return this.topPageModel.create(dto);
  }

  async findById(id: Types.ObjectId) {
    return this.topPageModel.findById(id).exec();
  }

  async findByAlias(alias: string) {
    return this.topPageModel.findOne({ alias });
  }

  async deleteById(id: Types.ObjectId) {
    return this.topPageModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: Types.ObjectId, dto: CreateTopPageDto) {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findByFirstCategory({ firstCategory }: FindTopPageDto): Promise<TopPageModel[]> {
    return this.topPageModel.find({ firstCategory }, { alias: 1, secondCategory: 1, title: 1 }).exec();
  }
}
