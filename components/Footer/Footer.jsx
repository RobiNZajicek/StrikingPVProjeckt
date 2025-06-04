'use client';

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import uni from "@/public/uni.png";
import "./Footer.css";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.2 } },
};

const Footer = () => {
  return (
    <motion.footer
      className="flex flex-col md:flex-row py-12 gap-10 md:gap-2 items-center md:items-start mt-32 relative font-sans text-center md:text-center w-full px-[-5] justify-center"
      initial="hidden"
      whileInView="visible"
      variants={staggerChildren}
      viewport={{ once: true }}
    >
      {/* Blur Effect */}
      <motion.div className="bluros blursses" variants={fadeInUp} />

      {/* Logo Section */}
      <motion.div className="flex justify-center md:justify-start" variants={fadeInUp}>
        <img
          width={217}
          height={292}
          src={uni.src}
          alt="logo"
          className="w-[100px] sm:w-[140px] md:w-[160px] lg:w-[180px] xl:w-[160px] Dosxl:w-[180px] h-auto"
        />
      </motion.div>

      {/* Navigation */}
      <motion.div
        className="flex flex-col items-center md:items-center w-full sm:w-1/4 lg:w-1/4 justify-center gap-3"
        variants={fadeInUp}
      >
        <h2 className="font-black  text-[15px] sm:text-[16px] md:text-[15px] lg:text-[18px] z-50 xl:text-[18px] Dosxl:text-[25px]">Navigace</h2>
        <ul className="flex flex-col gap-4">
          <li>
            <Link href="/Onas/" className="text-[12px] sm:text-[15px] md:text-[15px] lg:text-[16px] z-50 xl:text-[17px] Dosxl:text-[18px]">
              O nás
            </Link>
          </li>
          <li>
            <Link href="/Cenik/" className="text-[12px] sm:text-[15px] md:text-[15px] lg:text-[16px] z-50 xl:text-[17px] Dosxl:text-[18px]">
              Ceník
            </Link>
          </li>
          <li>
            <Link href="/Rozvrh/" className="text-[12px] sm:text-[15px] md:text-[15px] lg:text-[16px] z-50 xl:text-[17px] Dosxl:text-[18px]">
              Rozvrh
            </Link>
          </li>
          <li>
            <Link href="/Kontakt/" className="text-[12px] sm:text-[15px] md:text-[15px] lg:text-[16px] z-50 xl:text-[17px] Dosxl:text-[18px]">
              Kontakt
            </Link>
          </li>
        </ul>
      </motion.div>

      {/* Contact */}
      <motion.div
        className="flex flex-col items-center md:items-center w-full sm:w-1/4 lg:w-1/4 gap-3"
        variants={fadeInUp}
      >
        <h2 className="font-black  text-[15px] sm:text-[16px] md:text-[15px] lg:text-[18px] z-50 xl:text-[18px] Dosxl:text-[25px]">Kontakt</h2>
        <span className="text-[12px] sm:text-[15px] md:text-[15px] lg:text-[16px] z-50 xl:text-[17px] Dosxl:text-[18px]">728 652 065</span>
        <span className="text-[12px] sm:text-[15px] md:text-[15px] lg:text-[16px] z-50 xl:text-[17px] Dosxl:text-[18px]">prague.striking.academy@gmail.com</span>
        <span className="text-[12px] sm:text-[15px] md:text-[15px] lg:text-[16px] z-50 xl:text-[17px] Dosxl:text-[18px] text-center md:text-center">
          Bellušova 1877/68, 155 00 Praha 5-Stodůlky
        </span>
      </motion.div>

      {/* Social Media */}
      <motion.div
        className="flex flex-col items-center w-full sm:w-1/4 gap-3"
        variants={fadeInUp}
      >
        <h2 className="font-black  text-[15px] sm:text-[16px] md:text-[15px] lg:text-[18px] z-50 xl:text-[18px] Dosxl:text-[25px]">Sociální sítě</h2>
        <h2 className="font-black  text-[12px] sm:text-[12px] md:text-[12px] lg:text-[12px] z-50 xl:text-[14px] Dosxl:text-[15px]">Bojové sporty</h2>
        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/praguestrikingacademy/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram
              size={24}
              
              className="text-white hover:text-primary transition duration-300"
            />
          </a>
          <a
            href="https://www.facebook.com/Praguestrikingacademy?locale=cs_CZ"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebookF
              size={24}
              className="text-white hover:text-primary transition duration-300"
            />
          </a>
          <a
            href="https://www.youtube.com/@Fit2Fight"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <FaYoutube
              size={24}
              className="text-white hover:text-primary transition duration-300"
            />
          </a>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
