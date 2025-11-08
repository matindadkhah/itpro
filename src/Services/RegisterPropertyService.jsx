// src/services/RegisterService.js
import { Post } from "../Adapter/Api";

class RegisterPropertyService {
  async createAsset(data) {
    try {
      const response = await Post("properties/save", data);
      return response.data;
    } catch (error) {
      console.error("RegisterPropertyService.createAsset:", error);
      throw error.response?.data || error.message;
    }
  }
}

export default new RegisterPropertyService();
