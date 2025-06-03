import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { projectDescription } from "../fordescription";
import * as basicAuth from "express-basic-auth";
import { WinstonModule } from "nest-winston";
import { winstomConfig } from "./common/logger/winston-logger";
import { AllExeptionsFilter } from "./common/errors/error.handling";

async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule, {
      logger: WinstonModule.createLogger(winstomConfig)
    });

    app.useGlobalFilters(new AllExeptionsFilter())
    app.setGlobalPrefix("api");
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
      .setTitle("Qandolat maxsulotlari online do'koni projecti")
      .setDescription(projectDescription)
      .setVersion("1.0")
      .addTag("NestJS", "Swagger")
      .addBearerAuth(
        {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        "access-token"
      )
      .build();


    app.use(
      ["/"],
      basicAuth({
        users: { admin: "hello" },
        challenge: true,
      })
    );

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("/", app, document);

    app.use(cookieParser());
    await app.listen(PORT, () => {
      console.log(`Server start at: http://localhost${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
