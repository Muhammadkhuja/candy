import { utilities } from "nest-winston";
import * as winston from "winston";

export const winstomConfig = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        utilities.format.nestLike("Candy")
      ),
    }),
    new winston.transports.File({
      filename: "log/combine.log",
      level: "info",
      format: winston.format.combine(
        winston.format.label({ label: "Candy" }),
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: winston.format.combine(
        winston.format.label({ label: "Candy" }),
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
};
