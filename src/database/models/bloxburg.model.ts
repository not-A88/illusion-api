import mongoose from 'mongoose';

export default interface BloxburgSchema extends mongoose.Document {
  baseID: string;
  baseJson: string;
  addedAt: number;
}

export const BloxburgSchema = new mongoose.Schema(
  {
    baseID: {
      type: mongoose.Schema.Types.String,
      unique: true,
      required: true
    },
    baseJson: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    addedAt: {
      type: mongoose.Schema.Types.Number,
      required: false,
      default: Date.now()
    }
  },
);

export const BloxBurgModel = mongoose.model('bloxburg', BloxburgSchema, 'bloxburgs');
