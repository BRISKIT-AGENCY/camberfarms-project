import mongoose, { Schema } from "mongoose";



const FarmFundSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    residence: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.FarmFund ||
  mongoose.model("FarmFund", FarmFundSchema);
