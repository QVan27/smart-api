const ErrorResponse = require("../utils/errorResponse");
const db = require("../models");
const Booking = db.booking;
const User = db.user;
const Room = db.room;

/**
 * Creates a new booking and associates users with the booking.
 *
 * @async
 * @function createBooking
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body containing the booking data.
 * @param {string} req.body.startDate - Start date of the booking.
 * @param {string} req.body.endDate - End date of the booking.
 * @param {string} req.body.purpose - Purpose of the booking.
 * @param {string} req.body.roomId - ID of the room for the booking.
 * @param {boolean} [req.body.isModerator=false] - Indicates if the user creating the booking is a moderator.
 * @param {string[]} [req.body.userIds=[]] - Array containing the IDs of users to associate with the booking.
 * @param {Object} res - Express response object.
 * @param {Object} next - Express next middleware function.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while creating the booking or if `roomId` is null.
 *
 * @example
 * const newBookingData = {
 *     startDate: "2023-06-24",
 *     endDate: "2023-06-25",
 *     purpose: "Meeting",
 *     roomId: "123456",
 *     isApproved: true,
 *     userIds: ["user1", "user2"]
 * };
 * const req = { body: newBookingData };
 * const res = {
 *     status: function(code) { return this; },
 *     send: function(data) { console.log(data); }
 * };
 * await createBooking(req, res);
 */
exports.createBooking = async (req, res, next) => {
  const { startDate, endDate, purpose, roomId, isApproved = false, userIds = [] } = req.body;

  if (!roomId) {
    return next(new ErrorResponse("roomId cannot be null.", 400));
  }

  try {
    // Create a new booking in the database
    const booking = await Booking.create({ startDate, endDate, purpose, roomId, isApproved });

    // Associate the users with the booking
    if (userIds.length > 0) {
      await booking.addUsers(userIds); // Add users to the booking using the association method
    }

    res.send({ message: "Booking created successfully.", booking: booking });
  } catch (err) {
    next(new ErrorResponse("An error occurred while creating the booking.", 500));
  }
};

/**
 * Updates a booking by its ID and associates users with the booking.
 *
 * @async
 * @function updateBooking
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.bookingId - ID of the booking.
 * @param {Object} req.body - Request body containing updated booking data.
 * @param {string[]} req.body.userIds - Array containing the IDs of users to associate with the booking.
 * @param {Object} res - Express response object.
 * @param {Object} next - Express next middleware function.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while updating the booking.
 *
 * @example
 * const bookingId = "123456";
 * const updatedBookingData = {
 *     startDate: "2023-06-24",
 *     endDate: "2023-06-25",
 *     purpose: "Updated Meeting",
 *     userIds: ["user1", "user2"]
 * };
 * const req = { params: { bookingId: bookingId }, body: updatedBookingData };
 * const res = {
 *     send: function(data) { console.log(data); },
 *     status: function(code) { return this; }
 * };
 * await updateBooking(req, res);
 */
exports.updateBooking = async (req, res, next) => {
  const bookingId = req.params.bookingId;

  try {
    // Update the booking in the database
    const [num] = await Booking.update(req.body, { where: { id: bookingId } });

    // Associate the users with the booking
    if (num === 1 && req.body.userIds && req.body.userIds.length > 0) {
      const booking = await Booking.findByPk(bookingId);
      if (booking) {
        await booking.setUsers(req.body.userIds); // Set the users for the booking using the association method
      }
    }

    if (num === 1) {
      res.send({ message: "Booking updated successfully." });
    } else {
      next(new ErrorResponse("Unable to update the booking with the specified ID. Booking not found or empty data provided.", 404));
    }
  } catch (err) {
    next(new ErrorResponse("An error occurred while updating the booking.", 500));

  }
};

/**
 * Deletes a booking by its ID.
 *
 * @async
 * @function deleteBooking
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.bookingId - ID of the booking.
 * @param {Object} res - Express response object.
 * @param {Object} next - Express next middleware function.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while deleting the booking.
 *
 * @example
 * const bookingId = "123456";
 * const req = { params: { bookingId: bookingId } };
 * const res = {
 *     send: function(data) { console.log(data); },
 *     status: function(code) { return this; }
 * };
 * await deleteBooking(req, res);
 */
exports.deleteBooking = async (req, res, next) => {
  const bookingId = req.params.bookingId;

  try {
    // Delete the booking from the database
    const num = await Booking.destroy({ where: { id: bookingId } });
    if (num === 1) {
      res.send({ message: "Booking deleted successfully." });
    } else {
      next(new ErrorResponse("Unable to delete the booking with the specified ID. Booking not found.", 404));
    }
  } catch (err) {
    next(new ErrorResponse("An error occurred while deleting the booking.", 500));
  }
};

/**
 * Retrieves all bookings with associated users.
 *
 * @async
 * @function getAllBookings
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Object} next - Express next middleware function.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while retrieving the bookings.
 *
 * @example
 * const req = {};
 * const res = {
 *     send: function(data) { console.log(data); }
 * };
 * await getAllBookings(req, res);
 */
