import express from "express";
import { getTransactions } from "../controllers/transactionController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", requireAuth, getTransactions);

export default router;