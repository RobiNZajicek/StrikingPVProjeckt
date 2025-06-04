'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import classes from './KontaktAbove.module.css';
import { Title } from '@mantine/core';

type KontaktAboveProps = {
  data: {
    nadpis: string;
    obrazekPozadi?: { url: string }[];
  };
};

const KontaktAbove = ({ data }: KontaktAboveProps) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const rawUrl = data?.obrazekPozadi?.[0]?.url || '';
  const imageUrl = rawUrl.startsWith('http')
    ? rawUrl
    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${rawUrl}`;

  return (
    <div className={classes.wrapper}>
      <motion.div className={classes.heroLeft} initial="hidden" animate="visible" variants={fadeIn} viewport={{ once: true }} />
      <motion.div className={classes.heroRight} initial="hidden" animate="visible" variants={fadeIn} viewport={{ once: true }} />

      <motion.div
        className="absolute flex flex-row z-40 top-96 -left-40 rotate-90 gap-4 text-[20px] justify-center items-center before:content-[''] before:w-20 before:h-[2px] before:bg-[#BDBDBD] before:inline-block before:mr-2 after:content-[''] after:w-20 after:h-[2px] after:bg-[#BDBDBD] after:inline-block after:ml-2"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        viewport={{ once: true }}
      />

      {imageUrl && (
        <Image
          src={`${imageUrl}?w=3840?q=85`}
          unoptimized
          alt="Pozadí kontakt"
          layout="fill"
          objectFit="cover"
        />
      )}

      <motion.div className={classes.inner} initial="hidden" animate="visible" variants={fadeInUp} viewport={{ once: true }}>
        <Title className={classes.title}>{data?.nadpis}</Title>
      </motion.div>
    </div>
  );
};

export default KontaktAbove;
