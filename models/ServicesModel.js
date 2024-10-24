import serviceSchema from "../schemas/serviceSchema.js";
import Model from "../models/Models.js";
import mongoose from "mongoose";

serviceSchema.set("toJSON", {
  transform: function (doc, ret) {
    if (ret.openingHours) {
      const [daysPart, timePart] = ret.openingHours.split(": ");
      const days = daysPart.split("-");
      const time = timePart.split(" - ");

      // Attach computed fields to the returned object
      ret.days = days;
      ret.time = {
        open: time[0],
        close: time[1],
      };
    }
    return ret;
  },
});

const Service = mongoose.model("Service", serviceSchema);
const serviceModel = new Model(Service);

export default serviceModel;
