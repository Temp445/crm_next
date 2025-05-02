'use client'

import React, { useEffect, ReactNode } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

import Interfaceimage1 from "../assets/Interfaceimage1.png";
import Interfaceimage2 from "../assets/Interfaceimage2.png";
import Interfaceimage3 from "../assets/Interfaceimage3.png";

import DataImage2 from "../assets/Dataimage-2.png";
import DataImage3 from "../assets/Dataimage-1.png";
import DataImage4 from "../assets/Dataimage-4.jpeg";


import Quotesimage1 from "../assets/Quotesimage1.png";
import Quotesimage2 from "../assets/Quotesimage2.png";


import salesTeamImage from "../assets/salesTeamImage.png";


import image1 from "../assets/icon1.png"
import image2 from "../assets/icon2.png"
import image3 from "../assets/icon3.png"
import image4 from "../assets/icon4.png"

import Image from "next/image";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeInUp1: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 7.8 } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const slideInLeft1: Variants = {
  hidden: { opacity: 0, x: -300 },
  visible: { opacity: 1, x: 0, transition: { duration: 6.5 } },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const slideInRight1: Variants = {
  hidden: { opacity: 0, x: 200 },
  visible: { opacity: 1, x: 0, transition: { duration: 5.5 } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

interface ScrollSectionProps {
  children: ReactNode;
  id: string;
}

const ScrollSection = ({ children, id }: ScrollSectionProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={staggerContainer}
      id={id}
      className="scroll-section"
    >
      {children}
    </motion.section>
  );
};

export default function Features() {
  return (
    <div className="3xl:container mx-auto" id="features">
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full font-['Inter'] text-[20px] font-bold leading-[40px] relative text-center whitespace-nowrap mt-12 lg:mt-24 z-[34] mr-0 mb-0"
    >
      <span className="font-['Inter']  lg:text-3xl font-bold leading-[40px] text-[#0067FF] bg-gradient-to-r from-indigo-50 to-purple-50   -b-0  p-3  py-5 rounded-full shadow-lg shadow-[#27548a52]">
        Why ACE CRM is the Right Choice
      </span>
    </motion.h2>

    <div className="bg-gradient-to-r from-indigo-50 to-purple-50  ">
      {/* Feature 1 */}
      <ScrollSection id="feature-1">
        <section className=" relative xl:py-16  smm:-ml-2  sml:-ml-2   xxl:ml-0 xl:ml-0 xxxl:ml-36 2xl:ml-0 xml:left-10">
          <div className="w-full lg:max-w-[1359px] h-[480px] xl:h-[570px] relative z-[76] mt-[3px] mr-0 mb-0  lg:ml-[39px]  xl:ml-0">
            <motion.div
              variants={fadeInUp}
              className=" hidden  xl:block bg-no-repeat rounded-[10px] absolute top-10 lg:top-0 xl:top-24 left-[150px] md:left-[900px] xxl:w-[300px]  xl:left-[1044px]  xxl:left-[1084px] 2xl:left-[1210px] xl:mr-2 xxl:mr-0 z-[74]"
            >
              <Image
                src={Interfaceimage3}
                alt="Product Image"
                className=" w-[200px] md:w-full rounded-[10px] shadow-lg"
              />
            </motion.div>

            <div className="w-[1289px] h-[544px] bg-cover bg-no-repeat rounded-[10px] absolute top-[59px] lg:top-[50px] xl:top-[80px] left-0 smm:left-7 md:left-40 lg:left-0 xl:left-3 xxl:left-[0px] 2xl:left-0 z-[55]">
           <div className="w-20">
           <motion.h3
                variants={fadeInUp}
                className="flex ml-2 gap-3 smm:ml-0 text-left w-[350px]  smm:w-[350px] md:w-[500px] md:text-left lg:w-[450px] xl:w-[650px]  text-3xl sml:text-3xl  mt-10 lg:mt-20 xl:ml-[24px] items-start font-extrabold md:text-4xl lg:text-5xl xl:text-6xl xxl:text-7xl text-[#0067FF]  lg:text-left leading-none "
              >
               <span className=" w-20  p-3 rounded-full  bg-gradient-to-br from-blue-300 to-violet-200 lg:hidden "><Image src={image1} alt="icon" className="w-20 " /></span>  Designed to Feel Instantly Familiar 
              </motion.h3>

           </div>
              <div className=" w-[721px] h-[455px] absolute lg:top-[49px]  lg:left-[480px]  xl:left-[544px]  z-[75]">
                <motion.div
                  variants={slideInRight}
                  className="hidden lg:block w-[150px] lg:w-[190px] h-[120px] bg-no-repeat rounded-[10px] absolute top-10 lg:top-0 xl:left-[130px] xxl:left-[150px] 2xl:left-[200px] z-[73]"
                >
                  <Image
                    src={Interfaceimage1}
                    alt="Product Image"
                    className="  rounded-[10px] shadow-lg"
                  />
                </motion.div>

                <motion.div
                  variants={fadeIn}
                  className=" w-[355px] smm:w-[360px] sml:w-[380px] md:w-[450px] md:mt-20 lg:w-[450px] xl:w-[500px] xxl:w-[650px] 2xl:w-full h-[380px] bg-cover bg-no-repeat rounded-lg absolute top-[80px] md:top-[10px] lg:top-[50px] xl:top-[10px]  xl:left-[180px] left-2 smm:left-0 xxl:left-[220px] 2xl:left-[300px] z-[72]"
                >
                  <video
                    className="w-[600px] object-center  shadow-lg rounded-sm md:rounded-lg"
                    poster="/videos/InterfaceVideo2.jpg"
                    src="/videos/InterfaceVideo2.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                  />
                  <div className="flex w-[35px] h-[35px] gap-[10px] items-center flex-nowrap relative z-[31] mt-[242px] ml-[484px]" />
                </motion.div>

                <motion.div
                  variants={slideInRight}
                  className="hidden lg:block w-[150px] lg:w-[170px] h-[142px] bg-no-repeat rounded-[10px] absolute top-[270px] xl:top-[330px] left-[315px] xl:left-[100px] xxl:left-[150px] 2xl:left-[200px] z-[75]"
                >
                  <Image
                    src={Interfaceimage2}
                    alt="Product image"
                    className="  rounded-[10px] shadow-lg"
                  />
                </motion.div>
              </div>

              <motion.div
                variants={fadeInUp}
                className="  w-1/3 md:w-[500px] lg:w-[490px] xl:w-1/2 mt-[20px] pl-2 smm:pl-0 md:pl-2 pe-5  lg:px-0 lg:py-5 lg:mt-16 text-left xl:ml-5 z-[59] lg:leading-[40px]  "
              >
              <div className=" lg:pl-4 lg:rounded-full  lg:py-2 lg:shadow-xl mr-10 ">
              <span className=" font-['Inter']   text-[16px] sml:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] text-gray-500 md:text-[#0067FF]  font-medium lg:font-semibold ">
                  Navigate with ease, no training needed — just smooth,
                  intuitive CRM from day one.
                </span>
              </div>
              </motion.div>
            </div>
          </div>
        </section>
      </ScrollSection>

      {/* Feature 2 */}
      <ScrollSection id="feature-2">
        <section className="w-full max-w-[2712px] h-[300px] lg:h-[600px] xl:h-[700px] relative z-[119] mt-[0px] md:mt-10 lg:mt-0 mr-0 mb-0 ml-[-1291px] smm:ml-[-1275px] md:ml-[-1130px] lg:ml-[-1351px]  xl:ml-[-1330px] xxl:ml-[-1310px] xxxl:ml-[-1100px] 2xl:ml-[-1310px] xml:ml-[-1260px] ">
          <motion.div
            variants={fadeInUp1}
            className="hidden lg:block w-[120px] lg:w-[181px] h-[173px] bg-cover bg-no-repeat rounded-[10px] absolute top-32 lg:top-12 xl:top-0 left-[1450px] lg:left-[1650px] xxl:left-[1712px] z-[118]"
          >
            <Image
              src={DataImage3}
              alt="Product Image"
              className="  rounded-[10px] shadow-lg"
            />
          </motion.div>

          <motion.div
            variants={slideInLeft1}
            className="hidden lg:block w-[200px] lg:w-[300px] xl:w-[420px] h-[194px] bg-cover bg-no-repeat absolute top-[200px] lg:top-[170px] xl:top-[96px] left-[1290px] lg:left-[1370px] xl:left-[1348px] z-[117]"
          >
            <Image
              src={DataImage2}
              alt="Product Image"
              className=" rounded-[5px] lg:rounded-[10px] shadow-lg"
            />
          </motion.div>

          <div className="w-[1289px] h-[544px] rounded-lg bg-cover bg-no-repeat absolute lg:top-[120px] xl:top-[76px]  left-[1295px] lg:left-[1386px] z-[84]">
            <div className="absolute  lg:top-[70px] lg:left-[500px] xl:left-[620px] xxl:left-[650px] 2xl:left-[700px] z-[97]">
              <motion.h3
                variants={fadeInUp}
                className="flex items-start gap-3 left-1 smm:left-0 font-['Inter'] w-[350px] md:w-[450px] lg:w-[450px]  xl:w-[550px] xxl:w-[650px] text-3xl md:text-4xl lg:text-5xl xl:text-6xl xxl:text-7xl font-extrabold text-[#0067FF] relative  z-[86] mt-10 lg:mt-0 xl:mt-8 lg:ml-0 xxl:ml-6 mr-0 mb-0"
              >
                <span className=" w-20  p-3 rounded-full  bg-red-200 lg:hidden "><Image src={image2} alt="icon" className="w-20 " /></span> Never Enter the Same Data Twice
              </motion.h3>

              <motion.div
                variants={fadeInUp}
                className=" w-[360px]  md:w-[450px] lg:w-[450px] xl:w-[550px] xxl:w-[620px] 2xl:w-full mt-[16px] lg:mt-20 text-left ml-1 lg:ml-5 xl:ml-8 xxl:ml-12 px-0 z-[89]"
              >
               <div className="  lg:-ml-5 lg:pl-5 lg:pe-2.5 lg:rounded-full  lg:py-2 lg:shadow-xl ">
               <span className="font-['Inter'] text-[16px]  lg:text-[18px] xl:text-[20px] 2xl:text-[22px] text-gray-500 md:text-[#0067FF] font-medium   lg:font-semibold lg:leading-[40px]">
                  ACE CRM auto-fills, syncs, and links your data—so you can
                  focus on selling, not typing.
                </span>
               </div>
              </motion.div>
            </div>

            <motion.div
              className="w-1/2 mt-48  lg:mt-24  xl:mt-36 ml-1 xxl:ml-0"
            >
              <video
                className=" w-[355px] smm:w-[360px] sml:w-[380px] md:w-[450px] xl:w-[550px] xxl:w-[600px]   shadow-lg object-center rounded-[5px]"
                poster="/videos/DataVideo2.jpg"
                src="/videos/DataVideo2.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
            </motion.div>
          </div>

          <motion.div
            variants={slideInRight1}
            className="hidden lg:block w-[230px] lg:w-[260px] xl:w-[397px] h-[174px] bg-cover bg-no-repeat rounded-[5px] absolute top-[420px] lg:top-[450px] xl:top-[541px] left-[1450px] lg:left-[1603px] z-[119]"
          >
            <Image
              src={DataImage4}
              alt="Product Image"
              className="rounded-[10px] shadow-lg"
            />
          </motion.div>
        </section>
      </ScrollSection>

      {/* Feature 3 */}
      <ScrollSection id="feature-3">
        <section className="w-full max-w-[1348px] h-[330px] lg:h-[505px] xl:h-[585px] relative z-[146] md:mt-10 lg:mt-0 mt-[0px] mr-0 mb-0 ml-6 smm:ml-9  md:ml-44 lg:ml-0 xl:ml-[12px] xxl:ml-[35px] xxxl:ml-[250px] 2xl:ml-[30px] xml:ml-[110px] ">
          <div className="w-[1289px] h-[544px] rounded-lg bg-cover bg-no-repeat absolute top-0 -left-5 sm:left-0 z-[85]">
            <motion.div
              variants={slideInRight}
              className="w-1/2 mt-[305px] ml-1 md:mt-[310px] lg:mt-44  lg:ml-[550px] xl:ml-[680px] xxl:ml-[700px] 2xl:ml-[750px]"
            >
              <video
                className="w-[355px] smm:w-[360px] sml:w-[380px] md:w-[450px] xl:w-[550px] xxl:w-full h-full object-center rounded-[5px]  shadow-lg "
                poster="/videos/QuotesVideo2.jpg"
                src="/videos/QuotesVideo2.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
            </motion.div>

            <motion.h3
              variants={slideInLeft}
              className="flex left-1 gap-3 w-[350px] lg:w-[510px] xxl:w-[600px] items-start font-['Inter']  text-3xl md:w-[450px] md:text-4xl lg:text-5xl xl:text-6xl xxl:text-7xl font-extrabold leading-[40px] text-[#0067FF] absolute top-[150px] lg:left-[31px] xl:left-4 xxl:left-0  z-[147]"
            >
            <span className=" w-20 smm:w-20 p-3 rounded-full  bg-gradient-to-br from-violet-500 to-blue-200 lg:hidden "><Image src={image3} alt="icon" className="w-20 " /></span>   Create & Share Quotes Instantly
            </motion.h3>

            <motion.div
              variants={slideInLeft}
              className=" w-[363px] md:w-[500px] lg:w-[470px] xl:w-[590px] h-[340px] font-['Inter'] lg:leading-[40px] xl:mt-10 xxl:mt-14 absolute top-[240px] md:top-[250px] lg:top-[320px] lg:left-[38px] xl:left-[26px] xxl:left-[10px] text-left z-[99]"
            >
                 <div className=" pl-2 lg:pl-5 lg:-ml-5 lg:rounded-full  lg:py-2 lg:shadow-xl lg:px-3 ">
                 <span className="font-['Inter'] text-[16px]  lg:text-[18px] xl:text-[20px] 2xl:text-[22px] text-gray-500 md:text-[#0067FF] font-medium  lg:font-semibold ">
                Look professional, close faster custom quotes in just a few
                clicks with ACE CRM.
              </span>
                 </div>
            </motion.div>
          </div>

          <motion.div
            variants={fadeInUp}
            className=" hidden lg:block bg-no-repeat rounded-[10px] absolute lg:top-[90px] xl:top-[80px] lg:left-[650px] mr-5 xl:mr-0 xl:w-[400px] xl:ml-[200px] xxl:left-[780px] 2xl:left-[850px] z-[144]"
          >
            <Image
              src={Quotesimage1}
              alt="Product Image"
              className="rounded-[10px] shadow-lg "
            />
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className=" hidden lg:block w-[250px] h-[150px] rounded-[10px] absolute lg:top-[400px] xl:top-[468px] lg:left-[530px] xl:left-[600px] xxl:left-[600px] 2xl:left-[650px] z-[146]"
          >
            <Image
              src={Quotesimage2}
              alt="Product Image"
              className="rounded-[10px] shadow-lg"
            />
          </motion.div>
        </section>
      </ScrollSection>

      {/* Feature 4 */}
      <ScrollSection id="feature-4">
          <section className="w-full max-w-[2712px] h-[600px] xl:h-[751px] relative z-[119] mt-[81px] mr-0 mb-0 ml-[-1291px] smm:ml-[-1275px] md:ml-[-1120px]   lg:ml-[-1291px] xxl:ml-[-1291px] xxxl:ml-[-1030px] 2xl:ml-[-1291px] xml:ml-[-1190px]">
            <motion.div
              variants={slideInLeft}
              className="hidden lg:block lg:w-[250px] xl:w-[280px] xxl:w-[320px] h-[194px] bg-cover bg-no-repeat absolute top-[70px] xl:top-[56px] left-[1290px] lg:left-[1300px] xl:left-[1308px] 2xl:left-[1310px] z-[117]">
              <Image
                src={salesTeamImage}
                alt="Product Image"
                className="rounded-[10px] shadow-lg"
              />
            </motion.div>

            <div className="w-[1289px] h-[544px] rounded-lg bg-cover bg-no-repeat absolute top-[76px] left-[1170px] xl:left-[1330px] z-[84]">
              <div className="w-[595px] h-[363px]  absolute top-[50px] lg:left-[560px] xl:left-[550px] xxl:left-[679px] z-[97]">

                <motion.h3
                  variants={fadeInUp}
                  className="flex  left-[128px] gap-3 w-[350px] md:w-[450px] justify-start text-left items-start font-['Inter'] lg:w-[500px] xl:w-[600px] xxl:w-[700px] text-3xl md:text-4xl  lg:left-20 xxl:left-4 lg:text-5xl xl:text-6xl xxl:text-7xl font-extrabold text-[#0067FF] relative  lg:text-left z-[86] lg:mt-16  mt-10 xl:mt-16 xxl:ml-0 2xl:ml-10 mr-0 "
                >
                <span className=" w-20 p-2 rounded-full   bg-gradient-to-br from-blue-600 to- lg:hidden"><Image src={image4} alt="icon" className="w-20 " /></span>   Track Your Sales Team Performance
                </motion.h3>

                <motion.div
                  variants={fadeInUp}
                  className="w-[400px] md:w-[500px] lg:w-[480px]  xl:w-[550px] xxl:w-[650px] mt-4  lg:mt-20 text-left px-2 lg:px-0  z-[89] ml-28 lg:ml-20 xl:ml-24 xxl:ml-10 2xl:ml-20 "
                >
                     <div className=" ml-3 lg:-ml-5 lg:pl-5 lg:rounded-full  lg:py-2 lg:shadow-xl lg:px-4">
                     <span className="  font-['Inter'] text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] text-gray-500 md:text-[#0067FF]  font-semibold lg:leading-[40px]">
                     Monitor leads, activities, and closures — all from one smart dashboard, anytime, anywhere.
                  </span>
                     </div>
                </motion.div>
              </div>

              <motion.div
                variants={slideInLeft}
                className="w-1/2 mt-[250px]  lg:mt-36 ml-[130px] xl:ml-1 "
              >
                <video
                  className=" w-[355px] smm:w-[360px] sml:w-[380px] md:w-[450px] lg:w-[450px] xl:w-[550px] xxl:w-[650px] 2xl:w-full h-full object-center  shadow-lg rounded-[5px]"
                  poster="/videos/salesTeamVideo2.jpg"
                  src="/videos/salesTeamVideo2.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
              </motion.div>
            </div>
          </section>
        </ScrollSection>
    </div>
  </div>
  );
}
