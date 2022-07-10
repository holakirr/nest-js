import { Injectable } from "@nestjs/common";

@Injectable()
class AppService {
  // eslint-disable-next-line class-methods-use-this
  getHello(): string {
    return "Hello World!";
  }
}

export default AppService;
