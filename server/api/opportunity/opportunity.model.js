'use strict';

export default function (sequelize, DataTypes) {
  var Opportunity = sequelize.define('Opportunity', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    info: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    image: DataTypes.TEXT,
    description: DataTypes.TEXT,
    location: DataTypes.STRING
  }, {
      // underscored: true,
      classMethods: {
        associate: function (models) {
          Opportunity.hasOne(models.File, {
            onDelete: 'cascade'
          });
          //An User can have many Opportunities.
          // Opportunity.belongsTo(models.User);
        }
      }
    });
    
  return Opportunity;
}
