const mongoose = require('mongoose');
const { Schema } = mongoose;

const notesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    body: {
      type: String,
    },
    label: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Notes = mongoose.model('Notes', notesSchema);
module.exports = Notes;
