import express from "express";
import { getMembersByClub, addMember, updateMember, deleteMember } from "../controllers/member.controller.js";

const router = express.Router();

router.get("/:clubName", getMembersByClub); // No need for "/members"
router.post("/", addMember);
router.put("/:id", updateMember);
router.delete("/:id", deleteMember);

export default router;
