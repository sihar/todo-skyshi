module.exports = (sequelize, Sequelize) => {
    const Todo_items = sequelize.define("todo_items", {
      activity_group_id: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
    },
    {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid: true,
    }
    );
  
    return Todo_items;
  };