'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      // define association here
      this.hasMany(Post, { foreignKey: "userId", as: 'posts' });
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name is required." },
        notEmpty: { msg: "Name is required." }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "Email is required." },
        notEmpty: { msg: "Email is required." }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Password is required." },
        notEmpty: { msg: "Password is required." },
        isEmail: { msg: "Email not valid." }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user"
    }
  }, {
    sequelize,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};