import { AppController } from "../../controllers";
import { Router } from "express";
import { validateMiddleware } from "../../middlewares";
const controller = new AppController();

const router = Router();

const isValid = validateMiddleware.isValid("params", "appId", "App");

router.post("/", controller.handleCreateApp);
router.get("/", controller.handleGetApps);
router.get("/:appId", isValid, controller.handleGetApp);
router.delete("/:appId", isValid, controller.handleDeleteApp);
router.post("/:appId/rotate-key", isValid, controller.handleRotateApp);

export default router;
