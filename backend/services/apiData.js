const logger = require("winston");
const { Op } = require("sequelize");

class apiData {
  static async saveInfo(responsepayload) {
    try {
      let addmessage = await postGresCon.chatSetting.create({
        messages: responsepayload,
      });

      return addmessage;
    } catch (err) {
      logger.error({
        error: err,
        message: "Error in save the chatSetting data",
      });
    }
  }

  static async getweddingDetails(userid, limit, offset) {
    try {
      return postGresCon.chatSetting.findAll({
        where: {
          userid: userid,
        },
        order: [["id", "desc"]],
        logging: console.log,
        raw: true,
        nest: true,
      });
    } catch (err) {
      logger.error({
        error: err,
        message: "Error in get chatSetting data",
      });
    }
  }
  static async getwelcomemessages(userid, limit, offset) {
    try {
      return postGresCon.welcomeMessages.findAll({
        where: {
          userid: userid,
        },
        order: [["id", "desc"]],
        logging: console.log,
        raw: true,
        nest: true,
      });
    } catch (err) {
      logger.error({
        error: err,
        message: "Error in get welcomeMessages data",
      });
    }
  }
  static async getweddingimages(userid, limit, offset) {
    try {
      return postGresCon.weddingImages.findAll({
        where: {
          userid: userid,
        },
        order: [["id", "desc"]],
        logging: console.log,
        raw: true,
        nest: true,
      });
    } catch (err) {
      logger.error({
        error: err,
        message: "Error in get weddingimages data",
      });
    }
  }
}
module.exports = apiData;
