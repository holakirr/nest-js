import { ConfigService } from "@nestjs/config";
import { TypegooseModuleOptions } from "nestjs-typegoose";

const getMongoString = (configService: ConfigService) =>
  `mongodb+srv://${configService.get("MONGO_LOGIN")}:${configService.get("MONGO_PASSWORD")}@${configService.get(
    "MONGO_HOST"
  )}`;

const getMongoOptions = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  w: "majority"
});

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
  return {
    uri: getMongoString(configService),
    ...getMongoOptions()
  };
};
