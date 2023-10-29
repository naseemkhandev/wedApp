const logger = require("winston");
const {verifyJWT} = require("../utils/jwtUtils")
const webLogs = require("../services/webLogs")
const url = require("url");
module.exports = async (req, res, next) => {
    try {
        const accessToken =
            req.headers["authorization"] || req.headers["Authorization"] || undefined;
        if (!accessToken) {
            return res.status(401).send("Token Not Provided");
        }
       
        const tokenLogData = await verifyJWT(accessToken)
     
        if (tokenLogData.expired == true) {
            return res.sendStatus(401);
        }
        
        if(tokenLogData.payload == null){
            return res.sendStatus(401);
        }
        req.user = tokenLogData.payload;
        let pathname = url.parse(req.url).pathname;
        const userAgent = req.headers["user-agent"];
        const ip = req.headers["x-forwarded-for"] || req.ip;
        let weblog={
            clientName:req.user.client,
            routes:pathname,
           // serviceName:'Ui/Ux',
            userAgent:userAgent,
            requestIp:ip
            
        }
        await webLogs.createLogs(weblog);
        return next();
    } catch (error) {
        console.log(error)
        logger.error({ error: error });
        return res.sendStatus(500);
    }
};
