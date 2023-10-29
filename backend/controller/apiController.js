// const logger = require("winston");
// const { base64encode, base64decode } = require('nodejs-base64');
// const apiDataService=require("../services/apiData");
// var multer = require('multer');
// class apiController {
//     static async details(req, res) {
//         try {
//             //Setting storage engine
//            let {venue,location,weddingDate}=req.body;
//        let result=await postGresCon.chatSetting.create({
//                 venue: venue,
//                 location: location,
//                 weddingDate: weddingDate,
//                 isActive:true
//             });



//          res.status(200).send(result)

//         } catch (err) {
//             logger.error({
//                 message: "Error in recieve Message In Api Controller",
//                 error: err,
//             });
           
//             res.status(500).send("Error in recieve Message In Api Controller");
//         }
//     }

//     //write code for welcome messages
//     static async welcomemessages(req, res) {
//         try {
//             //Setting storage engine
//            let {userid,welcomemesages,welcomeimage}=req.body;
//              welcomemesages=welcomemesages.join("|")
            
//            let result=   await postGresCon.welcomeMessages.create({
//                 userid: userid,
//                 welcomemesages: welcomemesages,
//                 welcomeimage: welcomeimage,
//                 isActive:true
//             });



//          res.status(200).send(result)

//         } catch (err) {
//             logger.error({
//                 message: "Error in recieve Message In Api Controller",
//                 error: err,
//             });
           
//             res.status(500).send("Error in recieve Message In Api Controller");
//         }
//     }
// //write code for wedding images
//     static async weddingimages(req, res) {
//         try {
//             //Setting storage engine
//             let PayloadData=[];
//            let {userid,weddingimages}=req.body;
//            weddingimages.map(async (imageName) => {
//             let saveData = {
//                 userid,
//                 imageName,
                
//             }
   
//             PayloadData.push(saveData)

//            });
          
      
//          let  result=  await postGresCon.weddingImages.bulkCreate(
//             PayloadData
//             ,{logging:true});



//          res.status(200).send(result)

//         } catch (err) {
//             logger.error({
//                 message: "Error in recieve Message In Api Controller",
//                 error: err,
//             });
           
//             res.status(500).send("Error in recieve Message In Api Controller");
//         }
//     }

// //getweddingdetails
// static async getweddingdetails(req, res) {
//     try{
//         let userid=req.params.id;
//         let  limit, offset;
        
       
       
//         let weddingDetailsResult =  await apiDataService.getweddingDetails(userid, limit, offset);
//         if(weddingDetailsResult.length>0)
//         res.status(200).send(weddingDetailsResult);
//         else 
//         res.status(200).send('there is no Welcome Details for thie userid');


  
// } catch (err) {
//     logger.error({
//         message: "Error in getweddingdetails In Api Controller1",
//         error: err,
//     });
   
//     res.status(500).send("Error in getweddingdetails In Api Controller2");
// }
// }
// //getwelcomemessages
// static async getwelcomemessages(req, res) {
//     try{
//         let userid=req.params.id;
//         let  limit, offset;
        
       
       
//         let welcomeMessagesResult =  await apiDataService.getwelcomemessages(userid, limit, offset);
//         if(welcomeMessagesResult.length>0)
//         res.status(200).send(welcomeMessagesResult);
//         else 
//         res.status(200).send('there is no Welcome Messages for thie userid');

  
//     } catch (err) {
//         logger.error({
//             message: "Error in getwelcomemessages In Api Controller",
//             error: err,
//         });
       
//         res.status(500).send("Error in getwelcomemessages In Api Controller");
//     }
// }
// //getweddingimages
// static async getweddingimages(req, res) {
//     try{
//         let userid=req.params.id;
//         let  limit, offset;
        
       
       
//         let weddingImagesResult =  await apiDataService.getweddingimages(userid, limit, offset);
//          if(weddingImagesResult.length>0)
//         res.status(200).send(weddingImagesResult);
//         else 
//         res.status(200).send('there is no wedding images for thie userid');


  
//     } catch (err) {
//         logger.error({
//             message: "Error in getweddingimages In Api Controller",
//             error: err,
//         });
       
//         res.status(500).send("Error in geweddingimages In Api Controller");
//     }
// }



// }

// module.exports =apiController;