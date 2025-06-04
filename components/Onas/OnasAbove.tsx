'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import classes from './Onas.module.css';

const OnasAbove = ({ data }) => {
  if (!data) return null;

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const { title, obrazek } = data;
  const imageUrl = obrazek?.url?.startsWith('http')
  ? obrazek.url // URL je kompletní (Cloudinary), nepřidávej nic
  : `${process.env.NEXT_PUBLIC_STRAPI_URL}${obrazek.url}`; // Jinak prefixni

  return (
    <div className={classes.wrapper}>
      {/* Decorative Line */}
      <motion.div
        className="absolute flex flex-row z-40 top-96 -left-40 rotate-90 gap-4 text-[16px] sm:text-[20px] justify-center items-center before:content-[''] before:w-14 sm:before:w-20 before:h-[2px] before:bg-[#BDBDBD] before:inline-block before:mr-2 after:content-[''] after:w-14 sm:after:w-20 after:h-[2px] after:bg-[#BDBDBD] after:inline-block after:ml-2"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        viewport={{ once: true }}
      />

      {/* Background Image from Strapi */}
      {imageUrl && (
  <Image
  src={`${imageUrl}?w=3840?q=85`}  // Přidej parametry správně
  alt="Muai thay gym"
  layout="fill"
  objectFit="cover"
  priority
  unoptimized // DŮLEŽITÉ!
/>
)}


      {/* Content */}
      <motion.div
        className={classes.inner}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        viewport={{ once: true }}
      >
        <h1 className="text-white mb-10 font-orbion uppercase text-[40px] sm:text-[55px] md:text-[75px] lg:text-[85px] font-black text-center">
          {title}
        </h1>
      </motion.div>
    </div>
  );
};

export default OnasAbove;
