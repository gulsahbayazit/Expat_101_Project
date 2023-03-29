const { Schema, model } = require("mongoose");

const recommendationSchema = new Schema(
  {
    link: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    imgPath: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },}
  { timestamps: true }
);

const Recommendation = model("Recommendation", recommendationSchema);

module.exports = Recommendation;
