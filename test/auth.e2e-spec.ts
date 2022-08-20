import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { disconnect } from "mongoose";
import * as request from "supertest";

import { AppModule } from "../src/app.module";
import { LOGIN_EMAIL_INCORRECT, LOGIN_ERROR, LOGIN_PASSWORD_INCORRECT } from "../src/auth/auth.constants";
import { AuthDto } from "../src/auth/dto/auth.dto";

const loginDto: AuthDto = {
  login: "a@a.ru",
  password: "123345678"
};

describe("AuthController (e2e)", () => {
  const controllerPath = "/auth";
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(() => {
    disconnect();
  });

  describe("/auth/login (POST)", () => {
    const path = `${controllerPath}/login`;
    it("success", async () =>
      request(app.getHttpServer())
        .post(path)
        .send(loginDto)
        .expect(200)
        .then(({ body }: request.Response) => {
          expect(body.accessToken).toBeDefined();
        }));

    describe("fail", () => {
      const testValues = ["login", "password"];
      it.each(testValues)("Wrong %s", (value: string) =>
        request(app.getHttpServer())
          .post(path)
          .send({ ...loginDto, [value]: "wrong" })
          .expect(401, {
            statusCode: 401,
            message: LOGIN_ERROR,
            error: "Unauthorized"
          })
      );

      it.each(testValues)("Wrong data type %s", (value: string) =>
        request(app.getHttpServer())
          .post(path)
          .send({ ...loginDto, [value]: null })
          .expect(400, {
            statusCode: 400,
            message: value === "login" ? [LOGIN_EMAIL_INCORRECT] : [LOGIN_PASSWORD_INCORRECT],
            error: "Bad Request"
          })
      );
    });
  });
});
