'use client'

import React, { useState, useRef } from "react";
import logo from "../assets/AceLogo.png";

import Link from 'next/link';
import Image from "next/image";

import { CgPlayButtonO } from "react-icons/cg";
import { IoCloseCircleOutline } from "react-icons/io5";

// Declare the gtag function on the window object for TypeScript
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export default function Hero() {
  const [showVideoOverlay, setShowVideoOverlay] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleFreeTrialClick = (): void => {
      window.gtag('event', 'click', {
        event_category: 'CTA',
        event_label: 'Start Free Trial',
        value: 1
      });
  };
  
  const handleDemoClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
      e.preventDefault();
      
      setShowVideoOverlay(true);
      
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play();
        }
      }, 50);
  };
  
  const closeVideoOverlay = (): void => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setShowVideoOverlay(false);

    window.gtag('event', 'click', {
        event_category: 'CTA',
        event_label: 'Watch Demo',
        value: 1
      });
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if ((e.target as HTMLElement).id === "videoOverlay") {
      closeVideoOverlay();
    }
  };
  
  return (
    <div className="mx-auto 3xl:container">
      <section
        className="w-full min-h-[600px] xl:h-[600px] relative z-[32] lg:mt-[14.23px] mr-0 mb-0 bg-cover bg-no-repeat bg-[image:url(../assets/landingBg.png)] overflow-hidden"
         >


    <div className="flex sm:hidden w-[210px] rounded-br-3xl bg-white py-2">
    <div className="   mr-2 -mt-1 sm:mr-3  ">
      <Image src={logo} alt="logo" width={38} height={38}  className='h-10 sm:h-12 sm:w-15 rounded-full'/>
      </div>
      <div className=''>
        <h1 className="font-extrabold text-[14px] sm:text-lg ">ACE CRM</h1>
        <p className=" text-[12px] sm:text-sm text-gray-500">Engineering Excellence</p>
      </div>
    </div>


        <h1 className="flex w-full px-4 text-4xl leading-tight  text-center smm:text-5xl   smm:text-center smm:font-extrabold   sml:text-5xl sml:text-center lg:text-left md:mt-2 md:text-7xl md:text-center  sm:mt-20 lg:mt-20 lg:px-0 sm:text-4xl  lg:w-[500px] lg:leading-none xl:w-[600px] xxl:w-[600px] lg:h-[50.25%] justify-start items-center font-['Inter']  lg:text-7xl xl:text-[85px] xxl:text-8xl xl:leading-none xxl:6xl font-bold lg:font-extrabold   text-white tracking-[-1.5px] relative lg:absolute py-4 lg:py-0 lg:top-0  lg:left-10 xxl:left-24 xxxl:left-52 2xl:left-32 xl:left-10  z-[16]">
        A New Era Of Seamless CRM
        </h1>

        <div className=" hidden lg:block w-full h-[300px] md:h-[200px] lg:w-[550px] lg:h-[600px] xl:w-[620px] xl:h-[600px]   xl:mt-0  bg-cover bg-no-repeat relative lg:absolute  lg:left-[550px] xxl:left-[800px] 3xl:left-[1000px] xxxl:left-[1000px] xl:left-[650px]  2xl:left-[850px] z-[3]">
          <video
            className="w-full h-full object-cover"
            src="/videos/landingGif.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
        <div className="lg:hidden w-full h-[300px] md:h-[400px] md:w-[650px] lg:w-[720px] lg:h-[700px] opacity-85 bg-cover bg-no-repeat relative lg:absolute  md:left-[50px] lg:left-[800px] z-[32]">
          <video
            className="w-full h-full object-fill px-12 "
            src="/videos/landingGif1.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>

        <p className=" lg:hidden text-center  w-full px-5  lg:px-0 lg:w-[500px] xl:w-[652px]  py-6 lg:h-[14.52%] justify-start items-center font-['Inter'] text-[18px] md:px-10 md:text-[24px] lg:text-[18px] xl:text-[22px]  lg:leading-[60px] text-[#f5f5f7] tracking-[-1px] lg:tracking-[-1.5px] relative lg:absolute lg:top-[45.16%] lg:left-10 xl:left-10 2xl:left-[105px] xxl:left-24 xxxl:left-52  z-[17]">
           Capture leads, close deals faster, and never miss a follow-up — all with one powerful CRM.
        </p>

        <div className="flex w-full px-4 md:px-0  sm:justify-center lg:justify-start relative lg:absolute lg:bottom-[95px] lg:left-[40px] xl:left-[40px] xxxl:left-52  2xl:left-[140px] xxl:left-24 gap-4 z-[19] pb-5 lg:py-0">
          <div className="flex  sm:flex-row gap-4 pt-4 w-full md:w-auto">
            <Link
              href="/signup"
              onClick={handleFreeTrialClick}
              className="w-full md:w-auto  bg-gradient-to-bl from-blue-600 to-blue-400  text-white sm:py-3 sm:px-6 rounded-lg font-medium flex items-center justify-center transition-all hover:bg-blue-800 shadow-lg"
            >
              Start Free Trial
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link
              href="#"
              onClick={handleDemoClick}
              className="flex w-full md:w-auto text-black py-2 pl-5 sm:py-3 hover:bg-blue-900 hover:text-white sm:px-6 rounded-lg font-medium border border-black transition-all text-center shadow-lg hover:border-0"
            >
             <span className="mr-2 mt-1 text-semibold"><CgPlayButtonO /></span> Watch Demo
            </Link>
          </div>
        </div>

      

        {/* Video Overlay */}
        {showVideoOverlay && (
          <div
            id="videoOverlay"
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={handleOverlayClick} >
            <div className="relative w-full max-w-4xl mx-4">
              <button
                onClick={closeVideoOverlay}
                className="absolute -top-12 right-0 text-white text-3xl hover:text-red-700 focus:outline-none"
                aria-label="Close video">
                <IoCloseCircleOutline />
              </button>
              <div className=" rounded-lg overflow-hidden ">
                <video
                  ref={videoRef}
                  className="w-full"
                  controls >
                  <source 
                    src="/videos/CRM_DemoVideo.mp4" 
                    type="video/mp4" 
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}