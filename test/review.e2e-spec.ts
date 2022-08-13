import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { disconnect, Types } from "mongoose";
import * as request from "supertest";

import { AppModule } from "../src/app.module";
import { CreateReviewDto } from "../src/review/dto/create-review.dto";
import { REVIEW_NOT_FOUND } from "../src/review/review.constants";

const productId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
  name: "Test",
  title: "Test Title",
  description: "Test Description",
  rating: 5,
  productId
};

describe("ReviewController (e2e)", () => {
  let app: INestApplication;
  let createdId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    disconnect();
  });

  describe("/review/create (POST)", () => {
    it("success", async (done) => {
      return request(app.getHttpServer())
        .post("/review/create")
        .send(testDto)
        .expect(201)
        .then(({ body }: request.Response) => {
          // eslint-disable-next-line no-underscore-dangle
          createdId = body._id;

          expect(createdId).toBeDefined();
          done();
        });
    });
  });

  describe("/review/byProduct/:productId (GET)", () => {
    it("success", async (done) => {
      return request(app.getHttpServer())
        .get(`/review/byProduct/${productId}`)
        .expect(200)
        .then(({ body }: request.Response) => {
          expect(body.length).toBe(1);
          done();
        });
    });

    it("fail", async (done) => {
      return request(app.getHttpServer())
        .get(`/review/byProduct/${new Types.ObjectId().toHexString()}`)
        .expect(200)
        .then(({ body }: request.Response) => {
          expect(body.length).toBe(0);
          done();
        });
    });
  });

  describe("/review/:id (DELETE)", () => {
    it("success", () => {
      return request(app.getHttpServer()).delete(`/review/${createdId}`).expect(200);
    });

    it("fail", () => {
      return request(app.getHttpServer()).delete(`/review/${createdId}`).expect(404, {
        statusCode: 404,
        message: REVIEW_NOT_FOUND
      });
    });
  });
});
