import dotenv from "dotenv";
import fs from "fs";
import mongoose from "mongoose";
import * as url from "url";
import Service from "./models/ServicesModel.js";
import User from "./models/UsersModel.js";
import Review from "./models/ReviewModel.js";
dotenv.config({ path: "./config.env" });

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose.connect(DB).then(() => {
  console.log("Connection with Database Established Successfully!");
});

// const services = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/services.json`, "utf-8")
// );

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/users.json`, "utf-8")
);

const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/reviews.json`, "utf-8")
);

//added suitable roles for noona app using tourtales users :D
const fixedUsers = users.map((el, index) => {
  return {
    ...el,
    role: `${
      index % 2 === 0 ? "employee" : index % 3 === 0 ? "owner" : "user"
    }`,
  };
});

// const fixedServices = services.map((service) => {
//   const pr = service.priceRange.split("-");
//   const fnf = pr[1].split("$");
//   return {
//     ...service,
//     price: `${Number(fnf[1])}`,
//     priceRange: undefined,
//   };
// });

let fixedReviews;
const Services = async () => {
  const services = await Service.find();
  fixedReviews = await Promise.all(
    reviews.map(async (review, index) => {
      return {
        ...review,
        service: `${services[index % 10]._id}`,
        tour: undefined,
      };
    })
  );
  fixedReviews.forEach((element) => {
    console.log(element);
  });
};
// console.log(services);

// just for checking purposes

const importData = async () => {
  try {
    // await Services();
    // await Review.create(fixedReviews, { validationBeforeSave: false });
    // await Service.create(fixedServices, { validationBeforeSave: false });
    await User.create(fixedUsers, { validationBeforeSave: false });
    console.log("Imported!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    // await Service.deleteMany();
    await User.deleteMany();
    console.log("Deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const action = process.argv[2];

if (action === "import") {
  importData();
} else if (action === "delete") {
  deleteData();
} else {
  console.log(
    "Please specify 'import' or 'delete' as a command-line argument."
  );
  process.exit(1);
}
