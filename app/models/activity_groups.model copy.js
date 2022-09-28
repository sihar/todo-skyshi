module.exports = (sequelize, Sequelize) => {
    const Activity_groups = sequelize.define("activity_groups", {
      title: {
        type: Sequelize.STRING
      },
      email: {
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
  
    return Activity_groups;
  };