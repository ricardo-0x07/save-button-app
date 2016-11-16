/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
db.Subscription = db.sequelize.import('../api/subscription/subscription.model');
db.File = db.sequelize.import('../api/file/file.model');
db.Opportunity = db.sequelize.import('../api/opportunity/opportunity.model');
db.User = db.sequelize.import('../api/user/user.model');
Object.keys(db).forEach(function (modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});
module.exports = db;
