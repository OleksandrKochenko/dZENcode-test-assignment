const { Schema, model } = require("mongoose");
const { requiredMessage } = require("../helpers/constants");
const handleMongooseError = require("../middlewares/handle-mongoose-error");

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, requiredMessage],
    },
    img: {
      type: String,
    },
    text_file: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    thread_of: {
      type: Schema.Types.ObjectId,
      ref: "comment",
    },
  },
  { versionKey: false, timestamps: true }
);

commentSchema.post("save", handleMongooseError);

const Comment = model("comment", commentSchema);

module.exports = Comment;
