
import React from 'react'
import { PlusIcon } from "@heroicons/react/24/outline";
import { TextInput } from '../../assets/Inputs/TextInput ';



const RepairDeviceRegistrationPage = () => {
    return (
        <div className="px-6 py-14 bg-white min-h-screen flex justify-center">
            <div className=' w-full sm:w-11/12 mx-auto space-y-10 '>
                {/* Title */}
                <div className="flex-col justify-center items-center gap-2 space-y-1  text-lg md:text-xl">
                    <div className='flex items-center gap-1'>
                        <PlusIcon className="w-5 h-5 text-red-500" />
                        <h2>ثبت دستگاه تعمیری</h2>
                    </div>
                    <h6 className='text-gray-400 text-sm font-light'>با توجه به اهمیت این مرحله جزییات را به خوبی رعایت کنید</h6>
                </div>

                <hr className=' border-gray-200 ' />
                {/* Body */}
                <div className='w-3/4  mx-auto'>
                    <div class="grid grid-cols-1 grid-rows-none gap-7 md:grid-cols-6 md:grid-rows-6 ">
                        <div className='md:col-span-2 md:row-span-3 md:col-start-5 md:row-start-1 space-y-2 '>
                            <h2 className='font-bold text-gray-700 text-md'>اطلاعات هویتی تحویل دهنده</h2>
                            <div class=" shadow-2xl rounded-xl space-y-5 p-6">
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.00 512.00" xml:space="preserve" width="52px" height="52px" fill="#000000" stroke="#000000" stroke-width="0.00512" transform="matrix(-1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle style={{ fill: "#1A2A44" }} cx="256" cy="256" r="256"></circle> <path style={{ fill: "#24385A" }} d="M104.41,351.092l160.728,160.728c134.044-4.706,241.859-112.452,246.674-246.469L406.119,159.66 L104.41,351.092z"></path> <path style={{ fill: "#FF914D" }} d="M396.569,355.556h-281.14c-8.768,0-15.874-7.108-15.874-15.874V172.32 c0-8.768,7.108-15.875,15.874-15.875h281.14c8.768,0,15.874,7.108,15.874,15.875v167.362 C412.444,348.448,405.337,355.556,396.569,355.556z"></path> <path style={{ fill: "#FF914D" }} d="M396.569,156.444H256v199.111h140.569c8.768,0,15.874-7.108,15.874-15.874V172.318 C412.444,163.552,405.337,156.444,396.569,156.444z"></path> <path style={{ fill: "#FFEDB5" }} d="M221.522,327.111h-101.71c-3.332,0-6.034-2.701-6.034-6.034V190.923c0-3.332,2.701-6.034,6.034-6.034 h101.71c3.332,0,6.034,2.701,6.034,6.034v130.155C227.556,324.41,224.854,327.111,221.522,327.111z"></path> <g> <circle style={{ fill: "#1A2A44" }} cx="170.667" cy="233.589" r="24.135"></circle> <path style={{ fill: "#1A2A44" }} d="M129.293,302.545c0-22.85,18.523-41.374,41.374-41.374s41.374,18.523,41.374,41.374H129.293z"></path> </g> <g> <rect x="269.791" y="224.108" style={{ fill: "#1A2A44" }} width="113.778" height="6.896"></rect> <rect x="269.791" y="252.552" style={{ fill: "#1A2A44" }} width="113.778" height="6.896"></rect> <rect x="269.791" y="280.997" style={{ fill: "#1A2A44" }} width="113.778" height="6.896"></rect> </g> </g></svg>
                                <TextInput label="نام و نام خانوادگی" name="kame" placeholder="نام" />
                                <TextInput label="نام و نام خانوادگی" name="kame" placeholder="نام" />
                                <TextInput label="نام و نام خانوادگی" name="kame" placeholder="نام" />


                            </div>
                        </div>

                        <div className='md:col-span-2 md:row-span-3 md:col-start-5 md:row-start-4 space-y-2'>
                            <div className='flex-col justify-center'></div>
                            <h2 className='font-bold text-gray-700 text-md'>اطلاعات هویتی تحویل گیرنده</h2>
                            <div class="bg-white  shadow-2xl rounded-xl space-y-5 p-6">
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.00 512.00" xml:space="preserve" width="52px" height="52px" fill="#000000" stroke="#000000" stroke-width="0.00512" transform="matrix(-1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle style={{ fill: "#1A2A44" }} cx="256" cy="256" r="256"></circle> <path style={{ fill: "#24385A" }} d="M104.41,351.092l160.728,160.728c134.044-4.706,241.859-112.452,246.674-246.469L406.119,159.66 L104.41,351.092z"></path> <path style={{ fill: "#FF914D" }} d="M396.569,355.556h-281.14c-8.768,0-15.874-7.108-15.874-15.874V172.32 c0-8.768,7.108-15.875,15.874-15.875h281.14c8.768,0,15.874,7.108,15.874,15.875v167.362 C412.444,348.448,405.337,355.556,396.569,355.556z"></path> <path style={{ fill: "#FF914D" }} d="M396.569,156.444H256v199.111h140.569c8.768,0,15.874-7.108,15.874-15.874V172.318 C412.444,163.552,405.337,156.444,396.569,156.444z"></path> <path style={{ fill: "#FFEDB5" }} d="M221.522,327.111h-101.71c-3.332,0-6.034-2.701-6.034-6.034V190.923c0-3.332,2.701-6.034,6.034-6.034 h101.71c3.332,0,6.034,2.701,6.034,6.034v130.155C227.556,324.41,224.854,327.111,221.522,327.111z"></path> <g> <circle style={{ fill: "#1A2A44" }} cx="170.667" cy="233.589" r="24.135"></circle> <path style={{ fill: "#1A2A44" }} d="M129.293,302.545c0-22.85,18.523-41.374,41.374-41.374s41.374,18.523,41.374,41.374H129.293z"></path> </g> <g> <rect x="269.791" y="224.108" style={{ fill: "#1A2A44" }} width="113.778" height="6.896"></rect> <rect x="269.791" y="252.552" style={{ fill: "#1A2A44" }} width="113.778" height="6.896"></rect> <rect x="269.791" y="280.997" style={{ fill: "#1A2A44" }} width="113.778" height="6.896"></rect> </g> </g></svg>
                                <TextInput label="نام و نام خانوادگی" name="kame" placeholder="نام" />
                                <TextInput label="نام و نام خانوادگی" name="kame" placeholder="نام" />
                                <TextInput label="نام و نام خانوادگی" name="kame" placeholder="نام" />

                            </div>
                        </div>
                        <div className='md:col-span-4 md:row-span-6 md:col-start-1 md:row-start-1 space-y-2'>
                            <h2 className='font-bold text-gray-700 text-md'>اطلاعات دستگاه</h2>

                            <div class="bg-white  shadow-2xl rounded-xl space-y-5 p-6">
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.00 512.00" xml:space="preserve" width="52px" height="52px" fill="#000000" stroke="#000000" stroke-width="0.00512" transform="matrix(-1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle style={{ fill: "#1A2A44" }} cx="256" cy="256" r="256"></circle> <path style={{ fill: "#24385A" }} d="M104.41,351.092l160.728,160.728c134.044-4.706,241.859-112.452,246.674-246.469L406.119,159.66 L104.41,351.092z"></path> <path style={{ fill: "#FF914D" }} d="M396.569,355.556h-281.14c-8.768,0-15.874-7.108-15.874-15.874V172.32 c0-8.768,7.108-15.875,15.874-15.875h281.14c8.768,0,15.874,7.108,15.874,15.875v167.362 C412.444,348.448,405.337,355.556,396.569,355.556z"></path> <path style={{ fill: "#FF914D" }} d="M396.569,156.444H256v199.111h140.569c8.768,0,15.874-7.108,15.874-15.874V172.318 C412.444,163.552,405.337,156.444,396.569,156.444z"></path> <path style={{ fill: "#FFEDB5" }} d="M221.522,327.111h-101.71c-3.332,0-6.034-2.701-6.034-6.034V190.923c0-3.332,2.701-6.034,6.034-6.034 h101.71c3.332,0,6.034,2.701,6.034,6.034v130.155C227.556,324.41,224.854,327.111,221.522,327.111z"></path> <g> <circle style={{ fill: "#1A2A44" }} cx="170.667" cy="233.589" r="24.135"></circle> <path style={{ fill: "#1A2A44" }} d="M129.293,302.545c0-22.85,18.523-41.374,41.374-41.374s41.374,18.523,41.374,41.374H129.293z"></path> </g> <g> <rect x="269.791" y="224.108" style={{ fill: "#1A2A44" }} width="113.778" height="6.896"></rect> <rect x="269.791" y="252.552" style={{ fill: "#1A2A44" }} width="113.778" height="6.896"></rect> <rect x="269.791" y="280.997" style={{ fill: "#1A2A44" }} width="113.778" height="6.896"></rect> </g> </g></svg>
                                <TextInput label="نام و نام خانوادگی" name="kame" placeholder="نام" />
                                <TextInput label="نام و نام خانوادگی" name="kame" placeholder="نام" />
                                <TextInput label="نام و نام خانوادگی" name="kame" placeholder="نام" />
                                <TextInput label="نام و نام خانوادگی" name="kame" placeholder="نام" />
                                <TextInput label="نام و نام خانوادگی" name="kame" placeholder="نام" />
                                <TextInput label="نام و نام خانوادگی" name="kame" placeholder="نام" />
                                <TextInput label="نام و نام خانوادگی" name="kame" placeholder="نام" />
                                <TextInput label="نام و نام خانوادگی" name="kame" placeholder="نام" />

                            </div>
                        </div>
                    </div>
                    <hr className=' border-gray-200 my-5' />
                    <button
                        type="submit"
                        className="bg-red-400 text-white px-6 py-2 rounded-xl hover:bg-red-500 transition font-semibold"
                    >ثبت</button>
                </div>


            </div>

        </div>
    )
}

export default RepairDeviceRegistrationPage;