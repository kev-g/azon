import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  desc: String,
  name: String,
  creator: String,
  town: String,
  flat_type: String,
  block: String,
  street_name: String,
  //storeyRange: String,
  floor_area_sqm: String,
  flat_model: String,
 // leaseStartDate: String,
  remaining_lease: String,
  resale_price: String,
 // tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// "listings is the name of the table in DB", postListing will communicate with the controller
const postListing = mongoose.model("listings", postSchema);

export default postListing;
