import mongoose, { Document, Schema } from "mongoose";

export interface ITransaction extends Document {
  amount: number;
  description: string;
  date: Date;
}

const transactionSchema = new Schema<ITransaction>({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Collection name is "data"
const Transaction = mongoose.model<ITransaction>("Transaction", transactionSchema, "data");
export default Transaction;
