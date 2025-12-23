
import React from 'react'
import { SquaresPlusIcon } from "@heroicons/react/24/outline";
import Stepper from './Stepper';
import FirstForm from './FirstForm';
import SecondForm from './SecondForm';
import ThirdForm from './ThirdForm';


const RepairDeviceRegistrationPage = () => {
    return (
        <div className="p-6 bg-white min-h-screen ">
            <div class="flex items-center gap-2 font-bold text-gray-800 mb-5 text-xl">
                <SquaresPlusIcon className="w-5 h-5 text-red-500" />
                <h2>ثبت دستگاه جدید</h2>
            </div>
            <div className='mx-auto w-full px-4 py-6' >
                <Stepper />
            </div>

        </div>
    )
}

export default RepairDeviceRegistrationPage;