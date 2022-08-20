import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { disconnect, Types } from "mongoose";
import * as request from "supertest";

import { AppModule } from "../src/app.module";
import { AuthDto } from "../src/auth/dto/auth.dto";
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

const loginDto: AuthDto = {
  login: "a@a.ru",
  password: "123345678"
};

describe("ReviewController (e2e)", () => {
  let app: INestApplication;
  let createdId: string;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const { body } = await request(app.getHttpServer()).post("/auth/login").send(loginDto);

    token = body.accessToken;
  });

  afterAll(async () => {
    disconnect();
  });

  describe("/review/create (POST)", () => {
    it("success", async () => {
      return request(app.getHttpServer())
        .post("/review/create")
        .send(testDto)
        .expect(201)
        .then(({ body }: request.Response) => {
          // eslint-disable-next-line no-underscore-dangle
          createdId = body._id;

          expect(createdId).toBeDefined();
        });
    });

    it("fail", async () => {
      return request(app.getHttpServer())
        .post("/review/create")
        .send({ ...testDto, rating: 6 })
        .expect(400)
        .then(() => {});
    });
  });

  describe("/review/byProduct/:productId (GET)", () => {
    it("success", async () => {
      return request(app.getHttpServer())
        .get(`/review/byProduct/${productId}`)
        .expect(200)
        .then(({ body }: request.Response) => {
          expect(body.length).toBe(1);
        });
    });

    it("fail", async () => {
      return request(app.getHttpServer())
        .get(`/review/byProduct/${new Types.ObjectId().toHexString()}`)
        .expect(200)
        .then(({ body }: request.Response) => {
          expect(body.length).toBe(0);
        });
    });
  });

  describe("/review/:id (DELETE)", () => {
    it("success", async () => {
      return request(app.getHttpServer())
        .delete(`/review/${createdId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    });

    it("fail", async () => {
      return request(app.getHttpServer())
        .delete(`/review/${createdId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(404, {
          statusCode: 404,
          message: REVIEW_NOT_FOUND
        });
    });
  });
});
