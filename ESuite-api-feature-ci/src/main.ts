import { AppModule } from "@/app.module";
import { NestFactory } from "@nestjs/core";
import * as dotenv from "dotenv";

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.enableCors();

  await app.listen(3000);
}

bootstrap();
