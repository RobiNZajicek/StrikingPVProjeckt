'use client';

import { motion } from 'framer-motion';
import './PricingComponent.css';
import Link from 'next/link';

const PricingComponent = ({ data }) => {
  if (!data) return null;

  const { nadpis, multisporText, cena } = data;
  const ceny = Array.isArray(cena) ? cena : [];

  const priceCardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.div
      className="flex flex-col items-center text-white py-16 px-8 max-w-4xl xl:max-w-4xl mx-auto relative bg-background"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="TreninkBlurosss"></div>
      <div className="TreninkBlurosssDos"></div>

      <motion.h2
        className="text-[22px] sm:text-[25px] md:text-[30px] lg:text-[40px] xl:text-[45px] Dosxl:text-[50px] font-black text-primary mb-2 font-orbion text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {nadpis}
      </motion.h2>

      {/* Cenové karty – dvě sekce (1+10 vstupů, měsíční) */}
      <div className="w-full mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {ceny.slice(0, 2).map((item, i) => (
            <motion.div
              key={item.id}
              className="flex-1 bg-[#1C1728] h-[350px] xl:h-[375px] p-4 xl:p-8 rounded-2xl shadow-lg text-left z-10"
              variants={priceCardVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 + i * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl mb-4 font-black text-center text-[20px] sm:text-[20px] md:text-[22px] lg:text-[25px] xl:text-[30px] font-orbion">
                {item.typVztupu}
              </h3>
              <p className="text-[15px] sm:text-[16px] md:text-[15px] lg:text-[18px] z-50 xl:text-[18px] Dosxl:text-[18px] font-black text-primary text-center font-orbion">
                {item.cena}
              </p>
              <ul className="mt-36 space-y-2 text-lg">
                <li className="flex items-center gap-2 text-[12px] sm:text-[13px] md:text-[13px] lg:text-[16px] z-50 xl:text-[18px] Dosxl:text-[18px] font-bold font-sans">
                  <span className="text-primary">✔</span>
                  {item.popis}
                </li>
              </ul>
              <Link
                href="/Registrace"
                className="mt-4 xl:mt-6 mb-2 flex z-50 cursor-pointer justify-center items-center w-full py-3 text-lg font-black font-orbion bg-primary rounded-xl hover:bg-opacity-80 transition"
              >
                Rezervovat
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ceny.slice(2).map((item, i) => (
            <motion.div
              key={item.id}
              className="flex-1 bg-[#1C1728] h-[350px] xl:h-[375px] p-4 xl:p-8 rounded-2xl shadow-lg text-left z-10"
              variants={priceCardVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 + i * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl mb-4 font-black text-center text-[20px] sm:text-[20px] md:text-[22px] lg:text-[25px] xl:text-[30px] font-orbion">
                {item.typVztupu}
              </h3>
              <p className="text-[15px] sm:text-[16px] md:text-[15px] lg:text-[18px] z-50 xl:text-[18px] Dosxl:text-[18px] font-black text-primary text-center font-orbion">
                {item.cena}
              </p>
              <ul className="mt-36 space-y-2 text-lg">
                <li className="flex items-center gap-2 text-[12px] sm:text-[13px] md:text-[13px] lg:text-[16px] z-50 xl:text-[18px] Dosxl:text-[18px] font-bold font-sans">
                  <span className="text-primary">✔</span>
                  {item.popis}
                </li>
              </ul>
              <Link
                href="/Registrace"
                className="mt-4 xl:mt-6 mb-2 flex z-50 cursor-pointer justify-center items-center w-full py-3 text-lg font-black font-orbion bg-primary rounded-xl hover:bg-opacity-80 transition"
              >
                Rezervovat
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <span className='font-normal text-[15px] sm:text-[16px] md:text-[15px] lg:text-[18px] z-50 xl:text-[18px] Dosxl:text-[18px] text-[#BDBDBD] font-sans'>
          {multisporText}
        </span>
      </div>
    </motion.div>
  );
};

export default PricingComponent;
