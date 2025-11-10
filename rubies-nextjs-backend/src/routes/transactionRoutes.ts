import express, { Request, Response } from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

// Get all transactions
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// Add a transaction
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const newTransaction = new Transaction(req.body);
    const saved = await newTransaction.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

// Update a transaction
router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

// Delete a transaction
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default router;
