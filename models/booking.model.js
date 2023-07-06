module.exports = (sequelize, Sequelize) => {
    const Booking = sequelize.define("bookings", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        startDate: {
            type: Sequelize.STRING,
            allowNull: false
        },
        endDate: {
            type: Sequelize.STRING,
            allowNull: false
        },
        purpose: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isApproved: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    });

    return Booking;
};
