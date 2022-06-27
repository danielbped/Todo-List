module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    status: DataTypes.STRING,
    owner: DataTypes.STRING,
    updated: DataTypes.DATE,
    created: DataTypes.DATE,
  },
  {
    timestamps: false,
  })

  return Task
}