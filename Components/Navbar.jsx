'use client'
import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import { FaCartPlus } from 'react-icons/fa';
import LoadingBar from 'react-top-loading-bar';
import { usePathname } from 'next/navigation';
import LogoutButton from './LogoutButton'

const Navbar = () => {

    const [progress, setProgress] = useState(0)
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const pathname = usePathname()

    useEffect(() => {
        setProgress(20)

        setTimeout(() => {
            setProgress(40)
        }, 100);

        setTimeout(() => {
            setProgress(100)
        }, 400);

    }, [pathname])

    useEffect(() => {
        setTimeout(() => {
            setProgress(0)
        }, 50);
    }, [])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };



    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 px-0 sm:px-6">
            <LoadingBar
                color='#e92a16'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img
                        // src="https://flowbite.com/docs/images/logo.svg"
                        src="https://cdn.vectorstock.com/i/1000x1000/67/00/stock-market-business-logo-icon-design-vector-22926700.webp"
                        className="h-8"
                        alt="Flowbite Logo"
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Stock Management
                    </span>
                </Link>

                {/* Hamburger Icon */}
                <button
                    onClick={toggleMenu}
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-expanded={isMenuOpen}
                >
                    <span className="sr-only">Open main menu</span>
                    {isMenuOpen ? (
                        <svg
                            className="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    )}
                </button>

                {/* Navigation Menu */}
                <div
                    className={`${isMenuOpen ? 'block' : 'hidden'
                        } w-full md:block md:w-auto`}
                    id="navbar-multi-level"
                >
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

                        <Link
                            href="/"
                            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            aria-current="page"
                        >
                            Home
                        </Link>


                        <Link
                            href="form"
                            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                        >
                            Form
                        </Link>


                        <Link
                            href="/table"
                            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                        >
                            Table
                        </Link>


                        <Link
                            href="/cart"
                            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                        >
                            <FaCartPlus fontSize={23} />
                        </Link>
                        <Link
                            href="/login"
                            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                        >
                            <LogoutButton/>
                        </Link>

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
