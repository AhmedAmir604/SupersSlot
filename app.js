import express from "express";
import servicesRotue from "./routes/servicesRoute.js";
import userRoute from "./routes/userRoute.js";
import { errorHandler } from "./controllers/errorController.js";
import cookieParser from "cookie-parser";
import bookingRoute from "./routes/bookingRoute.js";
import reviewsRoute from "./routes/reviewsRoute.js";
import cors from "cors";
import path from "path";
import * as url from "url";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import compression from "compression";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";

dotenv.config({ path: "./config.env" });
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const app = express();

//GLOBAL Middlewares

//Enabling cors for specific domains

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? "http://localhost:5173"
        : "https://supersslot.onrender.com", //For now

    credentials: true,
  })
);
console.log(process.env.NODE_ENV);
//Body parser reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

//RateLimiter rates the amount of requests per ip
const limit = rateLimit({
  limit: 200,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP try again after 1 hour",
});

app.use("/api", limit);

//Use this for data sanitization fight noSQL injections :(
app.use(mongoSanitize());

//Remove XSS attempt removing html tags :D
app.use(xss());

//it remove parameters pollutants
// app.use(
//   hpp({
//     whitelist: [
//       "price",
//       "duration",
//       "ratingsAverage",
//       "difficulty",
//       "maxGroupSize",
//       "ratingsQuantity",
//     ],
//   })
// );

//Set HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://js.stripe.com"],
        frameSrc: ["'self'", "https://js.stripe.com"], // Add this line
        connectSrc: ["'self'", "https://supersslot.onrender.com"], // Add this line
        imgSrc: ["'self'", "data:", "https://images.pexels.com"], // Add this line
        imgSrc: ["'self'", "data:", "https://merakiui.com"], // Add this line
      },
    },
  })
);

//This is used to compress the response
app.use(compression());

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

//For serving static files from bundeld
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/client/dist/index.html"))
);

//TO handle 404 for all routes :D
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Cannt find ${req.originalUrl} Route!`, 404));
});

export default app;
