const bcrypt = require('bcrypt');
// const seeder = require('mongoose-seed')

const password = bcrypt.hashSync("password", 10);

// const user = [
//     {
//         "model" : "users",
//         "document" : [
//             {
//                 "firstname" : "admin",
//                 "lastname" : "admin",
//                 "email" : "admin@admin.com",
//                 "role": "admin",
//                 "password" : password
//             }
//         ]
//     }
// ]

// seeder.connect(process.env.DB_URI, function() {
//     seeder.loadModels([ user ]);
//     seeder.clearModels(['users'], function() {
//         seeder.populateModels(data, function(err, user) {
//             if(err) return console.log(err);
//             console.log(user);
//             seeder.disconnect();
//         })
//     })
// })

console.log(password);

