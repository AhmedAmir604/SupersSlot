import { bookingModel } from "../models/bookingModels.js";
import cron from "node-cron";
import moment from "moment-timezone";

class BookingService {
  constructor(Model) {
    this.bookingModel = Model;
    this.unConfirmedBookings();
  }
  async verifyBooking(body) {
    const booking = await this.bookingModel.verifyBooking(body);
    return booking;
  }

  async unConfirmedBookings() {
    //This will run every 59 seconds*/59 * * * * *
    cron.schedule("* */10 * * *", async () => {
      const currentTime = moment().tz("Asia/Karachi").add(1, "hours").format();
      console.log(currentTime);
      const bookings = await this.bookingModel.unConfirmedBookings(
        {
          startTime: { $lte: currentTime }, // Filter condition
          status: "pending", // Filter condition
        },
        {
          $set: { status: "cancelled" }, // Update operation: set the status to "cancelled"
        }
      );
    });
  }

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
    }));
  }

  async createBooking(object) {
    const booking = await this.bookingModel.createBooking(object);
    return this.formatBookings([booking]);
  }

  async getMyBookings(user) {
    const bookings = await this.bookingModel.getMyBookings(user);
    return this.formatBookings(bookings);
  }

  async getAllBookings() {
    const bookings = await this.bookingModel.getAll();
    return this.formatBookings(bookings);
  }

  async updateBooking(id, data) {
    // Additional business logic can be added here
    const booking = await this.bookingModel.updateOne(id, data);
    return this.formatBookings([booking]);
  }

  async deleteBooking(id) {
    // Additional business logic can be added here
    return await this.bookingModel.deleteOne(id);
  }
}

export const bookingService = new BookingService(bookingModel);
