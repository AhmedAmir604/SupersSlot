class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const reqQuery = { ...this.queryString };
    const excludedTags = ["limit", "page", "sort", "fields"];
    excludedTags.forEach((el) => {
      delete reqQuery[el];
    });
    const queryStr = JSON.stringify(reqQuery).replace(
      /\b(lt|lte|gt|gte)\b/g,
      (m) => `$${m}`
    );
    return this;
  }

  //Imp read this if you want to understand that Get near services using coordinates :D query is built using aggregate and spherical :D
  coord() {
    if (this.queryString.coord) {
      const [long, lat] = this.queryString.coord.split(",");
      const range = this.queryString.range; // here 5000 is = 5km
      console.log(range);
      //no need for miles as we are not angrez just use km as defulat in mul :D
      // const mul = unit === "mi" ? 0.000621371 : 0.001;

      this.query = this.query.model.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [long * 1, lat * 1],
            },
            distanceField: "distance", // Field where computed distance is stored
            distanceMultiplier: 0.001, // Convert to kilometers
            spherical: true, // Use spherical calculations
            maxDistance: range * 1, // Range in meters (5000 meters = 5 km)
          },
        },
        {
          $project: {
            distance: 1,
            name: 1,
            serviceType: 1,
            address: 1,
          },
        },
      ]);
    }
    return this;
  }

  name() {
    // Imp read this if you cant understand what it does
    // .name value is searched rin name, service and city as a search read below too
    // Search by name or service type or city names :D
    //Btw for objects we can just use nested strings as objects in mongoose query :D
    if (this.queryString.name) {
      console.log(this.queryString.name);
      const queryStr = {
        $or: [
          { name: { $regex: this.queryString.name, $options: "i" } },
          { serviceType: { $regex: this.queryString.name, $options: "i" } },
          {
            "address.city": { $regex: this.queryString.name, $options: "i" },
          },
        ],
      };

      this.query = this.query.find(queryStr);
    }
    return this;
  }

  //Sorting
  sort() {
    if (this.queryString.sort) {
      this.query = this.query.sort(this.queryString.sort.split(",").join(" "));
    }
    return this;
  }

  //field limiting
  fields() {
    if (this.queryString.fields) {
      this.query = this.query.select(
        this.queryString.fields.split(",").join(" ")
      );
    }
    return this;
  }

  limit() {
    const limit = this.queryString.limit ? this.queryString.limit * 1 : 6; // Default limit to 6 if not specified
    const page = this.queryString.page ? this.queryString.page * 1 : 1; // Default page to 1 if not specified
    // Apply limit
    this.query = this.query.limit(limit);
    // Apply skip
    this.query = this.query.skip((page - 1) * limit); // Skip results based on the current page

    return this;
  }
}

export default APIFeatures;
