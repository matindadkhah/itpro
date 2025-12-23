import React from 'react'

const ThirdForm = () => {








  return (
    <div className="bg-white  rounded-xl p-6 shadow-2xl">
      <h3 className="text-lg font-semibold mb-4">مرحله سه — تایید اطلاعات</h3>
      <hr className='mb-5 border-purple-400' />
      <div className='grid gap-x-2 md:grid-cols-2 sm:grid-cols-1 space-y-3 rounded-lg bg-gray-100 p-2  '>
        <div className='  p-2 md:col-span-2 sm:col-span-1 rounded-md space-y-2'>
          <h2 className='font-semibold text-md text-purple-700  '>اطلاعات دستگاه و شرح کلی</h2>
          <div className='bg-white rounded-lg grid md:grid-cols-3 sm:grid-cols-1 p-4 gap-4 border border-purple-400'>
            <span className='flex items-center text-gray-600 font-light text-sm'>نام دستگاه : <span className='font-semibold '>کیس ایستگاه 17</span></span>
            <span className='flex items-center text-gray-600 font-light text-sm'>برند/مدل : <span className='font-semibold'>کیس</span></span>
            <span className='flex items-center text-gray-600 font-light text-sm'> کد اموال : <span className='font-semibold'>331242</span></span>
            <span className='flex items-center text-gray-600 font-light text-sm'> وضعیت فوریت : <span className='font-semibold'>متوسط</span></span>
            <span className='flex items-center text-gray-600 font-light text-sm'> تاریخ : <span className='font-semibold'>26/09/1404</span></span>
            <span className='flex items-center text-gray-600 font-light text-sm'> وضعیت تصویر : <span className='font-semibold'>اپلود شده</span></span>
            <span className="flex gap-1 text-justify text-gray-600 font-light text-sm col-span-3">
              <span>شرح:</span>
              <span className="font-semibold">
                این کامپیوتر از حدود یک هفته پیش دچار اختلال شده است. در ابتدا سیستم به‌صورت ناگهانی هنگام کار خاموش می‌شد، اما پس از روشن کردن مجدد، بعد از مدتی دوباره همین مشکل تکرار می‌شود. خاموش شدن‌ها بدون نمایش هیچ‌گونه پیام خطا یا صفحه آبی (Blue Screen) اتفاق می‌افتد و بیشتر مواقع زمانی رخ می‌دهد که سیستم تحت فشار است، مانند اجرای چند برنامه به‌صورت هم‌زمان یا هنگام اتصال به شبکه داخلی.
              </span>
            </span>

          </div>
        </div>
        <div className='  p-2 md:col-span-1 sm:col-span-1 rounded-md space-y-2'>
          <h2 className='font-semibold text-md text-purple-700  '>اطلاعات هویتی تحویل دهنده</h2>
          <div className='bg-white rounded-lg grid md:grid-cols-2 sm:grid-cols-1 p-4 gap-4 border border-purple-400'>
            <span className='flex items-center text-gray-600 font-light text-sm'>نام و نام خانوادگی : <span className='font-semibold '>محسن قادری</span></span>
            <span className='flex items-center text-gray-600 font-light text-sm'>شماره پرسنلی: <span className='font-semibold '>2762672</span></span>
            <span className='flex items-center text-gray-600 font-light text-sm'> شماره تماس : <span className='font-semibold '>0913930622</span></span>
            <span className='flex items-center text-gray-600 font-light text-sm'> مکان : <span className='font-semibold '> ایستگاه 18</span></span>
          </div>
        </div>
        <div className='  p-2 md:col-span-1 sm:col-span-1 rounded-md space-y-2'>
          <h2 className='font-semibold text-md text-purple-700  '>اطلاعات هویتی تحویل گیرنده</h2>
          <div className='bg-white rounded-lg grid md:grid-cols-2 sm:grid-cols-1 p-4 gap-4 border border-purple-400'>
            <span className='flex items-center text-gray-600 font-light text-sm'>نام و نام خانوادگی : <span className='font-semibold '>آرش اورنگی</span></span>
            <span className='flex items-center text-gray-600 font-light text-sm'>شماره پرسنلی: <span className='font-semibold '>30240222</span></span>
            <span className='flex items-center text-gray-600 font-light text-sm'> شماره تماس : <span className='font-semibold '>09302302234</span></span>
            <span className='flex items-center text-gray-600 font-light text-sm'> مکان : <span className='font-semibold '>انفورماتیک</span></span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ThirdForm;