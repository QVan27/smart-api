'use strict';

module.exports = {
  up: async (queryInterface) => {
    const role1 = await queryInterface.sequelize.query("SELECT id FROM roles WHERE id = 1", {
      type: queryInterface.sequelize.QueryTypes.SELECT
    });

    const role2 = await queryInterface.sequelize.query("SELECT id FROM roles WHERE id = 2", {
      type: queryInterface.sequelize.QueryTypes.SELECT
    });

    const role3 = await queryInterface.sequelize.query("SELECT id FROM roles WHERE id = 3", {
      type: queryInterface.sequelize.QueryTypes.SELECT
    });

    const users = await queryInterface.sequelize.query("SELECT id, position FROM users", {
      type: queryInterface.sequelize.QueryTypes.SELECT
    });

    const userRoleMappings = users.map(user => ({
      userId: user.id,
      roleId: (user.position === 'manager' && user.id !== 1) ? role2[0].id : role1[0].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    
    if (users.find(user => user.id === 1)) {
      userRoleMappings.push({
        userId: 1,
        roleId: role3[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('user_roles', userRoleMappings, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('user_roles', null, {});
  }
};
