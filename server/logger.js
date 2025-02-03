import { createLogger, format, transports } from 'winston';
import  DailyRotateFile  from 'winston-daily-rotate-file'
import dotenv from 'dotenv'

dotenv.config()

const logger = process.env.NODE_ENV == 'Development' ? createLogger({
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
    new DailyRotateFile({
      filename: 'logs/serverlog-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '10m',
      maxFiles: '5d',
    }),
     new transports.File({ filename: 'app.log',
        format: format.combine(
            format.uncolorize(), 
            format.timestamp(),
            format.printf(({ level, message, timestamp }) => {
              return `${timestamp} [${level.toUpperCase()}]: ${message}`;
            }))
     }) 
  ],
}) : 
createLogger({
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
    })]})

export default logger