import { createLogger, format, transports } from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { combine, timestamp, printf, colorize, errors, json } = format;


const consoleFormat = printf(({ level, message, timestamp, stack, ...metadata }) => {
    let msg = `${timestamp} [${level}]: ${message}`;
    
    if (Object.keys(metadata).length > 0) {
        msg += ` ${JSON.stringify(metadata)}`;
    }
    
    if (stack) {
        msg += `\n${stack}`;
    }
    
    return msg;
});


const level = process.env.NODE_ENV === 'production' ? 'info' : 'debug';


const logTransports = [

    new transports.File({ 
        filename: path.join(__dirname, '../../logs/error.log'),
        level: 'error',
        maxsize: 5242880, 
        maxFiles: 5
    }),
    

    new transports.File({ 
        filename: path.join(__dirname, '../../logs/combined.log'),
        maxsize: 5242880, 
        maxFiles: 5
    }),
    
  
    new transports.File({ 
        filename: path.join(__dirname, '../../logs/warn.log'),
        level: 'warn',
        maxsize: 5242880, 
        maxFiles: 3
    })
];


if (process.env.NODE_ENV !== 'production') {
    logTransports.push(
        new transports.Console({
            format: combine(
                colorize({ all: true }),
                consoleFormat
            )
        })
    );
}

const logger = createLogger({
    level,
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        json()
    ),
    defaultMeta: { 
        service: 'legal-suite-api',
        environment: process.env.NODE_ENV || 'development'
    },
    transports: logTransports, 
    
  
    exceptionHandlers: [
        new transports.File({ 
            filename: path.join(__dirname, '../../logs/exceptions.log')
        })
    ],
    
 
    rejectionHandlers: [
        new transports.File({ 
            filename: path.join(__dirname, '../../logs/rejections.log')
        })
    ]
});

export default logger;