"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './ReviewsCarousel.css';
import Image from 'next/image';
import uni from '@/public/assets/uni.png';

const ReviewsCarousel = ({ data }) => {
  const [index, setIndex] = useState(0);
  const [maxWidth, setMaxWidth] = useState('none');
  const [isClient, setIsClient] = useState(false);

  const reviews = data?.recenze?.map((r) => ({
    name: r.jmenoRec,
    review: r.recenze,
    stars: 5,
  })) || [];
  const {
    obrazekPozadi,

  } = data;

  const backgroundUrl = obrazekPozadi?.url
  ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${obrazekPozadi.url}`
  : null;

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1600) setMaxWidth('none');
      else if (width >= 1200) setMaxWidth('800px');
      else if (width >= 900) setMaxWidth('800px');
      else if (width >= 600) setMaxWidth('600px');
      else if (width >= 550) setMaxWidth('550px');
      else if (width >= 450) setMaxWidth('450px');
      else if (width >= 400) setMaxWidth('400px');
      else if (width >= 350) setMaxWidth('350px');
      else if (width >= 300) setMaxWidth('300px');
      else setMaxWidth('none');
    };

    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  useEffect(() => {
    if (isClient) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % (window.innerWidth < 1600 ? reviews.length : Math.ceil(reviews.length / 2)));
      }, 7500);
      return () => clearInterval(interval);
    }
  }, [isClient, reviews.length]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <motion.div
      className='relative flex flex-col items-center text-white py-16 overflow-hidden wrapper z-0'
      initial="hidden"
      whileInView="visible"
      variants={staggerChildren}
      viewport={{ once: true }}
    >
      <div className='absolute inset-0 bg-black opacity-70 z-0'></div>
      <div className='absolute inset-0' style={{ backgroundImage: `url(${backgroundUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      <motion.h2
        className='relative text-[40px] mt-8 xl:mt-24 sm:text-[45px] md:text-[35px] lg:text-[45px] xl:text-[50px] font-orbion font-black text-white uppercase z-10'
        variants={fadeInUp}
      >
        {data?.nadpis || "Recenze"}
      </motion.h2>
      <motion.div
        className='relative flex gap-6 mt-8 w-full justify-center z-10'
        style={{ overflow: 'hidden', height: '400px' }}
        variants={staggerChildren}
      >
        <motion.div
          className='flex w-full transition-transform duration-[1500ms] ease-in-out'
          style={{
            transform: `translateX(-${index * (isClient && window.innerWidth < 1600 ? 100 : 50)}%)`,
            width: `${isClient && window.innerWidth < 1600 ? reviews.length * 100 : (reviews.length / 2) * 100}%`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              className={`${isClient && window.innerWidth < 1600 ? 'w-full' : 'w-1/2'} p-6 flex-shrink-0 flex justify-center`}
              variants={fadeInUp}
            >
              <div
                className='relative bg-[#121212] z-30 h-[285px] sm:h-[270px] md:h-[260px] lg:h-[310px] xl:h-[328px] p-4 md:p-8 rounded-xl text-white shadow-lg w-full'
                style={{ maxWidth: maxWidth }}
              >
                <div className='flex text-2xl'>
                  {Array(review.stars).fill().map((_, idx) => (
                    <span key={idx} className='text-primary text-[30px]'>★</span>
                  ))}
                </div>
                <p className='mt-2 sm:mt-2 md:mt-4 xl:mt-6 text-[14px] lg:text-[18px] Dosxl:text-[20px] font-sans h-40 sm:h-36 md:h-24 lg:h-32 xl:h-36'>
                  {review.review}
                </p>
                <p className='mt-6 font-bold text-primary text-xl font-sans text-[14px] lg:text-[18px] Dosxl:text-[20px]'>
                  {review.name}
                </p>
                <Image width={196} height={172} src={uni.src} className='z-0 absolute opacity-20 w-[250px] h-[250px] right-4 top-4' alt="logo" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ReviewsCarousel;
