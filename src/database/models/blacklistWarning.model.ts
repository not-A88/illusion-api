import mongoose from 'mongoose';

export default interface BlacklistWarningSchema extends mongoose.Document {
  blackListNumber: number;
  blackListReason: string;
  createdAt: number;
}

export const BlacklistWarningSchema = new mongoose.Schema(
  {
    blackListNumber: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    blackListReason: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    createdAt: {
      type: mongoose.Schema.Types.Number,
      required: false,
      default: Date.now()
    }
  },
  { _id: false }
);

export const BlacklistWarningModel = mongoose.model('warning', BlacklistWarningSchema, 'warnings');
