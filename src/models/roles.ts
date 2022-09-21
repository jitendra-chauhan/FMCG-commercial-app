import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      index: true,
      required: true,
    },
    downline_list: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    my_account: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    downline_report: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    market_report: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    commission_report: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    account_statement: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    bet_list: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    bet_list_live: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    live_casino: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    risk_management: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    player_banking: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    agent_banking: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    sports_leage: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    add_balance: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    add_agent: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    add_player: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    casino_manage: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    sports_main_market: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    manage_fancy: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    manage_website: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    match_history: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    fancy_history: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    manage_premium: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    premium_history: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    manage_dashboard_images: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    privileges: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    banner: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    manage_casino: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
    deletable: {
      type: Number,
      default: 0,
      enum: [0, 1],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = roleSchema;
