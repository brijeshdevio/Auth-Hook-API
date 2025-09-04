import { UserService } from "../services/index.js";
import { response, signCookie } from "../utils/index.js";

class UserController extends UserService {
  constructor() {
    super();
  }

  handleSignup = async (req, res) => {
    const { customer } = req.auth;
    const user = await this.createUser(customer, req.body);
    response(res, 201, user);
  };

  handleLogin = async (req, res) => {
    const { customer } = req.auth;
    const user = await this.loginUser(customer, req.body);
    const token = signCookie(res, { id: user.id });
    response(res, 200, null, { token });
  };

  handleGetUser = async (req, res) => {
    const { customer, id } = req.auth;
    const user = await this.getUser(customer, id);
    response(res, 200, user);
  };

  handleUpdateUser = async (req, res) => {
    const { customer, id } = req.auth;
    const user = await this.updateUser(customer, id, req.body);
    response(res, 200, user);
  };

  handleDeleteUser = async (req, res) => {
    const { customer, id } = req.auth;
    const user = await this.deleteUser(customer, id);
    response(res, 200, user);
  };

  handleLogoutUser = async (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME);
    response(res, 200, null);
  };
}

export default UserController;
