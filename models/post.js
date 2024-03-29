'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId", as: 'user' });
    }

    toJSON() {
      return { ...this.get(), id: undefined, userId: undefined }
    }
  }
  post.init({
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
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Message is required." },
        notEmpty: { msg: "Message is required." }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    tableName: 'posts',
    modelName: 'Post',
  });
  return post;
};