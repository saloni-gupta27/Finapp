import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import {
  getAccounts,
  createAccount,
  transferFunds,
  depositToAccount
} from "../controllers/accountController.js";

const router = express.Router();

router.use(requireAuth); // protect all routes

router.get("/", getAccounts);
router.post("/", createAccount);
router.post("/transfer", transferFunds);
router.post("/:id/deposit", depositToAccount);

export default router;
