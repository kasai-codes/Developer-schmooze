const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      onDelete: "SET NULL",
      references: {
        model: "user",
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
  },
  {
    hooks: {
      beforeBulkCreate: (postsData) => {
        postsData = postsData.map((postData) => {
          postData.content = postData.content.replaceAll("\n", "<br />");
          return postData;
        });
        return postsData;
      },
      beforeCreate: (postData) => {
        postData.content = postData.content.replaceAll("\n", "<br />");
        return postData;
      },
      beforeUpdate: (postData) => {
        postData.content = postData.content.replaceAll("\n", "<br />");
        return postData;
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;
