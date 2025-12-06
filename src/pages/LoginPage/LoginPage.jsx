import React, { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [nationalId, setNationalId] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(nationalId, password);
      console.log("Login success:", response);

      // بعد از موفقیت، هدایت به داشبورد
      navigate("/property/list");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div
      className="flex h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 font-shabnam "
      dir="rtl"
    >
      {/* سمت راست - تصویر */}
      <div className="hidden md:flex w-3/4 items-center justify-center bg-gradient-to-br from-red-600 to-orange-500  overflow-hidden">
        <img
          src="firefighting1.jpg"
          alt="Firefighter Login"
          className="object-cover w-full h-full opacity-90"
        />
      </div>
      {/* سمت چپ - فرم */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-8 sm:px-16 bg-white shadow-2xl ">
        <div className="w-full max-w-sm p-5 border border-gray-200 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
            ورود به سامانه
          </h2>
          <p className="text-center text-gray-500 mb-6 text-sm">
            لطفاً کد ملی و رمز عبور خود را وارد کنید
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="nationalId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                کد ملی
              </label>
              <input
                id="nationalId"
                type="text"
                placeholder="کد ملی خود را وارد کنید"
                className="w-full border-2 border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 rounded-lg p-2 outline-none transition-all"
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                رمز عبور
              </label>
              <input
                id="password"
                type="password"
                placeholder="رمز عبور خود را وارد کنید"
                className="w-full border-2 border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 rounded-lg p-2 outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg text-white font-semibold shadow-md transition-all ${
                loading
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 active:scale-[0.98]"
              }`}
            >
              {loading ? "در حال ورود..." : "ورود"}
            </button>

            {error && (
              <p className="text-red-500 text-center text-sm mt-2">{error}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
