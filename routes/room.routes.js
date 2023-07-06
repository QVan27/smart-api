const { authJwt } = require("../middleware");
const controller = require("../controllers/room.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/rooms", [authJwt.verifyToken], controller.getAllRooms);
    app.get("/api/rooms/:id", [authJwt.verifyToken], controller.getRoomById);
    app.get("/api/rooms/:roomId/bookings", [authJwt.verifyToken], controller.getBookingsByRoomId);
    app.post("/api/rooms", [authJwt.verifyToken, authJwt.isAdmin], controller.createRoom);
    app.put("/api/rooms/:id", [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.updateRoom);
    app.delete("/api/rooms/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteRoom);
};
