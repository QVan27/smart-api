const { authJwt } = require("../middleware");
const controller = require("../controllers/booking.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/bookings", [authJwt.verifyToken], controller.getAllBookings);
    app.get("/api/bookings/:bookingId", [authJwt.verifyToken], controller.getBookingById);
    app.get("/api/bookings/:bookingId/users", [authJwt.verifyToken], controller.getUsersByBooking);
    app.post("/api/bookings", [authJwt.verifyToken], controller.createBooking);
    app.post("/api/bookings/:bookingId/users", [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.addUsersToBooking);
    app.put("/api/bookings/:bookingId", [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.updateBooking);
    app.put('/api/bookings/:bookingId/approve', [authJwt.verifyToken, authJwt.isModerator], controller.approveBooking);
    app.delete("/api/bookings/:bookingId", [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.deleteBooking);
    app.delete("/api/bookings/:bookingId/users/:userId", [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.removeUserFromBooking);
};