'use strict';
import sqldb from '../../sqldb';

export default function(sequelize, DataTypes) {
  var File = sequelize.define('File', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    size: DataTypes.INTEGER,
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    base64: DataTypes.TEXT,
    info: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    OpportunityId: {
      type: DataTypes.INTEGER,
      references: {
        model: sqldb.Opportunity,
        key: 'id'
      }
    }
  }, {
      // underscored: true,
      classMethods: {
        associate: function (models) {
          console.log('file models');
          //An User can have many Opportunities.
          File.belongsTo(models.Opportunity);
        }
      }
    });
    
    return File;
}
