'use client';

import React from 'react';
import { motion } from 'framer-motion';
import './Proces.css';
import Link from 'next/link';

const Proces = ({ data }) => {
  if (!data) return null;

  const {
    napis,
    nadpisBlock1,
    podNadpisBlock1,
    nadpisBlock2,
    podNadpisBlock2,
    nadpisBlock3,
    podNadpisBlock3,
    nadpisBlock4,
    podNadpisBlock4,
    tlacitko,
  } = data;

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <motion.div
      className='flex items-center flex-col mt-14 mb-36 md:mb-36 Dosxl:mb-72 md:0 bg-background relative'
      initial='hidden'
      whileInView='visible'
      variants={staggerChildren}
      viewport={{ once: true }}
    >
      <motion.div className='bluros blurss' variants={fadeIn} />

      <motion.div className='flex flex-col gap-4 items-center' variants={fadeInUp}>
        <h1 className='text-[22px] sm:text-[25px] md:text-[30px] lg:text-[40px] xl:text-[45px] Dosxl:text-[50px] font-black text-center'>
          {napis}
        </h1>
        {tlacitko && tlacitko.odkazNa && (
          <Link
            href={tlacitko.odkazNa}
            className=' bg-primary z-20 flex cursor-pointer items-center justify-center font-sans w-[105px] sm:w-[100px] md:w-[120px] lg:w-[140px]  h-[36px] sm:h-[40px] md:h-[44px] lg:h-[42px] xl:w-[135px] xl:h-[42px] Dosxl:w-[187px] Dosxl:h-[48px]  border-2  border-primary rounded-xl text-[10px] sm:text-[12px] md:text-[13px] lg:text-[15px] Dosxl:text-[16px] font-bold text-white '
          >
            {tlacitko.text}
          </Link>
        )}
      </motion.div>

      <motion.div
        className='flex flex-col md:flex-row gap-[5%] Dosxl:gap-[10%] mt-20 xl:mt-16 Dosxl:mt-44 md:mt-32 items-center justify-center'
        variants={staggerChildren}
      >
        {/* Step 1 */}
        <motion.div className='flex flex-col justify-center items-center w-1/4' variants={fadeInUp}>
          {/* SVG nezměněno */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="Dosxl:size-20 xl:size-16  size-14 mt-4 text-primary">
            <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
            <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
          </svg>
          <span className='text-[25px]  sm:text-[25px] md:text-[25px] lg:text-[28px] xl:text-[30px] Dosxl:text-[45px] z-50 uppercase font-black text-white font-orbion'>
            {nadpisBlock1}
          </span>
          <span className='font-normal text-[15px] sm:text-[16px] md:text-[15px] lg:text-[18px] z-50 xl:text-[18px] Dosxl:text-[18px]  text-[#BDBDBD] text-center w-[250px] md:w-full font-sans mb-8'>
            {podNadpisBlock1}
          </span>
        </motion.div>

        {/* Stejně pro ostatní kroky... */}

        {/* Step 2 */}
        <motion.div className='flex flex-col justify-center items-center w-1/4' variants={fadeInUp}>
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='Dosxl:size-20 xl:size-16 size-14 mt-4 text-primary'
          >
            <path d='M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z' />
            <path
              fillRule='evenodd'
              d='M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z'
              clipRule='evenodd'
            />
          </svg>
          {/* ... */}
          <span className='text-[25px] z-50  sm:text-[25px] md:text-[25px] lg:text-[28px] xl:text-[30px] Dosxl:text-[45px] uppercase font-black text-white font-orbion'>
            {nadpisBlock2}
          </span>
          <span className='font-normal z-50  text-[15px] sm:text-[16px] md:text-[15px] lg:text-[18px] Dosxl:text-[20px] text-[#BDBDBD]  text-center w-[250px] md:w-5/6 font-sans mb-8'>
            {podNadpisBlock2}
          </span>
        </motion.div>

        {/* Step 3 */}
        <motion.div className='flex flex-col justify-center items-center w-1/4' variants={fadeInUp}>
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='Dosxl:size-20 xl:size-16 size-14 mt-4 text-[#A05A96]'
          >
            <path
              fillRule='evenodd'
              d='M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z'
              clipRule='evenodd'
            />
          </svg>
          {/* ... */}
          <span className='text-[25px] z-50  sm:text-[25px] md:text-[25px] lg:text-[28px] xl:text-[30px] Dosxl:text-[45px] uppercase font-black text-white font-orbion'>
            {nadpisBlock3}
          </span>
          <span className='font-normal z-50  text-[15px] sm:text-[16px] md:text-[15px] lg:text-[18px] Dosxl:text-[20px] text-[#BDBDBD] text-center w-[250px] md:w-5/6 font-sans mb-8'>
            {podNadpisBlock3}
          </span>
        </motion.div>

        {/* Step 4 */}
        <motion.div className='flex flex-col justify-center items-center w-1/4' variants={fadeInUp}>
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='Dosxl:size-20 xl:size-16 size-14 mt-4 text-primary'
          >
            <path
              fillRule='evenodd'
              d='M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z'
              clipRule='evenodd'
            />
          </svg>
          {/* ... */}
          <span className='text-[25px] sm:text-[25px] md:text-[25px] lg:text-[28px] xl:text-[30px] Dosxl:text-[45px] uppercase font-black text-white font-orbion'>
            {nadpisBlock4}
          </span>
          <span className='font-normal text-[15px] sm:text-[16px] md:text-[15px] lg:text-[18px] Dosxl:text-[20px] text-[#BDBDBD] text-center w-[250px] md:w-3/6 font-sans mb-8'>
            {podNadpisBlock4}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Proces;
