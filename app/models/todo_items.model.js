module.exports = (sequelize, Sequelize) => {
    const Todo_items = sequelize.define("todos", {
      activity_group_id: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      priority: {
        type: Sequelize.STRING,
        defaultValue: "very-high",
      },
    },
    {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid: true,
    },
    );
  
    return Todo_items;
  };