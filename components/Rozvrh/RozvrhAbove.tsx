'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import classes from './RozvrhAbove.module.css';
import { Title } from '@mantine/core';

const RozvrhAbove = ({ data }) => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  // Get image URL from Strapi data
  const { obrazekPozadi } = data;

  const imageUrl = obrazekPozadi?.url.startsWith('http')
  ? obrazekPozadi.url // URL je kompletní (Cloudinary), nepřidávej nic
  : `${process.env.NEXT_PUBLIC_STRAPI_URL}${obrazekPozadi.url}`; // Jinak prefixni

  return (
    <div className={classes.wrapper}>
      {/* Decorative Line */}
      <motion.div
        className="absolute flex flex-row z-40 top-96 -left-40 rotate-90 gap-4 text-[20px] justify-center items-center before:content-[''] before:w-20 before:h-[2px] before:bg-[#BDBDBD] before:inline-block before:mr-2 after:content-[''] after:w-20 after:h-[2px] after:bg-[#BDBDBD] after:inline-block after:ml-2"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        viewport={{ once: true }}
      />

      {/* Background Image from Strapi */}
      {imageUrl && (
        <Image 
        src={`${imageUrl}?w=3840?q=85`}

          alt="Background" 
          layout="fill" 
          objectFit="cover" 
          className="z-0"
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
        <Title className={classes.title}>
          {data?.nadpis || 'Rozvrh'}
        </Title>
      </motion.div>
    </div>
  );
};

export default RozvrhAbove;