import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize, errors, json } = format;

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }), 
    json()
  ),
  transports: [
    new transports.Console({
      format: combine(colorize(), printf(({ level, message, timestamp, stack }) => {
        return stack
          ? `${timestamp} ${level}: ${stack}`
          : `${timestamp} ${level}: ${message}`;
      }))
    }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' })
  ],
});

export default logger;
