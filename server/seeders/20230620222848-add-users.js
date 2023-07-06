'use strict';
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => {
    const passwordAdmin = "admin";
    const passwordModerator = "moderator";
    const passwordUser = "user";
    const hashedPasswordAdmin = bcrypt.hashSync(passwordAdmin, 8);
    const hashedPasswordModerator = bcrypt.hashSync(passwordModerator, 8);
    const hashedPasswordUser = bcrypt.hashSync(passwordUser, 8);

    const admin = {
      firstName: "Quentin",
      lastName: "Vannarath",
      email: "admin@smart.com",
      position: "developer",
      picture: faker.helpers.arrayElement(['https://avatars.githubusercontent.com/u/62435641']),
      password: hashedPasswordAdmin,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const modo = {
      firstName: "John",
      lastName: "Doe",
      email: "moderator@smart.com",
      position: "manager",
      picture: faker.helpers.arrayElement(['https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80']),
      password: hashedPasswordModerator,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const user = {
      firstName: "Jane",
      lastName: "Doe",
      email: "user@smart.com",
      position: "designer",
      picture: faker.helpers.arrayElement(['https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80']),
      password: hashedPasswordUser,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const users = Array.from({ length: 30 }).map(() => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@smart.com`;

      return {
        firstName,
        lastName,
        email,
        position: faker.helpers.arrayElement(["developer", "designer", "marketing", "UX/UI", "manager"], { min: 1, max: 1 }),
        picture: faker.image.avatar(),
        password: bcrypt.hashSync('password123', 8),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    const allUsers = [admin, modo, user, ...users];

    await queryInterface.bulkInsert('Users', allUsers);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};