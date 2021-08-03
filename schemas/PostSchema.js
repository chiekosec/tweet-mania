const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    content: { type: String, trim: true },
    postedBy: { type: Schema.Types.ObjectId, ref: "User" },
    pinned: Boolean,
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    retweets: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Post || mongoose.model("Post", postSchema);
