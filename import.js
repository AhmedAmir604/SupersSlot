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

// const servicess = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/services.json`, "utf-8")
// );

// const users = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/users.json`, "utf-8")
// );

const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/reviews.json`, "utf-8")
);

const services = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/Noona.services.json`, "utf-8")
);

//added suitable roles for noona app using tourtales users :D
// const fixedUsers = users.map((el, index) => {
//   return {
//     ...el,
//     role: `${
//       index % 2 === 0 ? "employee" : index % 3 === 0 ? "owner" : "user"
//     }`,
//   };
// });

// const fixedServices = services.map((service) => {
//   const pr = service.priceRange.split("-");
//   const fnf = pr[1].split("$");
//   return {
//     ...service,
//     price: `${Number(fnf[1])}`,
//     priceRange: undefined,
//   };
// });

//Some modification for the services idk what but will see later
// let fixedReviews;
// const Services = async () => {
//   const services = await Service.find();
//   fixedReviews = await Promise.all(
//     reviews.map(async (review, index) => {
//       return {
//         ...review,
//         service: `${services[index % 10]._id}`,
//         tour: undefined,
//       };
//     })
//   );
//   fixedReviews.forEach((element) => {
//     console.log(element);
//   });
// };
// console.log(services);

const users = await User.find();

// Filter users to get only those with the role "employee"
const employees = users.filter((user) => user.role === "employee");

const fixedServices = services.map((service) => {
  // Handle cases where owner might not have a $oid field
  const ownerId =
    service.owner && service.owner.$oid ? service.owner.$oid : service.owner;

  // Return the modified object, excluding _id and createdAt if they exist
  const { _id, createdAt, ...rest } = service;

  // Shuffle the employees array to randomize selection
  const shuffledEmployees = employees.sort(() => 0.5 - Math.random());

  // Take the first 3 employees
  const selectedEmployees = shuffledEmployees.slice(0, 3).map((emp) => emp.id);

  return {
    ...rest,
    _id: undefined,
    createdAt: undefined,
    owner: ownerId,
    employees: selectedEmployees,
  };
});

fixedServices.forEach((el) => {
  console.log(el);
});

const importData = async () => {
  try {
    // await Services();
    // await Review.create(fixedReviews, { validationBeforeSave: false });
    await Service.create(fixedServices, { validationBeforeSave: false });
    // await User.create(fixedUsers, { validationBeforeSave: false });
    console.log("Imported!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Service.deleteMany();
    // await User.deleteMany();
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
