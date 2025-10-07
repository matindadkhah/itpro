import { toast } from 'react-toastify';

// تابع‌های آماده برای استفاده در کل پروژه
export const showToast = {
  success: (message, options = {}) =>
    toast.success(message, { position: "top-right", autoClose: 3000, theme: "colored", rtl: true, ...options }),

  error: (message, options = {}) =>
    toast.error(message, { position: "top-right", autoClose: 3000, theme: "colored", rtl: true, ...options }),

  info: (message, options = {}) =>
    toast.info(message, { position: "top-right", autoClose: 3000, theme: "colored", rtl: true, ...options }),

  warning: (message, options = {}) =>
    toast.warning(message, { position: "top-right", autoClose: 3000, theme: "colored", rtl: true, ...options }),
};