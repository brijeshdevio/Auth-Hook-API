import { CustomerService } from "../services/index.js";
import { signCookie, response } from "../utils/index.js";

class CustomerController extends CustomerService {
  constructor() {
    super();
  }

  handleCreateCustomer = async (req, res) => {
    const customer = await this.createCustomer(req.body);
    response(res, 201, customer);
  };

  handleLoginCustomer = async (req, res) => {
    const customer = await this.loginCustomer(req.body);
    const token = signCookie(res, { id: customer._id });
    response(res, 200, null, { token });
  };

  handleGetCustomer = async (req, res) => {
    const { id } = req.auth;
    const customer = await this.getCustomer(id);
    response(res, 200, customer);
  };
}

export default CustomerController;
