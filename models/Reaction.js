const { Schema, model } = require("mongoose");

const reactionSchema = new Schema({
  //ask about this
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId,
  },
  reactionBody: {
      type: String,
      required: true,
      max_length: 280
  },
  username: {
      type: String,
      required: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports= reactionSchema;
