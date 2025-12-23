import { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import FirstForm from "./FirstForm";
import SecondForm from "./SecondForm";
import ThirdForm from "./ThirdForm";


export default function Stepper() {
    const [step, setStep] = useState(1);
    const TOTAL_STEPS = 3;

    const next = () => {
        if (step < TOTAL_STEPS) setStep(step + 1);
    };

    const prev = () => {
        if (step > 1) setStep(step - 1);
    };

    return (
        <div className="w-full max-w-6xl mx-auto">

            {/* --- STEPPER HEADER --- */}
            <ul className="relative flex flex-col md:flex-row gap-2">
                {[1, 2, 3].map((val) => (
                    <li key={val} className="md:shrink md:basis-0 flex-1 group flex gap-x-2 md:block">

                        {/* Number Icon + Connector */}
                        <div className="min-w-7 min-h-7 flex flex-col items-center md:w-full md:inline-flex md:flex-wrap md:flex-row text-xs align-middle">
                            <span
                                className={`size-10 flex justify-center items-center shrink-0 rounded-full font-semibold
                  ${step === val
                                        ? "bg-purple-400 text-white"
                                        : step > val
                                            ? "bg-purple-700 text-white"
                                            : "bg-purple-400 text-white"
                                    }
                `}
                            >
                                {val < step ? <CheckIcon className="w-4 h-4" /> : val}
                            </span>
                            {
                                val < step ?
                                    <div className="mt-2 w-px h-full md:mt-0 md:ms-2 md:w-full md:h-px md:flex-1 bg-purple-700 group-last:hidden dark:bg-neutral-700"></div>
                                    :
                                    <div className="mt-2 w-px h-full md:mt-0 md:ms-2 md:w-full md:h-px md:flex-1 bg-purple-400 group-last:hidden dark:bg-neutral-700"></div>
                            }


                        </div>

                        {/* Label */}
                        <div className="grow md:grow-0 md:mt-3 pb-5 flex items-center gap-2">
                            <span className="block text-lg font-semibold text-purple-900 dark:text-white">
                                مرحله {val === 1 ? "نخست" : val === 2 ? "دوم" : "آخر"}
                            </span>
                            <p className="text-sm text-gray-500 dark:text-neutral-500">
                                {val === 1 ? "اطلاعات دستگاه" : val === 2 ? "مشکلات دستگاه" : "بررسی و ثبت"}
                            </p>
                        </div>

                    </li>
                ))}
            </ul>

            {/* --- CONTENT BASED ON STEP --- */}
            <div >

                {step === 1 && (
                    <div>
                      <FirstForm/>
                    </div>
                )}

                {step === 2 && (
                    <div>
                       <SecondForm/>
                    </div>
                )}

                {step === 3 && (
                    <div>
                      <ThirdForm/>
                    </div>
                )}

            </div>

            {/* --- BUTTONS --- */}
            <div className='flex justify-between mt-5'>
                <button
                    onClick={prev}
                    className={`px-4 py-2 bg-purple-700 text-white rounded-xl text-sm ${step === 1 ? "opacity-40 cursor-not-allowed" : ""}`}
                    disabled={step === 1}
                >
                    قبلی
                </button>

                {step < TOTAL_STEPS ? (
                    <button
                        onClick={next}
                        className="px-4 py-2 bg-purple-700 text-white rounded-xl text-sm"
                    >
                        بعدی
                    </button>
                ) : (
                    <button
                        className="px-4 py-2 bg-purple-700 text-white rounded-xl text-sm"
                    >
                        ثبت نهایی
                    </button>
                )}
            </div>
        </div>
    );
}
