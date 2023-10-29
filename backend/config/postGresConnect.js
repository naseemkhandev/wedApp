// const Sequelize = require("sequelize");
// const postGressModels = require("../models").postGresTables;
// const association = require("../models").postGresAssociation;
// const config = require("../config.json")

// if(process.env.NODE_ENV == "local"){
//     POSTGDBI = config.local.POSTGDB
//     POSTGUSER=config.local.POSTGUSER
//     POSTGPASS =config.local.POSTGPASS
//     POSTGHOST=config.local.POSTGHOST
//     POSTGPORT=config.local.POSTGPORT

// }
// module.exports = async () => {
//     let pass = POSTGPASS;
   
// let models = {
//     postGress: {},
// };

// if(process.env.NODE_ENV == "test"){

//     var writeConnection = new Sequelize( {
//         dialect: "sqlite",
//         storage: ":memory:"
//     });
// } else {
//     var writeConnection = new Sequelize(
//         POSTGDBI || "10-10-2018GP",
//         POSTGUSER || "root",
//         pass || "",
//         {
//             host: POSTGHOST || "localhost",
//             port: POSTGPORT || "5432",
//             dialect: "postgres",
//             pool: {
//                 max: 5,
//                 min: 0,
//                 acquire: 30000,
//                 idle: 10000,
//             },

//             logging: false,
//         }
//     );
// }
// models.db = writeConnection;

// if (Object.keys(postGressModels).length > 0) {
//     Object.keys(postGressModels).forEach((table) => {
//       //  console.log(table)
//         models.postGress[table] = postGressModels[table](writeConnection, Sequelize);
        
//     });
   
//     association(models.postGress);
// }

// return models;
// };
