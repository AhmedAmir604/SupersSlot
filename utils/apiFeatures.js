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

  name() {
    // Search by name (product)
    if (this.queryString.name) {
      const queryStr = {
        $or: [
          { name: { $regex: this.queryString.name, $options: "i" } },
          { serviceType: { $regex: this.queryString.name, $options: "i" } },
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
