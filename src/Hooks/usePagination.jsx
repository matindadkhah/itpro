import { useState, useMemo, useEffect } from 'react';

const MAX_PAGES_TO_SHOW = 5; // تعداد حداکثر دکمه‌هایی که نمایش داده می‌شوند (شامل 1 و آخر نیست)

const usePagination = (data, itemsPerPage = 4) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // محاسبه تعداد کل صفحات
  const totalPages = useMemo(() => Math.ceil(data.length / itemsPerPage), [data.length, itemsPerPage]);

  // ریست کردن صفحه به 1 وقتی داده‌های ورودی تغییر می‌کند
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  // محاسبه آیتم‌های صفحه فعلی
  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  // توابع کنترل
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const next = () => goToPage(currentPage + 1);
  const prev = () => goToPage(currentPage - 1);


  // 🔑 منطق اصلی Pagination UI (انتقال منطق به هوک)
  const paginationControls = useMemo(() => {
    if (totalPages <= 1) return [];

    const controls = [];
    const maxCenter = MAX_PAGES_TO_SHOW - 2; // فضایی برای دکمه‌های مرکزی (مثلاً 3 دکمه اگر 5 تا باشد)

    // تعیین محدوده مرکزی دکمه‌ها
    let startPage = Math.max(2, currentPage - Math.floor(maxCenter / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxCenter - 1);
    
    // تنظیم مجدد شروع اگر به آخر نزدیک بودیم
    if (endPage - startPage + 1 < maxCenter) {
      startPage = Math.max(2, endPage - maxCenter + 1);
    }

    // 1. دکمه صفحه 1
    controls.push({ type: 'page', number: 1, active: currentPage === 1 });

    // 2. '...' اگر نیاز بود (بین 1 و صفحات مرکزی)
    if (startPage > 2) {
      controls.push({ type: 'ellipsis', key: 'start-dots' });
    }

    // 3. صفحات مرکزی
    for (let i = startPage; i <= endPage; i++) {
      controls.push({ type: 'page', number: i, active: currentPage === i });
    }

    // 4. '...' اگر نیاز بود (بین صفحات مرکزی و آخر)
    if (endPage < totalPages - 1) {
      controls.push({ type: 'ellipsis', key: 'end-dots' });
    }

    // 5. دکمه صفحه آخر
    if (totalPages > 1) {
       controls.push({ type: 'page', number: totalPages, active: currentPage === totalPages });
    }
    
    return controls.filter(control => control.type !== 'page' || control.number !== 1 || totalPages <= MAX_PAGES_TO_SHOW + 1); // فیلتر دکمه‌های تکراری 1
  }, [currentPage, totalPages]);
  // -------------------------------------------------------------

  return {
    currentPage,
    totalPages,
    currentData,
    goToPage,
    next,
    prev,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages || totalPages === 0,
    paginationControls, // 🎉 آرایه کنترل‌های آماده برای رندر
  };
};

export default usePagination;