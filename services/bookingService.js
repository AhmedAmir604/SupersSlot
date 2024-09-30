import { bookingModel } from "../models/bookingModels.js";

class BookingService {
  async verifyBooking(body) {
    const booking = await bookingModel.verifyBooking(body);
    return booking;
  }

  async createBooking(object) {
    return await bookingModel.createBooking(object);
  }
}

export const bookingService = new BookingService();
