import { KeyService } from "../services/index.js";
import { response } from "../utils/index.js";

class KeyController extends KeyService {
  constructor() {
    super();
  }

  handleCreateKey = async (req, res) => {
    const { id } = req.auth;
    const key = await this.createKey(id, req.body);
    response(res, 201, key);
  };

  handleGetKeys = async (req, res) => {
    const { id } = req.auth;
    const keys = await this.getKeysByCustomer(id);
    response(res, 200, keys);
  };

  handleGetKey = async (req, res) => {
    const { id } = req.auth;
    const { id: keyId } = req.params;
    const key = await this.getKeyById(id, keyId);
    response(res, 200, key);
  };

  handleUpdateKey = async (req, res) => {
    const { id } = req.auth;
    const { id: keyId } = req.params;
    const key = await this.updateKeyById(id, keyId, req.body);
    response(res, 200, key);
  };

  handleDeleteKey = async (req, res) => {
    const { id } = req.auth;
    const { id: keyId } = req.params;
    const key = await this.deleteKeyById(id, keyId);
    response(res, 200, key);
  };
}

export default KeyController;
