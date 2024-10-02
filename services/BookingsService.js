import Service from "./Service.js";
import bookingModel from "../models/BookingsModel.js";
import cron from "node-cron";
import moment from "moment-timezone";
import { Booking } from "../models/bookingModels.js";

class BookingService extends Service {
  constructor(model) {
    super(model);
    this.unConfirmedBookings();
  }

  async verifyBooking(body) {
    const booking = await this.model.verifyBooking(body);
    return booking;
  }

  async unConfirmedBookings() {
    //This will run every 59 seconds*/59 * * * * *
    cron.schedule("* */10 * * *", async () => {
      const currentTime = moment().tz("Asia/Karachi").add(1, "hours").format();
      console.log(currentTime);
      const bookings = await this.model.filterUpdateMany(
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
      price: booking.price,
    }));
  }

  async createBooking(object) {
    const booking = await this.model.create(object);
    return this.formatBookings([booking]);
  }

  async getMyBookings(user) {
    const bookings = await this.model.getAll({ user: user });
    return this.formatBookings(bookings);
  }

  async getAllBookings() {
    const bookings = await this.model.getAll();
    return this.formatBookings(bookings);
  }

  async updateBooking(id, data) {
    // Additional business logic can be added here
    const booking = await this.model.findByIdAndUpdate(id, data);
    return this.formatBookings([booking]);
  }

  async deleteBooking(id) {
    // Additional business logic can be added here
    return await this.model.findByIdAndDelete(id);
  }
}

const bookingService = new BookingService(bookingModel);

export default bookingService;
