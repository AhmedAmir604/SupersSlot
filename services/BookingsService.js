import Service from "./Service.js";
import bookingModel from "../models/BookingsModel.js";
import cron from "node-cron";
import moment from "moment-timezone";

class BookingService extends Service {
  constructor(model) {
    super(model);
    this.unConfirmedBookings();
  }

  async verifyBooking(body) {
    const booking = await this.model.verifyBooking(body);
    if (booking.length > 0) {
      return true;
    }
    return false;
  }

  async unConfirmedBookings() {
    //This will run every 59 seconds*/59 * * * * *
    cron.schedule("* */1 * * *", async () => {
      const currentTime = moment().tz("Asia/Karachi").add(1, "hours").format();
      console.log(currentTime);
      const bookings = await this.updateMany(
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

  formatDates(bookings) {
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

  //We can access these curd method from the super class Service which then access from Model or directly from Model of which we have created Object of using thsi constructor :)
  async create(data) {
    const booking = await this.model.create(data);
    return this.formatDates([booking]);
  }

  async getAll(req) {
    const bookings = await super.getAll(req);
    return this.formatDates(bookings);
  }

  async getMy(filter, selections = "") {
    const bookings = await super.find(filter, selections);
    return this.formatDates(bookings);
  }

  async getOne(id) {
    const booking = await super.getOne(id);
    return this.formatDates([booking]);
  }

  async updateOne(id, data) {
    const booking = await super.updateOne(id, data);
    return this.formatDates([booking]);
  }

  async deleteOne(id) {
    return await super.deleteOne(id);
  }
}

const bookingService = new BookingService(bookingModel);

export default bookingService;
