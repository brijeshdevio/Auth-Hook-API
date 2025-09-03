import { Router } from "express";
import customerRoute from "./customer.route.js";
import keyRoute from "./key.route.js";
import userRoute from "./user.route.js";

import { authGuard, keyGuard } from "../../middlewares/index.js";

const router = Router();

router.use("/customers", customerRoute);
router.use("/keys", authGuard, keyRoute);
router.use("/users", keyGuard, userRoute);

export default router;
