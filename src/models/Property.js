const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Property = sequelize.define("Property", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
  },

  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  city: {
    type: DataTypes.STRING,
  },

  location: {
    type: DataTypes.STRING,
  },

  type: {
    type: DataTypes.ENUM("rent", "sale"),
    allowNull: false,
  },

  bedrooms: {
    type: DataTypes.INTEGER,
  },

  bathrooms: {
    type: DataTypes.INTEGER,
  },

  area: {
    type: DataTypes.INTEGER,
  },
}, {
  tableName: "properties",     
  freezeTableName: true        
});

// Relation
User.hasMany(Property, { foreignKey: "userId" });
Property.belongsTo(User, { foreignKey: "userId" });

module.exports = Property;