exports.getAllBookings = async (req, res, next) => {
  try {
    // Retrieve all bookings from the database, including associated users
    const bookings = await Booking.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'position', 'picture', 'email'] // Include specific user attributes you want to fetch
        },
        {
          model: Room,
          attributes: ['id', 'name'] // Include specific room attributes you want to fetch
        }
      ]
    });

    res.send(bookings);
  } catch (err) {
    next(new ErrorResponse("An error occurred while retrieving the bookings.", 500));
  }
};

/**
 * Retrieves a booking by its ID.
 *
 * @async
 * @function getBookingById
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.bookingId - ID of the booking.
 * @param {Object} res - Express response object.
 * @param {Object} next - Express next middleware function.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while retrieving the booking.
 */
exports.getBookingById = async (req, res, next) => {
  const bookingId = req.params.bookingId;

  try {
    // Retrieve the booking by ID, including associated users
    const booking = await Booking.findByPk(bookingId, {
      include: {
        model: User,
        attributes: ['id', 'firstName', 'lastName', 'position', 'picture', 'email'] // Include specific user attributes you want to fetch
      }
    });

    if (!booking) {
      return next(new ErrorResponse("Booking not found.", 404));
    }

    res.send({ booking });
  } catch (err) {
    next(new ErrorResponse("An error occurred while retrieving the booking.", 500));
  }
};

/**
 * Retrieves all users associated with a booking.
 *
 * @async
 * @function getUsersByBooking
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.bookingId - ID of the booking.
 * @param {Object} res - Express response object.
 * @param {Object} next - Express next middleware function.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while retrieving the booking or the associated users.
 *
 * @example
 * const bookingId = "123456";
 * const req = { params: { bookingId: bookingId } };
 * const res = {
 *     send: function(data) { console.log(data); },
 *     status: function(code) { return this; }
 * };
 * await getUsersByBooking(req, res);
 */
exports.getUsersByBooking = async (req, res, next) => {
  try {
    const bookingId = req.params.bookingId;
    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
      return next(new ErrorResponse("Booking not found.", 404));
    }

    const users = await booking.getUsers();
    res.status(200).send(users);
  } catch (err) {
    next(new ErrorResponse(err.message, 500));
  }
};

/**
 * Approves a booking by its ID (available only for moderator users).
 *
 * @async
 * @function approveBooking
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.bookingId - ID of the booking.
 * @param {Object} res - Express response object.
 * @param {Object} next - Express next middleware function.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while approving the booking.
 */
exports.approveBooking = async (req, res, next) => {
  const bookingId = req.params.bookingId;

  try {
    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
      return next(new ErrorResponse("Booking not found.", 404));
    }

    User.findByPk(req.userId).then(user => {
      user.getRoles().then(roles => {
        let isModerator = false;
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "MODERATOR") {
            isModerator = true;
            break;
          }
        }

        if (!isModerator) {
          return next(new ErrorResponse("You are not authorized to approve bookings.", 403));
        }

        booking.isApproved = true;
        booking.save().then(() => {
          res.send({ message: "Booking approved successfully." });
        }).catch(err => {
          next(new ErrorResponse("An error occurred while approving the booking.", 500));
        });
      });
    });
  } catch (err) {
    next(new ErrorResponse("An error occurred while approving the booking.", 500));
  }
};

/**
 * Removes a user from a booking.
 *
 * @async
 * @function removeUserFromBooking
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.bookingId - ID of the booking.
 * @param {string} req.params.userId - ID of the user to remove.
 * @param {Object} res - Express response object.
 * @param {Object} next - Express next middleware function.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while removing the user from the booking.
 */
exports.removeUserFromBooking = async (req, res, next) => {
  const bookingId = req.params.bookingId;
  const userId = req.params.userId;

  try {
    // Check if the booking exists
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return next(new ErrorResponse("Booking not found.", 404));
    }

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return next(new ErrorResponse("User not found.", 404));
    }

    // Check if the user is associated with the booking
    const users = await booking.getUsers({ where: { id: userId } });
    if (users.length === 0) {
      return next(new ErrorResponse("User is not associated with the booking.", 400));
    }

    // Remove the user from the booking
    await booking.removeUser(user);

    res.send({ message: "User removed from the booking successfully." });
  } catch (err) {
    next(new ErrorResponse("An error occurred while removing the user from the booking.", 500));
  }
};

/**
 * Adds users to a booking.
 *
 * @async
 * @function addUsersToBooking
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.bookingId - ID of the booking.
 * @param {Object} req.body - Request body.
 * @param {string[]} req.body.userIds - Array of user IDs to add.
 * @param {Object} res - Express response object.
 * @param {Object} next - Express next middleware function.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while adding users to the booking.
 */
exports.addUsersToBooking = async (req, res, next) => {
  const bookingId = req.params.bookingId;
  const userIds = req.body.userIds;

  try {
    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
      return next(new ErrorResponse("Booking not found.", 404));
    }

    const users = await User.findAll({ where: { id: userIds } });

    if (users.length !== userIds.length) {
      return next(new ErrorResponse("One or more users not found.", 404));
    }

    await booking.addUsers(users);

    res.send({ message: "Users added to the booking successfully." });
  } catch (err) {
    next(new ErrorResponse("An error occurred while adding users to the booking.", 500));
  }
};