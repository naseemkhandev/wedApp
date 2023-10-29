// const logger = require("winston");
// const { base64encode, base64decode } = require('nodejs-base64');
// const inviteDataService=require("../services/inviteData");
// var multer = require('multer');
// class inviteController {
//     static async addInvite(req, res) {
//         try {
//             let {userid,name,email,isActive}=req.body;
//             console.log(userid,name,email,isActive);
//             return false;
//           await  inviteDataService.saveInviteInfo(userid,name,email,isActive);
//          res.status(200).send(req)

//         } catch (err) {
//             logger.error({
//                 message: "Error in add Invite  In Invite Controller1",
//                 error: err,
//             });
           
//             res.status(500).send("Error in add Invite  In Invite Controller2");
//         }
//     }



// }

// module.exports =inviteController;