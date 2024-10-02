import Service from "./Service.js"; // Import the generic service class
import bookingModel from "../models/BookingsModel.js"; // Import your booking model
import moment from "moment-timezone"; // Moment for date manipulation
import cron from "node-cron"; // Cron for scheduling tasks

class BookingService extends Service {
  constructor(model) {
    super(model); // Call the constructor of the parent Service class
    this.unConfirmedBookings(); // Start the unconfirmed bookings process
  }

  // Verify if a booking overlaps with existing bookings
  async verifyBooking(body) {
    const booking = await this.model.verifyBooking(body);
    return booking;
  }

  // Schedule job to cancel unconfirmed bookings
  async unConfirmedBookings() {
    cron.schedule("* */10 * * *", async () => {
      const currentTime = moment().tz("Asia/Karachi").add(1, "hours").format();
      console.log(currentTime);
      await this.updateMany(
        {
          startTime: { $lte: currentTime }, // Filter for bookings starting before the current time
          status: "pending", // Only consider pending bookings
        },
        {
          $set: { status: "cancelled" }, // Update to set status as cancelled
        }
      );
    });
  }

  // Format bookings for output
  formatBookings(bookings) {
    return bookings.map((booking) => ({
      ...booking._doc, // Spread the original booking properties
      startTime: moment(booking.startTime).tz("Asia/Karachi").format(), // Convert to PKT
      endTime: moment(booking.endTime).tz("Asia/Karachi").format(), // Convert to PKT
      createdAt: moment(booking.createdAt).tz("Asia/Karachi").format(), // Convert to PKT
      _id: booking._id,
      service: booking.service,
      user: booking.user,
      status: booking.status,
      price: booking.price,
    }));
  }

  // Create a new booking
  async createBooking(object) {
    const booking = await this.create(object); // Use the create method from the parent class
    return this.formatBookings([booking]); // Format and return the booking
  }

  // Get all bookings for a specific user
  async getMyBookings(user) {
    const bookings = await this.model.getMyBookings(user); // Assuming getMyBookings method exists in model
    return this.formatBookings(bookings); // Format and return the bookings
  }

  // Get all bookings
  async getAllBookings() {
    const bookings = await this.getAll(); // Use the getAll method from the parent class
    return this.formatBookings(bookings); // Format and return the bookings
  }

  // Update a specific booking
  async updateBooking(id, data) {
    const booking = await this.updateOne(id, data); // Use the updateOne method from the parent class
    return this.formatBookings([booking]); // Format and return the updated booking
  }

  // Delete a specific booking
  async deleteBooking(id) {
    return await this.deleteOne(id); // Use the deleteOne method from the parent class
  }
}

// Create an instance of BookingService with the booking model
const bookingService = new BookingService(bookingModel);

export default bookingService;
