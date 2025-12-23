import { ComputerDesktopIcon, UserIcon } from '@heroicons/react/24/outline';
import React from 'react'
import { TextInput } from "../../assets/Inputs/TextInput ";
import { SelectInput } from '../../assets/Inputs/SelectInput';
import { useForm } from 'react-hook-form';









const FirstForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onBlur", // validation بعد از خروج از input
    });
    const onSubmit = (data) => {
        console.log("FORM DATA:", data);
    };



    return (
        <form onSubmit={handleSubmit(onSubmit)}>


            <div className="bg-white  rounded-xl p-6 shadow-2xl">
                <h3 className="text-lg font-semibold mb-4">مرحله یک — اطلاعات پایه</h3>
                <hr className='mb-5  border-purple-400' />


                {/* Grid: موبایل یک ستونه، از md به بالا سه ستونه؛ ستون وسط پهن‌تر */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-12">

                    {/* LEFT SIDE (narrow) */}
                    <div className="md:col-span-3 border-2 space-y-3 rounded-lg border-purple-600">
                        <div className='flex-col p-3 w-full'>
                            <span className='flex items-center gap-2 justify-center text-purple-900'>

                                <UserIcon className='w-5 h-5' />
                                <h2 className='text-sm font-extrabold'>تکمیل اطلاعات هویتی تحویل دهنده</h2>

                            </span>
                            <hr class="border-purple-300 dark:border-white my-5" />
                            <div className='grid grid-cols-1 gap-7'>
                                <TextInput
                                    label="نام و نام خانوادگی" name="name" placeholder="نام"
                                    register={register}
                                    rules={{
                                        required: "نام الزامی است",
                                        minLength: {
                                            value: 3,
                                            message: "حداقل ۳ کاراکتر وارد کنید",
                                        },
                                    }}
                                    error={errors.name?.message}
                                />
                                <TextInput
                                    label="شماره پرسنلی" name="personalId" placeholder="پرسنلی"
                                />
                                <TextInput
                                    label="شماره تماس" name="phoneNumber" placeholder="شماره"
                                />
                                <SelectInput label="انتخاب مکان" name="selectLocation" options={{
                                    0: "همه", 1: "کامپیوتر", 2: "پرینتر", 3: "لپ تاپ", 4: "مانیتور",
                                }} />

                            </div>


                        </div>


                    </div>

                    {/* MIDDLE (wide) */}
                    <div className="md:col-span-6 border-2 space-y-3 rounded-lg border-purple-600">

                        <div className='flex-col p-3 w-full'>
                            <span className='flex items-center gap-2 justify-center text-purple-900'>

                                <ComputerDesktopIcon className='w-5 h-5' />
                                <h2 className='text-sm font-extrabold'>تکمیل اطلاعات دستگاه</h2>

                            </span>
                            <hr class="border-purple-300 dark:border-white my-5" />
                            <div className='grid grid-cols-1 gap-7'>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='flex-col space-y-6'>
                                        <TextInput
                                            label="نام دستگاه" name="deviceName" placeholder="نام"
                                        />
                                        <SelectInput label="انتخاب برند/مدل" name="selectLocation" options={{
                                            0: "همه", 1: "کامپیوتر", 2: "پرینتر", 3: "لپ تاپ", 4: "مانیتور",
                                        }} />
                                        <TextInput
                                            label="کد اموال" name="code" placeholder="کد"
                                        />
                                        <TextInput
                                            label="نام دستگاه" name="deviceName" placeholder="نام"
                                        />
                                    </div>
                                    <div className='flex-col space-y-3'>
                                        <h2 className='text-sm font-medium text-purple-700'>وضعیت فوریت</h2>
                                        <div class="flex flex-wrap gap-4">
                                            {["اورژانسی", "بالا", "متوسط", "پایین"].map((val, idx) => {
                                                const id = `condition-${idx}`;
                                                return (
                                                    <div key={idx} class="flex items-center gap-2">
                                                        <input
                                                            type="radio"
                                                            id={id}
                                                            class="w-3 h-3 shrink-0 border-gray-300 rounded-sm text-purple-600 focus:ring-purple-500
                 checked:border-purple-600 dark:bg-neutral-800 dark:border-neutral-700 
                 dark:checked:bg-purple-600 dark:checked:border-purple-600
                 dark:focus:ring-offset-gray-800"
                                                            name={id}
                                                        />
                                                        <label for={id} class="text-[12px] text-gray-700 dark:text-neutral-300">
                                                            {val}
                                                        </label>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <h2 className='text-sm font-medium text-purple-700'>آپلود تصویر</h2>
                                        <div class="w-full max-w-3xl mx-auto space-y-5 relative ">
                                            <div id="dropbox"
                                                class="border-2 border-dashed border-purple-500 bg-purple-50
              rounded-xl h-36 flex flex-col items-center justify-center gap-2
              transition-all duration-300 cursor-pointer hover:bg-purple-100">

                                                <div class="text-3xl text-purple-600">📁</div>

                                                <div class="text-purple-600 font-semibold text-sm">
                                                    فایل‌ها را اینجا رها کنید
                                                </div>

                                                <p class="text-[11px] text-gray-500 text-center">
                                                    فرمت‌های قابل قبول: JPEG, PNG, PDF — حداکثر ۵ مگابایت
                                                </p>

                                                <button class="px-1.5 py-1.5 bg-purple-600 text-white rounded-md text-xs hover:bg-purple-700">
                                                    انتخاب فایل
                                                </button>

                                                <input type="file" id="fileInput" multiple class="hidden" />
                                            </div>

                                            <div id="uploadStats" class="hidden bg-white shadow rounded-lg p-4">
                                                <div class="flex justify-between items-center mb-3">
                                                    <div class="text-gray-800 font-semibold text-sm">خلاصه آپلود</div>
                                                </div>

                                                <div class="flex justify-center gap-8 pb-3">
                                                    <div class="text-center">
                                                        <div id="fileCount" class="text-lg font-bold text-purple-600">0</div>
                                                        <div class="text-xs text-gray-500">تعداد فایل‌ها</div>
                                                    </div>

                                                    <div class="text-center">
                                                        <div id="totalSize" class="text-lg font-bold text-purple-600">0 KB</div>
                                                        <div class="text-xs text-gray-500">حجم کل</div>
                                                    </div>
                                                </div>

                                                <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <div id="progressFill" class="h-full bg-purple-600 w-0 transition-all"></div>
                                                </div>
                                            </div>

                                            <div id="emptyState" class="hidden text-center text-gray-500 py-4 text-sm">
                                                هنوز فایلی آپلود نشده است
                                            </div>

                                            <div id="filePreviews"
                                                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            </div>
                                        </div>

                                        <div id="notification"
                                            class="fixed top-5 left-1/2 -translate-x-1/2 opacity-0 pointer-events-none
            px-4 py-2 rounded-md text-white shadow-lg transition-all
            bg-purple-600 flex items-center gap-2 text-sm">
                                            <span id="notificationText">فایل با موفقیت آپلود شد!</span>
                                            <div class="absolute bottom-0 left-0 h-1 bg-white/50 w-full origin-left scale-x-0"></div>
                                        </div>


                                    </div>


                                </div>


                            </div>


                        </div>
                    </div>

                    {/* RIGHT SIDE (narrow) */}
                    <div className="md:col-span-3 border-2  space-y-3 rounded-lg border-purple-600">
                        <div className='flex-col p-3 w-full'>
                            <span className='flex items-center gap-2 justify-center text-purple-900'>

                                <UserIcon className='w-5 h-5' />
                                <h2 className='text-sm font-extrabold'>تکمیل اطلاعات هویتی تحویل گیرنده</h2>

                            </span>
                            <hr class="border-purple-300 dark:border-white my-5" />
                            <div className='grid grid-cols-1 gap-7'>
                                <TextInput
                                    label="نام و نام خانوادگی" name="name" placeholder="نام"
                                />
                                <TextInput
                                    label="شماره پرسنلی" name="personalId" placeholder="پرسنلی"
                                />
                                <TextInput
                                    label="شماره تماس" name="phoneNumber" placeholder="شماره"
                                />
                                <SelectInput label="انتخاب مکان" name="selectLocation" options={{
                                    0: "همه", 1: "کامپیوتر", 2: "پرینتر", 3: "لپ تاپ", 4: "مانیتور",
                                }} />

                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default FirstForm;