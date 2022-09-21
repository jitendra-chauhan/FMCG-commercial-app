import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      default: '',
    },
    lastName: {
      type: String,
      default: '',
    },
    commission: {
      type: Number,
      default: 0,
    },
    agent_level: {
      type: String,
      required: true,
      enum: ['COM', 'AD', 'SP', 'SMDL', 'MDL', 'DL'],
    },
    user_name: {
      type: String,
      index: true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      index: true,
      required: true,
      trim: true,
      minlength: 8,
    },
    email_verified_at: {
      type: Date,
      default: null,
    },
    // limit for add agent and playar
    limit: {
      type: Number,
      default: 0,
    },
    whoAdd: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admins',
        default: null,
      },
    ],
    domain: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Websites',
        default: [],
      },
    ],
    // Downline user list
    agent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        default: [],
      },
    ],
    player: [
      {
        type: mongoose.Schema.Types.ObjectId,
        default: [],
      },
    ],
    mobileNumber: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: 'active',
      enum: ['active', 'suspend', 'locked'],
    },
    // total creadited balance
    balance: {
      // available_balance
      type: Number,
      default: 0,
    },
    // total = available_balance - player and agent available_balance
    remaining_balance: {
      type: Number,
      default: 0,
    },
    exposure: {
      type: Number,
      default: 0,
    },
    // pl = profit/lost
    cumulative_pl: {
      type: Number,
      default: 0,
    },
    ref_pl: {
      type: Number,
      default: 0,
    },
    credit_ref: {
      type: Number,
      default: 0,
    },
    exposer_limit: {
      type: Number,
      default: 0,
    },
    rolling_delay: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export = userSchema;
