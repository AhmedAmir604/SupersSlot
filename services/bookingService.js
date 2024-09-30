import { bookingModel } from "../models/bookingModels.js";

class BookingService {
  constructor(Model) {
    this.bookingModel = Model;
  }
  async verifyBooking(body) {
    const booking = await this.bookingModel.verifyBooking(body);
    return booking;
  }

  async createBooking(object) {
    return await this.bookingModel.createBooking(object);
  }

  async getMyBookings(user) {
    return await this.bookingModel.getMyBookings(user);
  }

  async getAllBookings() {
    return await this.bookingModel.getAll();
  }

  async updateBooking(id, data) {
    // Additional business logic can be added here
    return await this.bookingModel.updateOne(id, data);
  }

  async deleteBooking(id) {
    // Additional business logic can be added here
    return await this.bookingModel.deleteOne(id);
  }
}

export const bookingService = new BookingService(bookingModel);
