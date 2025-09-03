import { Router } from "express";
import { KeyController } from "../../controllers/index.js";
import { validateRequest } from "../../middlewares/index.js";
import { createSchema, updateSchema } from "../../validation/key.js";
const keyController = new KeyController();

const router = Router();
const valid = validateRequest;
const isValid = validateRequest.isValid("params", "id", "Key");

router.post("/", valid(createSchema), keyController.handleCreateKey);
router.get("/", keyController.handleGetKeys);
router.get("/:id", isValid, keyController.handleGetKey);
router.patch(
  "/:id",
  isValid,
  valid(updateSchema),
  keyController.handleUpdateKey
);
router.delete("/:id", isValid, keyController.handleDeleteKey);

export default router;
