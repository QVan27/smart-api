'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface) => {
    let images = [
      'https://images.unsplash.com/photo-1570126646281-5ec88111777f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1441&q=80',
      'https://images.unsplash.com/photo-1462826303086-329426d1aef5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1325&q=80',
      'https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
    ];

    images = faker.helpers.shuffle(images);

    let names = [
      'Salle Catalyst',
      'Espace Stratégia',
      'Chambre de la Collaboration',
      'Labo des Solutions',
      'Salle Inspire',
    ];

    names = faker.helpers.shuffle(names);

    const rooms = Array.from({ length: 5 }).map(() => ({
      name: names.pop(),
      image: images.pop(),
      floor: faker.helpers.arrayElement(['1er', '2ème', '3ème', '4ème']),
      pointOfContactEmail: faker.internet.email(),
      pointOfContactPhone: faker.phone.number('07 ## ## ## ##'),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Rooms', rooms);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Rooms', null, {});
  }
};