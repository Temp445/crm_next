'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from "../assets/AceLogo.png";

import { LuLogIn } from "react-icons/lu";
import { RiContactsLine } from "react-icons/ri";
import { TbFileDownload } from "react-icons/tb";

import { IoReorderThree } from "react-icons/io5";
import { LuMessageSquareMore } from "react-icons/lu";
const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className=" fixed  w-[350px] smm:w-[410px] left- bottom-0 z-[200] shadow-lg   md:shadow-none  md:border-0 md:px-0 md:relative md:w-auto md:bottom-0 md:bg-white py- md:pt-2 lg:px-6 xxl:px-20 2xl:px-28 flex items-center justify-between 2xl:container mx-auto">
    <div className="flex items-center ml-0 sm:ml-0  ">
      <div className=" hidden sm:block mr-2 -mt-1 sm:mr-3  ">
      <Image src={logo} alt="logo"  loading="lazy"  width={48} height={38}   className='h-11 sm:h-12 sm:w-15 rounded-full'/>
      </div>
      <div className='hidden sm:block'>
        <h1 className="font-bold text-sm sm:text-lg text-gray-800">ACE CRM</h1>
        <p className=" text-[12px] sm:text-sm text-gray-600">Engineering Excellence</p>
      </div>
      <a href='/signup' className=' h-[50px] w-[314px] smm:w-[350px] sml:w-[365px]  bg-red-500 sm:hidden   '>
        <h1 className="font-bold text-[14px] sm:text-lg text-white  text-center items-center justify-center mt-4 ml-12">Sign Up for Free</h1>
      </a>
      <div className=' bg- h-[50px] w-[60px] bg-[#3d71d3] sm:hidden text-center items-center justify-center '>
    <a href="#contact">  <LuMessageSquareMore className='text-3xl text-white  ml-4 mt-3' />   </a>
      </div>
    </div>


    <div className="hidden lg:flex items-center space-x-8">
      <a href="#features" className="flex items-center text-gray-700 hover:text-gray-900">
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
        </svg>
        Features
      </a>
      <a href="#pricing" className="flex items-center text-gray-700 hover:text-gray-900">
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
        </svg>
        Pricing
      </a>

      <a href="#contact" className="flex items-center text-gray-700 hover:text-gray-900">
      <RiContactsLine className='mr-1.5  w-5 h-[18px] mb-0.5 ' />
        Contact Us
      </a>

      <a href="/CRM_Brochure.pdf" className="flex items-center text-gray-700 hover:text-gray-900 hover:cursor-pointer  " download="/CRM_Brochure.pdf">
      <TbFileDownload className='mr-1.5  w-5 h-[18px] mb-0.5 ' />
        Brochure
      </a>
    </div>
        
        
     
    <Link href="/signin" className="hidden md:flex lg:hidden items-center ml-64 text-gray-700  hover:text-white hover:bg-green-800 p-1 border border-gray-800  rounded-[5px] hover:border-0 ">
 <span className='mr-2'><LuLogIn /></span>
        Sign In
      </Link>

    <div className="hidden lg:flex items-center space-x-8">
      <Link href="/signin" className="flex items-center text-gray-700 hover:text-white hover:bg-green-800 p-1 border border-gray-800  rounded-[5px] px-2 hover:border-0  ">
 <span className='mr-2'><LuLogIn /></span>
        Sign In
      </Link>
      <Link href="mailto:sales@acesoft.in" className="flex items-center text-gray-700 hover:text-gray-900 lg:hidden  xl:flex ">
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
        sales@acesoft.in
      </Link>
    </div>

    <div className="absolute md:relative  lg:hidden">
      <button 
        onClick={toggleMenu}
        className="flex items-center text-gray-700 pe-4 px-3 bg-[#eef1f0] md:bg-white  h-[50px] w-full "
      >
        <svg className="w-6 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 28" xmlns="http://www.w3.org/2000/svg">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" className='text-gray-400 md:text-black'></path>
          ) : (
            <IoReorderThree  className='text-3xl text-gray-400 md:text-black'/>

          )}
        </svg>
      </button>
    </div>

    {isMenuOpen && (
      <div className="absolute bottom-[52px] rounded-lg border shadow-sm md:top-14 left-1 right-16 md:left-0  md:right-0 bg-white border-b border-gray-200 lg:hidden z-[100] md:bg-white">
        <div className="flex flex-col space-y-4 px-6 py-4 md:bg-white">
         
          <a href="#features" className="flex items-center text-gray-700 hover:text-gray-900 py-2">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
            </svg>
            Features
          </a>
          <a href="#pricing" className="flex items-center text-gray-700 hover:text-gray-900 py-2">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
            </svg>
            Pricing
          </a>
          <a href="#contact" className="flex items-center text-gray-700 hover:text-gray-900">
      <RiContactsLine className='mr-1.5  w-5 h-[18px]  ' />
        Contact Us
      </a>
          <Link href="/signin" className=" md:hidden flex items-center text-gray-700 hover:text-gray-900 py-2">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
            </svg>
            Sign In
          </Link>
          <Link href="mailto:sales@acesoft.in" className="flex items-center text-gray-700 hover:text-blue-500 py-2  ">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            sales@acesoft.in
          </Link>
        </div>
      </div>
    )}
  </nav>
  );
};

export default Navbar;