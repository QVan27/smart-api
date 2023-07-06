const ErrorResponse = require("../utils/errorResponse");
const db = require("../models");
const Room = db.room;
const Booking = db.booking;
const User = db.user;

/**
 * Creates a new room.
 *
 * @async
 * @function createRoom
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body containing room data.
 * @param {string} req.body.name - Name of the room.
 * @param {string} req.body.image - Image URL of the room.
 * @param {string} req.body.floor - Floor of the room.
 * @param {string} req.body.pointOfContactEmail - Email address of the point of contact for the room.
 * @param {string} req.body.pointOfContactPhone - Phone number of the point of contact for the room.
 * @param {Object} res - Express response object.
 * @param {Object} next - Express next middleware function.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while creating the room.
 *
 * @example
 * const newRoomData = {
 *     name: "Conference Room",
 *     image: "room.jpg",
 *     floor: "2nd floor",
 *     pointOfContactEmail: "contact@example.com",
 *     pointOfContactPhone: "1234567890"
 * };
 * const req = { body: newRoomData };
 * const res = {
 *     status: function(code) { return this; },
 *     send: function(data) { console.log(data); }
 * };
 * await createRoom(req, res);
 */
exports.createRoom = async (req, res, next) => {
  // Check if all required data is present
  if (!req.body.name || !req.body.image || !req.body.floor || !req.body.pointOfContactEmail || !req.body.pointOfContactPhone) {
    return next(new ErrorResponse("All data must be provided!", 400));
  }

  // Create a new Room instance with the provided data
  const room = {
    name: req.body.name,
    image: req.body.image,
    floor: req.body.floor,
    pointOfContactEmail: req.body.pointOfContactEmail,
    pointOfContactPhone: req.body.pointOfContactPhone
  };

  try {
    // Save the room to the database
    const data = await Room.create(room);
    res.send(data);
  } catch (err) {
    next(new ErrorResponse("An error occurred while creating the room.", 500));
  }
};

/**
 * Retrieves all rooms.
 *
 * @async
 * @function getAllRooms
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Object} next - Express next middleware function.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while retrieving the rooms.
 *
 * @example
 * const req = {};
 * const res = {
 *     send: function(data) { console.log(data); }
 * };
 * await getAllRooms(req, res);
 */
exports.getAllRooms = async (req, res, next) => {
  try {
    // Retrieve all rooms from the database
    const data = await Room.findAll();
    res.send(data);
  } catch (err) {
    // res.status(500).send({ message: err.message || "An error occurred while retrieving the rooms." });
    next(new ErrorResponse("An error occurred while retrieving the rooms.", 500));
    
  }
};

/**
 * Retrieves a room by its ID.
 *
 * @async
 * @function getRoomById
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.id - ID of the room.
 * @param {Object} res - Express response object.
 * @param {Object} next - Express next middleware function.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while retrieving the room.
 *
 * @example
 * const roomId = "123456";
 * const req = { params: { id: roomId } };
 * const res = {
 *     send: function(data) { console.log(data); },
 *     status: function(code) { return this; }
 * };
 * await getRoomById(req, res);
 */
exports.getRoomById = async (req, res, next) => {
  const id = req.params.id;

  try {
    // Retrieve a room by its ID from the database
    const data = await Room.findByPk(id);
    if (data) {
      res.send(data);
    } else {
      next(new ErrorResponse("Room not found with the specified ID.", 404));
    }
  } catch (err) {
    next(new ErrorResponse("An error occurred while retrieving the room.", 500));
  }
};

/**
 * Updates a room by its ID.
 *
 * @async
 * @function updateRoom
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.id - ID of the room.
 * @param {Object} req.body - Request body containing updated room data.
 * @param {Object} res - Express response object.
 * @param {Object} next - Express next middleware function.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while updating the room.
 *
 * @example
 * const roomId = "123456";
 * const updatedRoomData = {
 *     name: "Updated Room",
 *     floor: "1er"
 * };
 * const req = { params: { id: roomId }, body: updatedRoomData };
 * const res = {
 *     send: function(data) { console.log(data); },
 *     status: function(code) { return this; }
 * };
 * await updateRoom(req, res);
 */
exports.updateRoom = async (req, res, next) => {
  const id = req.params.id;

  try {
    // Update the room in the database
    const num = await Room.update(req.body, { where: { id: id } });
    if (num == 1) {
      res.send({ message: "Room updated successfully." });
    } else {
      next(new ErrorResponse(`Unable to update the room with the specified ID. Room not found or empty data provided.`, 404));
    }
  } catch (err) {
    next(new ErrorResponse("An error occurred while updating the room.", 500));
  }
};

/**
 * Deletes a room by its ID.
 *
 * @async
 * @function deleteRoom
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.id - ID of the room.
 * @param {Object} res - Express response object.
 * @param {Object} next - Express next middleware function.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while deleting the room.
 *
 * @example
 * const roomId = "123456";
 * const req = { params: { id: roomId } };
 * const res = {
 *     send: function(data) { console.log(data); },
 *     status: function(code) { return this; }
 * };
 * await deleteRoom(req, res);
 */
exports.deleteRoom = async (req, res, next) => {
  const id = req.params.id;

  try {
    // Delete the room from the database
    const num = await Room.destroy({ where: { id: id } });
    if (num == 1) {
      res.send({ message: "Room deleted successfully." });
    } else {
      next(new ErrorResponse(`Unable to delete the room with the specified ID. Room not found.`, 404));
    }
  } catch (err) {
    next(new ErrorResponse("An error occurred while deleting the room.", 500));
  }
};

/**
 * Retrieves all bookings belonging to a room.
 *
 * @async
 * @function getBookingsByRoomId
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.roomId - ID of the room.
 * @param {Object} res - Express response object.
 * @param {Object} next - Express next middleware function.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while retrieving the bookings.
 *
 * @example
 * const roomId = "123456";
 * const req = { params: { roomId: roomId } };
 * const res = {
 *     send: function(data) { console.log(data); },
 *     status: function(code) { return this; }
 * };
 * await getBookingsByRoomId(req, res);
 */
exports.getBookingsByRoomId = async (req, res, next) => {
  const roomId = req.params.roomId;

  try {
    // Retrieve all bookings belonging to a room from the database
    const bookings = await Booking.findAll({
      where: { roomId: roomId }, include: {
        model: User,
        attributes: ['id', 'position', 'picture', 'email'] // Include specific user attributes you want to fetch
      }
    });
    res.send(bookings);
  } catch (err) {
    next(new ErrorResponse("An error occurred while retrieving the bookings.", 500));
  }
};