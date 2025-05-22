import express from "express";
import { register, login, changePassword } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/dashboard", requireAuth, (req, res) => {
    res.json({ message: "Welcome!", user: req.user });
  });


router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
});

router.get("/profile", requireAuth, (req, res) => {
    res.json({ user: req.user });
  });
  
router.put("/change-password", requireAuth, changePassword);

export default router;
