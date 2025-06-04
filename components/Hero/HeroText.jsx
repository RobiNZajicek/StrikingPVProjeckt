'use client';

import { Container } from '@mantine/core';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import Image from 'next/image';
import classes from './HeroText.module.css';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroText({ data }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!data) {
    return (
      <div className={classes.wrapper}>
        <div className="absolute inset-0 bg-black opacity-60 z-1"></div>
        <div className="relative z-50 flex flex-col items-center justify-center text-center text-white h-[60vh] px-4 sm:px-6">
          <div className="h-12 w-3/4 bg-gray-700 rounded animate-pulse mb-4"></div>
          <div className="h-6 w-1/2 bg-gray-600 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  const {
    nadpis,
    podNadpis,
    obrazekPozadi,
    tlacitko1,
    tlacitko2
  } = data;

  const backgroundUrl = obrazekPozadi?.url?.startsWith('http')
  ? obrazekPozadi.url // URL je kompletní (Cloudinary), nepřidávej nic
  : `${process.env.NEXT_PUBLIC_STRAPI_URL}${obrazekPozadi.url}`; // Jinak prefixni

  return (
    <div className={classes.wrapper}>
      <div className="absolute inset-0 bg-black opacity-60 z-1"></div>
      <div className={classes.heroLeft}></div>
      <div className={classes.heroRight}></div>

      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, x: -230, rotateZ: 90 }}
          animate={{ opacity: 1, x: -180, rotateZ: 90 }}
          transition={{ duration: 0.5, ease: 'linear', delay: 1.5 }}
          viewport={{ once: true }}
          className="absolute left-5% flex flex-row z-40 text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] Dosxl:lg:text-[18px] justify-center items-center gap-2 sm:gap-3 lg:gap-4 
            top-[65%] sm:top-[75%] md:top-[80%] xl:top-[50%] xl:left-[4%] xl:-translate-x-1/2 Dosxl:left-[1%] Dosxl:-translate-x-1/2 xl:rotate-90 
            before:content-[''] before:w-10 sm:before:w-14 md:before:w-12 Dosxl:before:w-20 before:h-[2px] before:bg-[#BDBDBD] before:inline-block before:mr-1 sm:before:mr-2 
            after:content-[''] after:w-10 sm:after:w-14 md:after:w-12 Dosxl:after:w-20 after:h-[2px] after:bg-[#BDBDBD] after:inline-block after:ml-1 sm:after:ml-2"
        >
          <div className="flex items-center gap-4">
            <span className="text-[#BDBDBD] xl:flex hidden font-normal text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] Dosxl:text-[18px] z-50 font-orbion">
              Sleduj nás :
            </span>
            <a href="https://www.instagram.com/praguestrikingacademy/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-white hover:text-primary transition duration-300 size-[15px] Dosxl:size-[20px]" />
            </a>
            <a href="https://www.facebook.com/Praguestrikingacademy?locale=cs_CZ" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="text-white hover:text-primary transition duration-300 size-[15px] Dosxl:size-[20px]" />
            </a>
            <a href="https://www.youtube.com/@Fit2Fight" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="text-white hover:text-primary transition duration-300 size-[15px] Dosxl:size-[20px]" />
            </a>
          </div>
        </motion.div>
      )}

      {backgroundUrl && (
        <Image
        src={`${backgroundUrl}?w=3840?q=85`}

          alt={obrazekPozadi?.alternativeText || 'Hero background'}
          priority
          fill
          className="z-0 object-cover"
          unoptimized // DŮLEŽITÉ!
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="relative z-50 flex flex-col items-center text-center text-white px-4 sm:px-6"
      >
        <h1 className="text-[25px] font-orbion sm:text-[35px] md:text-[40px] lg:text-[45px] xl:text-[55px] Dosxl:text-[75px] font-black text-white uppercase">
          {nadpis}
        </h1>

        <Container p={0} size={600}>
          <h2 className="text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] Dosxl:text-[18px] font-bold">
            {podNadpis}
          </h2>
        </Container>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="flex sm:flex-row gap-3 sm:gap-6 justify-center items-center mt-4 sm:mt-8"
        >
          {tlacitko1 && (
            <Link href={tlacitko1.odkazNa} className="bg-primary flex items-center justify-center font-sans w-[105px] sm:w-[100px] md:w-[120px] lg:w-[140px] h-[36px] sm:h-[40px] md:h-[44px] lg:h-[42px] xl:w-[135px] xl:h-[42px] Dosxl:w-[187px] Dosxl:h-[48px] border-2 border-primary rounded-xl text-[10px] sm:text-[12px] md:text-[13px] lg:text-[15px] Dosxl:text-[16px] font-bold text-white hover:bg-primary-dark transition-colors">
              {tlacitko1.text}
            </Link>
          )}
          {tlacitko2 && (
            <Link href={tlacitko2.odkazNa} className="bg-primary flex items-center justify-center font-sans w-[105px] sm:w-[100px] md:w-[120px] lg:w-[140px] h-[36px] sm:h-[40px] md:h-[44px] lg:h-[42px] xl:w-[135px] xl:h-[42px] Dosxl:w-[187px] Dosxl:h-[48px] border-2 border-primary rounded-xl text-[10px] sm:text-[12px] md:text-[13px] lg:text-[15px] Dosxl:text-[16px] font-bold text-white hover:bg-primary-dark transition-colors">
              {tlacitko2.text}
            </Link>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
