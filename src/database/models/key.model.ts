import mongoose from 'mongoose';
import Execution, { ExecutionSchema } from './execution.model';
import BlacklistWarning, { BlacklistWarningSchema } from './blacklistWarning.model';
import FingerPrint, { FingerPrintSchema } from './fingerprint.model';

export default interface KeySchema extends mongoose.Document {
  key: string;
  fingerPrint: FingerPrint[];
  ip?: string;
  discordID: string;
  blackList: boolean;
  blackListWarningNum: number;
  blackList_reason: BlacklistWarning[];
  execution: Execution[];
  createdAt: number;
  //updatedAt: number;
}

const KeySchema = new mongoose.Schema({
  key: {
    type: mongoose.Schema.Types.String,
    unique: true,
    required: true
  },
  fingerPrint: [
    {
      type: FingerPrintSchema,
      required: false,
      default: null
    }
  ],
  ip: {
    type: mongoose.Schema.Types.String,
    required: false,
    default: null
  },
  discordID: {
    type: mongoose.Schema.Types.String,
    unique: true,
    required: true
  },
  blackList: {
    type: mongoose.Schema.Types.Boolean,
    required: false,
    default: false
  },
  blackListWarningNum: {
    type: mongoose.Schema.Types.Number,
    required: false,
    default: 0
  },
  blackList_reason: [
    {
      type: BlacklistWarningSchema,
      required: false,
      default: null
    }
  ],
  execution: [
    {
      type: ExecutionSchema,
      required: false,
      default: null
    }
  ],
  createdAt: {
    type: mongoose.Schema.Types.Number,
    required: false,
    default: Date.now()
  }
  /*
  updatedAt: {
    type: mongoose.Schema.Types.Number,
    select: false,
    required: false,
    default: Date.now()
  }
  */
});

export const KeyModel = mongoose.model('key', KeySchema, 'keys');
