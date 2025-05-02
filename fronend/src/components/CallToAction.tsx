'use client'

import React from "react";
import { useRouter } from 'next/navigation';


import { FaArrowRight } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa6";

export default function CallToAction() {
  const router = useRouter();

  const handleClick = (): void => {
    router.push("/signup");
  };

  const contactClick = () => {
       
  }

  return (
    <div className=" 2xl:container mx-auto">
      <section className="w-full h-[360px] md:h-[400px] bg-gradient-to-r from-indigo-50 to-purple-50 bg-no-repeat  relative  md:mt-[20px] mr-0 mb-0 md:ml-0 z-10">
        <div className="w-[1290px] h-[163px] relative z-[138] md:mt-[60px] mr-0 mb-0 xl:ml-[144px]">
          <div className="w-[341px] h-[50px] relative overflow-hidden z-[138] mt-[112px] mr-0 mb-0 ml-[450px] lg:ml-[0px] xl:ml-[450px]">
            <div className="w-full h-full absolute top-0 left-0 z-[139]">
              <div className="w-[292px] h-[5px] relative z-[140] md:mt-[21px] mr-0 mb-0 ml-[17px]">
                <div className="w-full h-full absolute top-0 left-0 z-[141]">
                  <div className="w-full h-full absolute top-0 left-0 z-[142]"></div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="flex sml:ml-1.5 lg:w-[1290px] h-[163px] mt-5 justify-center items-center font-['Inter'] text-[20px] md:text-[36px] font-bold leading-[40px] text-black tracking-[-1.5px] absolute top-0 left-5 smm:left-10 md:left-16 lg:-left-32  xxl:left-[-80px] xxxl:left-36  xl:right-0 2xl:-left-1 3xl:left-12 text-center z-[137] drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">
            Ready to transform your sales process?
            <br />
            Start your free trial today.
          </h2>

          <div className=" w-[15%] md:w-[20%] h-[191%] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-03/YOQNH0cfL0.png)] bg-[length:100%_100%] bg-no-repeat absolute top-[-10px] sm:top-[1px] left-[86px] sml:left-[110px] smm:left-[105px] md:left-60  lg:left-[380px] xl:left-[350px] xxl:left-[400px] 2xl:left-[500px] 3xl:left-[550px] xxxl:left-[650px] z-[143]" />
        </div>

        <div className="flex justify-center items-center gap-5 sm:gap-20 relative z-[134] mt-20 md:mt-28 xxl:ml-[-60px] 2xl:ml-0 xml:-ml-5 3xl:-ml-10">
          <button
            onClick={handleClick}
            className="p-3 bg-[#111112] rounded-[10px] shadow-lg transition-transform hover:translate-y-[-2px] flex items-center justify-center group"
          >
            <span className="font-['Inter'] md:text-[20px] font-semibold text-white mr-2">
              Get Started
            </span>
            <FaArrowRight className="text-white transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href="#contact"
            onClick={contactClick}
            className="p-3 bg-white rounded-[10px] shadow-lg transition-transform hover:translate-y-[-2px] flex items-center justify-center group"
          >
            <FaWpforms className=" w-4 h-8 text-black transition-transform group-hover:rotate-12 mr-2" />

            <span className="font-['Inter'] md:text-[20px] font-semibold text-black ">
              Contact Sales
            </span>
          </a>
        </div>
      </section>
    </div>
  );
}
