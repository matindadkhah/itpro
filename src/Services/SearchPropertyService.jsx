import { Post } from "../Adapter/Api";

class SearchPropertyService {
  async searchAssets(params) {
    try {
      const response = await Post("properties/search", params);
      return response.data;
    } catch (error) {
      console.error("SearchPropertyService.searchAssets:", error);
      throw error.response?.data || error.message;
    }
  }
}

export default SearchPropertyService;
