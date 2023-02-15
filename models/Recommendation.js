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
    // comment: {
    //   type: String,
    // },
    // rate: {
    //   type: Number,
    //   min: 1,
    //   max: 5,
    //   required: true,
    // },
  },
  // this second object adds extra properties: `createdAt` and `updatedAt`
  { timestamps: true }
);

const Recommendation = model("Recommendation", recommendationSchema);

module.exports = Recommendation;
