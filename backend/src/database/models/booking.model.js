module.exports = (sequelize, DataTypes) =>
  sequelize.define("booking", {
    movie_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      foreignKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      foreignKey: true
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false
    },
    seat: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });