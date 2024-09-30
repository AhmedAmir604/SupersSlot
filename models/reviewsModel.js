import { reviewsSchema } from "../schemas/reviewsSchema.js";

//For allowing user to give on review each service :)
// reviewsSchema.index({ user: 1, service: 1 }, { unique: true });

reviewsSchema.pre(/^find/, function (next) {
  this.populate(["user", "service"]);
  next();
});
