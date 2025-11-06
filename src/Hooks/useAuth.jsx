import { useDispatch, useSelector } from "react-redux";
import AuthService from "../Services/AuthService";
import { showToast } from "../components/Toastify/ShowToast";
import { useNavigate } from "react-router-dom";


export function useAuth() {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.auth);
    const navigate = useNavigate(); // useNavigate hook

    const login = async (nationalId, password) => {
        dispatch({ type: "LOGIN_REQUEST" });
        try {
            const user = await AuthService.login(nationalId, password);
            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                dispatch({ type: "LOGIN_SUCCESS", payload: user });
                showToast.success("خوش آمدید")
                return user; // برای navigate در LoginPage
            }
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.message });
            throw err;
        }
    };
    const logout = async () => {
        await AuthService.logout();
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
        showToast.error("به امید دیدار")
    
    };

    return {
        user,
        loading,
        error,
        login,
        logout,
    };
}
