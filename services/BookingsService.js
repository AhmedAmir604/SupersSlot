import Service from "./Service.js";
import bookingModel from "../models/BookingsModel.js";
import cron from "node-cron";
import moment from "moment-timezone";
import Email from "../utils/email.js";

class BookingService extends Service {
  constructor(model) {
    super(model);
    this.unConfirmedBookings();
    //Below method send Email to need to run unecessary as the trial is limited
    // this.bookingConfirmEmail();
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
      const currentTime = moment().tz("Asia/Karachi").add(2, "hours").format();
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

  async bookingConfirmEmail() {
    cron.schedule("*/10 * * * * *", async () => {
      const currentTime = moment().tz("Asia/Karachi").add(3, "hours").format();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      console.log(`Email sent 3 hours prior`, currentTime);
      const bookings = await this.model.findBookings({
        startTime: { $lte: currentTime },
        endTime: { $lte: endOfDay },
        status: "pending",
      });
      await Promise.all(
        bookings.forEach(async (booking) => {
          const options = {
            serviceName: booking.service.name,
            serviceType: booking.service.serviceType,
            startTime: booking.startTime,
          };
          await new Email(booking.user, options).sendConfirmationEmail();
        })
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

  //We can access these curd method from the super class Service which then access from Model or directly from Model of which we have created Object of using this constructor :)
  async create(data) {
    const booking = await this.model.create(data);
    const bookingOptions = {
      serviceName: booking.service.name,
      serviceType: booking.service.serviceType,
      user: booking.user,
      startTime: booking.startTime,
      endTime: booking.endTime,
      price: booking.price,
      status: booking.status,
    };
    await new Email(booking.user, bookingOptions).sendBooking();
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

  // async unavailableBookings(service) {
  //   return await this.model.unavailableBookings(service);
  // }

  async unavailableBookings(service, date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    console.log(startOfDay);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    return await this.model.find({
      service,
      startTime: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      status: { $nin: ["cancelled", "completed"] },
    });
  }
}

const bookingService = new BookingService(bookingModel);

export default bookingService;
