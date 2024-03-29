import { Test, TestingModule } from "@nestjs/testing";
import { Types } from "mongoose";
import { getModelToken } from "nestjs-typegoose";

import { ReviewService } from "../review.service";

describe("ReviewService", () => {
  let service: ReviewService;

  const execMock = { exec: jest.fn() };
  const reviewRepositoryFactory = () => ({
    find: () => execMock
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewService, { useFactory: reviewRepositoryFactory, provide: getModelToken("ReviewModel") }]
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("findByProductId", async () => {
    const id = new Types.ObjectId().toHexString();
    reviewRepositoryFactory()
      .find()
      .exec.mockReturnValueOnce(Promise.resolve([{ productId: id }]));
    const res = await service.findByProductId(id);

    expect(res[0].productId).toEqual(id);
  });
});
