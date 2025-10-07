import { BellIcon } from '@heroicons/react/24/outline'
import React from 'react'

const Navbar = () => {
    return (
        <div>
            <div className="space-y-4">
                <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-gradient-to-r from-[#FF4B4B] via-[#FF6F61] to-[#FF914D] text-white text-sm py-3">
                    <nav className="max-w-[120rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
                        <div className="flex items-center justify-between">
                            <a className="flex-none text-xl font-semibold focus:outline-hidden focus:opacity-80" href="#">سامانه جامع آماری اطلاعاتی IT</a>
                            <div className="sm:hidden">
                                <button type="button" className="hs-collapse-toggle relative size-9 flex justify-center items-center gap-2 rounded-lg border border-gray-700 font-medium text-gray-400 shadow-2xs align-middle hover:bg-gray-700/20 focus:outline-hidden focus:bg-gray-700/20 text-sm" id="hs-navbar-dark-collapse" aria-expanded="false" aria-controls="hs-navbar-dark" aria-label="Toggle navigation" data-hs-collapse="#hs-navbar-dark">
                                    <svg className="hs-collapse-open:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                                    <svg className="hs-collapse-open:block hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                    <span className="sr-only">Toggle</span>
                                </button>
                            </div>
                        </div>
                        <div id="hs-navbar-dark" className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block" aria-labelledby="hs-navbar-dark-collapse">
                            <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
                                <button
                                    type="button"
                                    className="relative rounded-full p-1 text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon aria-hidden="true" className="size-6" />
                                </button>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        </div>
    )
}

export default Navbar
