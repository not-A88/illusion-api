import mongoose from 'mongoose';

export default interface ExecutionSchema extends mongoose.Document {
  exploitName: string;
  successfulExecution: boolean;
  usingFingerPrint: string;
  executedAt: number;
}

export const ExecutionSchema = new mongoose.Schema(
  {
    exploitName: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    successfulExecution: {
      type: mongoose.Schema.Types.Boolean,
      required: false
    },
    usingFingerPrint: {
      type: mongoose.Schema.Types.String,
      required: false
    },
    executedAt: {
      type: mongoose.Schema.Types.Number,
      required: false,
      default: Date.now()
    }
  },
  { _id: false }
);

export const ExecutionModel = mongoose.model('execution', ExecutionSchema, 'executions');
