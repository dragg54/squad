import { createLogger, format, transports } from 'winston';

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
    new transports.File({ filename: 'app.log',
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