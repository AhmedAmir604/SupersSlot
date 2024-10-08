import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { convert } from "html-to-text";
import * as url from "url";
import Handlebars from "handlebars";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export default class Email {
  constructor(user, options) {
    this.from = `Your Service <${process.env.EMAIL_FROM}>`;
    this.to = user.email;
    this.options = options;
    this.firstName = user.name.split(" ")[0];
    console.log(this.options);
  }

  createTransporter() {
    if (process.env.NODE_ENV === "development") {
      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
    } else {
      console.log("In Production");
      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST_MAILERSEND,
        port: process.env.EMAIL_PORT_MAILERSEND,
        secure: false,
        auth: {
          user: process.env.MAILERSEND_USER,
          pass: process.env.MAILERSEND_PASSWORD,
        },
      });
    }
  }

  async send(templateName, subject) {
    // Path to the template file
    const templatePath = path.join(
      __dirname,
      `../views/EmailTemplates/${templateName}`
    );

    // Read the HTML template
    const htmlTemplate = fs.readFileSync(templatePath, "utf-8");

    // Compile the template using Handlebars
    const template = Handlebars.compile(htmlTemplate);

    // Create the final HTML by passing the variables
    const html = template({
      firstName: this.firstName,
      options: this.options,
    });

    // Convert the HTML to plain text for the email body
    const text = convert(html, {
      wordwrap: 130,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text,
    };

    try {
      await this.createTransporter().sendMail(mailOptions);
      console.log("SUCCESS");
      return true;
    } catch (err) {
      console.log(err);
      throw Error(err.message || "Something went wrong");
    }
  }

  sendWelcome() {
    return this.send("welcomeEmail.html", "Welcome to The Site!");
  }

  sendPasswordResetLink() {
    return this.send(
      "resetPasswordLink.html",
      "Reset Your Password Using this Link!"
    );
  }

  sendBookingConfirmation() {
    return this.send(
      "bookingConfirmation.html",
      "Please Confirm Your Upcoming Booking :D"
    );
  }

  sendBooking() {
    return this.send("booking.html", "We Recieved Your Booking Horahh...");
  }

  sendConfirmationEmail() {
    return this.send("bookingConfirmation.html", "Verify Your Booking!");
  }
}
