module.exports = (sequelize, Sequelize) => {
    const Room = sequelize.define("rooms", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        image: {
            type: Sequelize.STRING,
            allowNull: false
        },
        floor: {
            type: Sequelize.STRING,
            allowNull: false
        },
        pointOfContactEmail: {
            type: Sequelize.STRING,
            allowNull: false
        },
        pointOfContactPhone: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Room;
};
