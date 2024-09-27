import dotenv from "dotenv";
import fs from "fs";
import mongoose from "mongoose";
import * as url from "url";
import Service from "./models/serviceModel.js";
import User from "./models/userModel.js";
dotenv.config({ path: "./config.env" });

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose.connect(DB).then(() => {
  console.log("Connection with Database Established Successfully!");
});

const services = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/services.json`, "utf-8")
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/users.json`, "utf-8")
);

//added suitable roles for noona app using tourtales users :D
const fixedUsers = users.map((el, index) => {
  console.log(el.role, index);
  return {
    ...el,
    role: `${
      index % 4 === 0 ? "service-provider" : index % 6 === 0 ? "owner" : "user"
    }`,
  };
});

//just for checking purposes
const printUser = fixedUsers.forEach((element) => {
  console.log(element.role);
});

const importData = async () => {
  try {
    // await Service.create(services, { validationBeforeSave: false });
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
