"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import uni from "@/public/assets/uni.png";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./Treneri.css";

const Treneri = ({ data }) => {
  if (!data) return null;

  const {
    nadpis,
    podNadpis,
    jmeno1,
    sport1,
    popisTrener,
    obrazekTrener,
    jmeno2,
    sport2,
    popisTrener2,
    obrazekTrener2,
    jmeno3,
    sport3,
    popisTrener3,
    obrazekTrener3,
    jmeno4,
    sport4,
    popisTrener4,
    obrazekTrener4,
  } = data;

  const trainers = [
    {
      name: jmeno1,
      sport: sport1,
      description: popisTrener,
      image: obrazekTrener?.url?.startsWith('http')
        ? obrazekTrener.url
        : `${process.env.NEXT_PUBLIC_STRAPI_URL}${obrazekTrener?.url}`,
    },
    {
      name: jmeno2,
      sport: sport2,
      description: popisTrener2,
      image: obrazekTrener2?.[0]?.url?.startsWith('http')
        ? obrazekTrener2[0].url
        : `${process.env.NEXT_PUBLIC_STRAPI_URL}${obrazekTrener2?.[0]?.url}`,
    },
    {
      name: jmeno3,
      sport: sport3,
      description: popisTrener3,
      image: obrazekTrener3?.[0]?.url?.startsWith('http')
        ? obrazekTrener3[0].url
        : `${process.env.NEXT_PUBLIC_STRAPI_URL}${obrazekTrener3?.[0]?.url}`,
    },
    {
      name: jmeno4,
      sport: sport4,
      description: popisTrener4,
      image: obrazekTrener4?.url?.startsWith('http')
        ? obrazekTrener4.url
        : `${process.env.NEXT_PUBLIC_STRAPI_URL}${obrazekTrener4?.url}`,
    },
  ];

  // ↓↓↓ A dál už můžeš pokračovat s `trainers.map(...)` ve své původní podobě ↓↓↓
  // Jen kontroluj, že `image && <Image src={image} ... />` má validní hodnotu, jinak nerenderuj vůbec


  const [hoveredTrainer, setHoveredTrainer] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [mobilePopup, setMobilePopup] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTrainers, setActiveTrainers] = useState([0, 1, 2, 3]);
  const { ref, inView } = useInView({ triggerOnce: true });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const updateCursor = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    document.addEventListener("mousemove", updateCursor);
    return () => document.removeEventListener("mousemove", updateCursor);
  }, []);

  useEffect(() => {
    if (isClient) {
      const checkMobile = () => {
        const mobile = window.innerWidth < 1024;
        setIsMobile(mobile);
        setActiveTrainers(mobile ? [0, 1, 2, 3] : [0, 1, 2]);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, [isClient]);

  const moveLeft = () => {
    setActiveTrainers((prev) => prev.map((index) => (index === 0 ? trainers.length - 1 : index - 1)));
  };

  const moveRight = () => {
    setActiveTrainers((prev) => prev.map((index) => (index === trainers.length - 1 ? 0 : index + 1)));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.5, delayChildren: 0.2 },
    },
  };

  const trainerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="flex flex-col items-center text-white py-12 bg-[#00060E] relative pb-44">
      <div className="TreninkBlurosss"></div>
      <div className="TreninkBlurosssTop"></div>

      <h2 className="text-[30px] mt-8 xl:mt-24 sm:text-[30px] md:text-[35px] lg:text-[45px] xl:text-[50px] font-orbion font-black text-primary uppercase">
        {nadpis}
      </h2>
      <h2 className="text-[14px] sm:text-[15px] md:text-[15px] lg:text-[16px] z-50 xl:text-[17px] Dosxl:text-[18px] text-center font-medium text-[#BDBDBD] mt-4 mb-4 w-4/6 sm:w-4/6 md:w-4/6 lg:w-3/6 Dosxl:1/6 font-sans">
        {podNadpis}
      </h2>

      <motion.div
        ref={ref}
        className="flex flex-col md:flex-row gap-8 Dosxl:gap-6 xl:gap-6 md:gap-4 mt-8 relative items-center"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        key={activeTrainers.join(",")}
      >
        <button onClick={moveLeft} className="absolute left-0 z-50 p-2 -ml-14 md:flex hidden bg-black/50 rounded-full hover:bg-black/80 transition duration-300">
          <FaArrowLeft size={24} className="text-white xl:size-4 md:size-3" />
        </button>

        {activeTrainers.map((index) => {
          const trainer = trainers[index];
          return (
            <motion.div
              key={index}
              className="relative w-[280px] h-[340px] md:w-[200px] md:h-[300px] lg:w-[270px] lg:h-[380px] xl:w-[280px] xl:h-[420px] Dosxl:w-[420px] Dosxl:h-[550px] bg-black overflow-hidden rounded-xl group"
              onMouseEnter={() => !isMobile && setHoveredTrainer(trainer)}
              onMouseLeave={() => !isMobile && setHoveredTrainer(null)}
              onClick={() => isMobile && setMobilePopup(trainer)}
              variants={trainerVariants}
            >
              <div className="absolute inset-0 bg-black/70 z-10 transition-opacity duration-300 group-hover:opacity-50" />
              <Image
  src={
    trainer.image.includes('?')
      ? `${trainer.image}&w=3840&q=85`
      : `${trainer.image}?w=3840&q=85`
  }
  alt={trainer.name}
  objectFit="cover"
  className="grayscale-100 z-20 transition-all duration-300 group-hover:grayscale-0 group-hover:scale-105"
  fill
  unoptimized
/>

              <div className="absolute top-4 right-4 flex flex-col items-center gap-4 p-2 rounded-lg z-30">
                <a href="https://www.instagram.com/praguestrikingacademy/" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="text-white hover:text-primary transition duration-300 size-[15px] sm:size-[16px] md:size-[15px] lg:size-[20px]" />
                </a>
                <a href="https://www.facebook.com/Praguestrikingacademy?locale=cs_CZ" target="_blank" rel="noopener noreferrer">
                  <FaFacebookF className="text-white hover:text-primary transition duration-300 size-[15px] sm:size-[16px] md:size-[15px] lg:size-[20px]" />
                </a>
              </div>
              <div className="absolute bottom-4 left-4 text-white font-bold flex flex-row items-center justify-center z-30">
                <div className="w-[4px] h-10 bg-primary mb-0 mr-4" />
                <div className="flex flex-col">
                  <h1 className="block text-primary text-[15px] sm:text-[16px] md:text-[15px] lg:text-[16px] Dosxl:text-[18px] font-orbion font-black">{trainer.name}</h1>
                  <h1 className="block text-gray-300 text-[15px] sm:text-[16px] md:text-[15px] lg:text-[16px] Dosxl:text-[18px] font-orbion font-black">{trainer.sport}</h1>
                </div>
              </div>
            </motion.div>
          );
        })}

        <button onClick={moveRight} className="absolute right-0 z-50 p-2 bg-black/50 md:flex hidden -mr-14 rounded-full hover:bg-black/80 transition duration-300">
          <FaArrowRight size={24} className="text-white xl:size-4 md:size-3 md:flex hidden" />
        </button>
      </motion.div>

      {!isMobile && hoveredTrainer && (
        <motion.div
          className="fixed bg-primary xl:w-[290px] xl:h-[185px] xl:p-4 Dosxl:w-[320px] Dosxl:h-[190px] p-6 z-50 text-white rounded-xl shadow-lg hidden md:flex"
          style={{ top: cursorPos.y + 10, left: cursorPos.x + 10 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex relative flex-col">
            <h3 className="text-[15px] font-black font-orbion">{hoveredTrainer.name}</h3>
            <h3 className="text-[15px] font-black font-orbion mb-4">{hoveredTrainer.sport}</h3>
            <p className="font-sans font-bold text-[14px]">{hoveredTrainer.description}</p>
            <Image width={176} height={122} src={uni.src} className="absolute opacity-20 right-0 -top-6" alt="logo" />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Treneri;
