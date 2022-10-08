const { existsSync, mkdirSync } = require("fs");
const { join } = require("path");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;
const winstonDaily = require("winston-daily-rotate-file");

//  Log Level
//  * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6

const buildProdLogger = () => {
  const logDir = join(__dirname, "../logs/");

  if (!existsSync(logDir)) {
    mkdirSync(logDir);
  }

  const logFormat = printf(
    ({ level, message, timestamp, stack }) =>
      `${timestamp} ${level}: ${stack || message}`
  );

  return createLogger({
    format: combine(
      format.colorize(),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      logFormat
    ),
    transports: [
      new winstonDaily({
        level: "info",
        datePattern: "YYYY-MM-DD",
        dirname: logDir + "/prod", // log file /logs/debug/*.log in save
        filename: `%DATE%.log`,
        maxFiles: 30, // 30 Days saved
        handleExceptions: true,
        json: true,
        zippedArchive: true,
      }),
    ],
  });
};

module.exports = buildProdLogger;
