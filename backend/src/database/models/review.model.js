module.exports = (sequelize, DataTypes) =>
  sequelize.define("review", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    movie_name: {
      type: DataTypes.STRING,
      allowNull: false,
      foreignKey: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      foreignKey: true
    },
    movie_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      foreignKey: true
    },
  });
