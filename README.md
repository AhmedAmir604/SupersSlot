
# Under Development 🔨
# SuperSlot

SuperSlot is a full-stack booking platform built using the MERN (MongoDB, Express, React, Node.js) stack. Inspired by Noona, this platform is designed to streamline appointment booking for salons, barbers, and other service-based businesses. SuperSlot helps users book appointments, manage schedules, and track services with ease.

## Features

- **User-Friendly Interface**: Simple, intuitive design for both customers and service providers.
- **Booking System**: Customers can easily browse available slots and book appointments in just a few clicks.
- **Service Management**: Service providers can create, edit, and remove services from their profiles.
- **Schedule Management**: Providers can manage their availability, block off times, and track their daily appointments.
- **Payment Integration**: Integration with payment gateways for secure and seamless payments.
- **Notifications**: Automated email notifications to keep users updated about their bookings and reminders.

## Tech Stack

- **Frontend**: React.js with TailwindCSS for a responsive and visually appealing UI.
- **Backend**: Node.js, Express.js for the server-side functionality.
- **Database**: MongoDB for storing user data, bookings, and service information.
- **Authentication**: JWT-based authentication for user login and sign-up.
- **Email Service**: Resend for sending booking confirmation and reminders.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/superslot.git
   ```

2. **Install dependencies**:

   - Backend:
     ```bash
     cd backend
     npm install
     ```

   - Frontend:
     ```bash
     cd frontend
     npm install
     ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and provide the following:
   ```bash
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   RESEND_API_KEY=your_resend_api_key
   ```

4. **Start the development servers**:

   - Backend:
     ```bash
     cd backend
     npm run dev
     ```

   - Frontend:
     ```bash
     cd frontend
     npm start
     ```

5. **Access the app**: Open your browser and navigate to `http://localhost:3000`.

## Usage

### For Customers:
- Sign up or log in.
- Browse through available services.
- Choose a service provider, select a time slot, and confirm the booking.
- Receive a confirmation email and reminders before the appointment.

### For Service Providers:
- Sign up or log in.
- Set up your profile with the services you offer.
- Manage your availability and appointments through a dashboard.
- Accept or decline bookings and update your schedule in real-time.

## Contributing

Contributions are welcome! If you have any ideas or feature requests, please open an issue or submit a pull request.

