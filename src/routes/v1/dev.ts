import { DevController } from "../../controllers";
import { Router } from "express";
import { updateSchema } from "../../validation/auth";
import { validateMiddleware } from "../../middlewares";

const controller = new DevController();

const router = Router();

const validate = validateMiddleware;

router.get("/me", controller.handleGetDev);
router.patch("/me", validate(updateSchema), controller.handleUpdateDev);
router.post("/logout", controller.handleLogoutDev);
router.delete("/delete", controller.handleDeleteDev);

export default router;
