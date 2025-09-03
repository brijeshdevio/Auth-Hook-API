import { Router } from "express";
import { CustomerController } from "../../controllers/index.js";
import { authGuard, validateRequest } from "../../middlewares/index.js";
import { createSchema, loginSchema } from "../../validation/customer.js";

const customerController = new CustomerController();

const router = Router();
const valid = validateRequest;

router.post(
  "/signup",
  valid(createSchema),
  customerController.handleCreateCustomer
);
router.post(
  "/login",
  valid(loginSchema),
  customerController.handleLoginCustomer
);
router.get("/me", authGuard, customerController.handleGetCustomer);

export default router;
