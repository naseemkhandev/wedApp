const winston = require("winston");
const fs = require("fs");
const path = require("path");
const process = require("process");

let dir;
if (process.env.NODE_ENV === "production") {
    dir = "/var/log/restService";
} else {
    dir = "logs";
}

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const errorLog = path.join(dir, "restService.log");

const enumerateErrorFormat = winston.format((info) => {
    if (info.error instanceof Error) {
        info.error = Object.assign(
            {
                message: info.error.message,
                stack: info.error.stack,
            },
            info.error
        );
    }

    if (info instanceof Error) {
        return Object.assign(
            {
                message: info.message,
                stack: info.stack,
            },
            info
        );
    }
    return info;
});

module.exports = () => {
    if (process.env.NODE_ENV === "production") {
        winston.configure({
            format: winston.format.combine(
                winston.format.timestamp({
                    format: "YYYY-MM-DD HH:mm:ss",
                }),
                enumerateErrorFormat(),
                winston.format.json(),
                winston.format.logstash()
            ),
            transports: [new winston.transports.File({ filename: errorLog })],
        });
    } else {
        winston.configure({
            format: winston.format.combine(
                winston.format.timestamp({
                    format: "YYYY-MM-DD HH:mm:ss",
                }),
                enumerateErrorFormat(),
                winston.format.json(),
                winston.format.logstash()
            ),
            transports: [
                new winston.transports.File({ filename: errorLog }),
                new winston.transports.Console(),
            ],
        });
    }
};
