import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
// import * as cookieParser from "cookie-parser";

async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule, {
      logger: ["debug", "error"],
    });
    app.setGlobalPrefix("api");

    // app.use(cookieParser());
    await app.listen(PORT, () => {
      console.log(`Server start at: http://localhost${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
