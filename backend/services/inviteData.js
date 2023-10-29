
const logger = require("winston");
const { Op } = require("sequelize");

class inviteData {
 
    static async saveInviteInfo(userid,name,email,isActive) {
        try {
           
            let addmessage = await  postGresCon.inviteUser.create({
                userid,name,email,isActive
            });
            
            return addmessage;
        } catch (err) {
            logger.error({
                error: err,
                message: "Error in saveInviteInfo",
            });
        }
    }
   
}
module.exports = inviteData;
