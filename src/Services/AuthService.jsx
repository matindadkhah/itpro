import { Post,Get } from "../Adapter/Api";

class AuthService {
    async login(nationalId, password) {
        const response = await Post("account/login", { nationalId, password });
        if (response?.responseState === 0 && response.data?.user) {
            return response.data.user; // فقط user را برمی‌گرداند
        }
        throw new Error(response?.message || "Login failed");
    }

    async logout() {
        return await Post("account/logout");
    }
}

export default new AuthService();
