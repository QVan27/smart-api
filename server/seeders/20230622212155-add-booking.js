'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface) => {
    const rooms = await queryInterface.sequelize.query("SELECT id FROM Rooms", {
      type: queryInterface.sequelize.QueryTypes.SELECT
    });

    for (const room of rooms) {
      const bookings = Array.from({ length: 10 }).map(() => ({
        startDate: faker.date.future(),
        endDate: faker.date.future(),
        purpose: faker.helpers.arrayElement(['UX/UI et Développement : Synergies créatives', 'Agilité et Collaboration : Design + Dev', 'Stratégies UX pour les Développeurs', 'Alignement Design/Dev : Réunion de Coordination', 'Innovation Technologique et Expérience Utilisateur', 'Optimisation UI/UX : Actions Concrètes', `Design et Développement : Ensemble vers l'Excellence`, 'Leadership en Design & Développement', 'Convergence Design/Dev : Tendances et Opportunités', 'Évaluer la Performance : UI/UX & Développement']),
        roomId: room.id,
        isApproved: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      await queryInterface.bulkInsert('bookings', bookings, {});

      const createdBookings = await queryInterface.sequelize.query("SELECT id FROM bookings WHERE roomId = :roomId", {
        replacements: { roomId: room.id },
        type: queryInterface.sequelize.QueryTypes.SELECT
      });

      for (const createdBooking of createdBookings) {
        const users = await queryInterface.sequelize.query("SELECT id FROM Users", {
          type: queryInterface.sequelize.QueryTypes.SELECT
        });

        const randomUserIds = faker.helpers.arrayElements(users.map(user => user.id)).slice(0, faker.number.int({ min: 2, max: 30 }));

        const bookingUserAssociations = randomUserIds.map(userId => ({
          userId: userId,
          bookingId: createdBooking.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));

        await queryInterface.bulkInsert('user_bookings', bookingUserAssociations, {});

        if (faker.datatype.boolean()) {
          await queryInterface.sequelize.query("UPDATE bookings SET isApproved = true WHERE id = :id", {
            replacements: { id: createdBooking.id },
            type: queryInterface.sequelize.QueryTypes.UPDATE
          });
        }
      }
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('user_bookings', null, {});
    await queryInterface.bulkDelete('bookings', null, {});
  }
};