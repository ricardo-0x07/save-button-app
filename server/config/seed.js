/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
var Opportunity = sqldb.Opportunity;
// var User = sqldb.User;
// var File = sqldb.File;
var fs = require("fs")
var u = require("lodash");


// File.sync()
//   .then(() => {
//     return File.destroy({ where: {} });
//   })
//   .then(() => {
//     File.bulkCreate([{
//       name: 'deal1.jpeg',
//       base64: fs.readFileSync(__dirname + '/deal1.jpeg').toString('base64'),
//       type: 'image/jpeg'
//     }, {
//         name: 'deal2.jpeg',
//         base64: fs.readFileSync(__dirname + '/deal2.jpeg').toString('base64'),
//         type: 'base64/jpeg'
//       }, {
//         name: 'deal3.jpeg',
//         base64: fs.readFileSync(__dirname + '/deal3.jpeg').toString('base64'),
//         type: 'image/jpeg'
//       }]);
//   }).then(function () { // Notice: There are no arguments here, as of right now you'll have to...
//     return File.findAll();
//   }).then(function (files) {
//     console.log('files', files); // ... in order to get the array of user objects
//   });



sqldb.Opportunity.sync()
  .then(() => {
    return sqldb.Opportunity.destroy({ where: {} });
  })
  .then(() => {
    sqldb.Opportunity.bulkCreate([{
      name: 'electronics',
      image: fs.readFileSync(__dirname + '/deal1.jpeg').toString('base64'),
      description: ' Best Buy has one day sale 50% off electronics. Today Only.',
      file: {
        name: 'deal1.jpeg',
        base64: fs.readFileSync(__dirname + '/deal1.jpeg').toString('base64'),
        type: 'image/jpeg'
      }
    }, {
        name: 'Microwave food',
        image: fs.readFileSync(__dirname + '/deal2.jpeg').toString('base64'),
        description: 'Truevalues 50% sale on djouno Pizza.',
        file: {
        name: 'deal2.jpeg',
        base64: fs.readFileSync(__dirname + '/deal2.jpeg').toString('base64'),
        type: 'base64/jpeg'
      }
      }, {
        name: 'Chistmas sale',
        image: fs.readFileSync(__dirname + '/deal3.jpeg').toString('base64'),
        description: ' Walmart sale on toys and gift. Starts Today.',
        file: {
        name: 'deal3.jpeg',
        base64: fs.readFileSync(__dirname + '/deal3.jpeg').toString('base64'),
        type: 'image/jpeg'
      }
      }]);
  }).then(function () { // Notice: There are no arguments here, as of right now you'll have to...
    console.log('finished populating opportunities');
    return sqldb.Opportunity.findAll({include: [{model: sqldb.File}]});
  // }).then(function (opportunities) {
  //   // console.log('opportunities', opportunities); // ... in order to get the array of user objects
  //   var opportunity_ids = u.map(opportunities, function (x) {
  //     return x._id;
  //   });
  //   console.log('opportunity_ids', opportunity_ids);
    
  //   return File.bulkCreate([
  //     {
  //       name: 'deal1.jpeg',
  //       base64: fs.readFileSync(__dirname + '/deal1.jpeg').toString('base64'),
  //       type: 'image/jpeg',
  //       OpportunityId: opportunity_ids[0]
  //     },
  //     {
  //       name: 'deal2.jpeg',
  //       base64: fs.readFileSync(__dirname + '/deal2.jpeg').toString('base64'),
  //       type: 'base64/jpeg',
  //       OpportunityId: opportunity_ids[1]
  //     },
  //     {
  //       name: 'deal3.jpeg',
  //       base64: fs.readFileSync(__dirname + '/deal3.jpeg').toString('base64'),
  //       type: 'image/jpeg',
  //       OpportunityId: opportunity_ids[2]
  //     },
  //   ]);
  // }).then(function () { // Notice: There are no arguments here, as of right now you'll have to...
  //   console.log('finished populating files');
  //   return File.findAll();
  }).then(function (opportunities) {
    console.log('opportunities', opportunities); // ... in order to get the array of user objects
  })
  .catch(function(error) {
    console.log('error', error);
  });

sqldb.User.sync()
  .then(() => sqldb.User.destroy({ where: {} }))
  .then(() => {
    sqldb.User.bulkCreate([{
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin'
      }])
      .then(() => {
        console.log('finished populating users');
      });
  }).then(function () { // Notice: There are no arguments here, as of right now you'll have to...
    return sqldb.User.findAll();
  }).then(function (users) {
    console.log('users', users); // ... in order to get the array of user objects
  });
