'use client';

import React from 'react';
import { motion } from 'framer-motion';
import './GoogleMap.css';

type GoogleMapProps = {
  data: {
    nadpis: string;
    mapaUrl: string;
  };
};

const GoogleMap = ({ data }: GoogleMapProps) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <motion.div
      className="flex flex-col items-center text-white py-16 px-8 h-[700px] sm:h-[700px] md:h-[800px] xl:h-[900px] Dosxl:h-[1000px] mx-auto shadow-lg overflow-hidden font-sans rounded-xl relative"
      initial="hidden"
      whileInView="visible"
      variants={fadeInUp}
      viewport={{ once: true }}
    >
      <div className="FaqRight"></div>
      <div className="FaqRightLef"></div>

      <motion.h2
        className="text-[22px] sm:text-[25px] md:text-[30px] lg:text-[40px] xl:text-[45px] Dosxl:text-[50px] font-black text-primary uppercase mb-24 text-center font-orbion"
        variants={fadeInUp}
      >
        {data.nadpis}
      </motion.h2>

      <motion.div
        className="w-full flex justify-center h-full rounded-xl overflow-hidden"
        variants={fadeIn}
      >
        <iframe
          className="w-[100%] xl:w-[80%] h-[95%] Dosxl:h-[90%] rounded-xl"
          src={data.mapaUrl}
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.div>
    </motion.div>
  );
};

export default GoogleMap;
