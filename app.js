import express from "express";
import servicesRotue from "./routes/servicesRoute.js";
import userRoute from "./routes/userRoute.js";
import { errorHandler } from "./controllers/errorController.js";
import cookieParser from "cookie-parser";
import bookingRoute from "./routes/bookingRoute.js";
import reviewsRoute from "./routes/reviewsRoute.js";
import cors from "cors";

const app = express();

//GLOBAL Middlewares

//Enabling cors for specific domains

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? "http://localhost:5173"
        : // : "https://tt-pro.onrender.com",
          "http://localhost:5173", //For now

    credentials: true,
  })
);

//Body parser reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

//Testing middlewares
app.use((req, res, next) => {
  req.Time = new Date().toISOString();
  console.log(req.Time);
  next();
});

//Cookie parser so we can have access to cookie easily cause we cant directly manipulate and access the cookie as it is sent in cookie = 'jwt=key' format on every request
app.use(cookieParser());

//Routes
app.use("/api/v1/services", servicesRotue);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/bookings", bookingRoute);
app.use("/api/v1/reviews", reviewsRoute);

//Use for listening error all error even made by my class ErrorHandler provided by default express js
app.use(errorHandler);

export default app;
