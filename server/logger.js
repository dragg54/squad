import { createLogger, format, transports } from 'winston';
import  DailyRotateFile  from 'winston-daily-rotate-file'
import dotenv from 'dotenv'

dotenv.config()

const logger = createLogger({
  level: 'info', 
  format: format.combine(
    format.timestamp(),
    format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console({
        format: format.combine(
            format.colorize(),
            format.printf(({ level, message, timestamp }) => {
                return `${timestamp} [${level}]: ${message}`;
              })
        )
    }),
    process.env.NODE_ENV == "Development" && new DailyRotateFile({
      filename: 'logs/serverlog-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '10m',
      maxFiles: '5d',
    }),
    process.env.NODE_ENV == "Development" &&  new transports.File({ filename: 'app.log',
        format: format.combine(
            format.uncolorize(), 
            format.timestamp(),
            format.printf(({ level, message, timestamp }) => {
              return `${timestamp} [${level.toUpperCase()}]: ${message}`;
            }))
     }) 
  ],
});

export default logger