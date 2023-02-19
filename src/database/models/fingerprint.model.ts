import mongoose from 'mongoose';

export default interface FingerPrintSchema extends mongoose.Document {
  exploitName: string;
  fingerPrint: string;
  addedAt: number;
}

export const FingerPrintSchema = new mongoose.Schema(
  {
    exploitName: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    fingerPrint: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    addedAt: {
      type: mongoose.Schema.Types.Number,
      required: false,
      default: Date.now()
    }
  },
  { _id: false }
);

export const FingerPrintModel = mongoose.model('fingerprint', FingerPrintSchema, 'fingerprints');
