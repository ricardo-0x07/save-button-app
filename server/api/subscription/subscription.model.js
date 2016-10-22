'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Subscription', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    
    statusType: DataTypes.STRING,
    name: DataTypes.STRING,
    info: DataTypes.STRING,
    endpoint: DataTypes.STRING,
    key: DataTypes.TEXT,
    p256dh: DataTypes.TEXT,
    subscription: DataTypes.TEXT,
    auth: DataTypes.TEXT,
    active: DataTypes.BOOLEAN
  });
}
