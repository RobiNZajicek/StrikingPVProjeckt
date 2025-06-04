'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import './KontaktForm.css';
import { toast, Toaster } from 'react-hot-toast';

const iconMap = {
  'Telefonní číslo': <FaPhoneAlt />,
  'Emailová adresa': <FaEnvelope />,
  'Adresa': <FaMapMarkerAlt />,
};


const KontaktForm = ({ data }) => {
  const form = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    emailjs.init('FjHR19_UwmBrW35Gr');
  }, []);

  const sendEmail = async (e) => {
    e.preventDefault();
    if (!form.current || isSubmitting) return;
    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        'service_striking',
        'template_striking',
        form.current,
        'FjHR19_UwmBrW35Gr'
      );
      toast.success('Zpráva byla zaslána');
      form.current.reset();
    } catch (error) {
      toast.error('Odeslání zprávy selhalo');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div className='relative flex justify-center flex-col px-[1%] xl:px-[7%] Dosxl:px-[15%]'>
      <Toaster position="top-center" />
      <div className='KonBlurosss'></div>
      <motion.h1 className='text-center font-orbion font-black text-primary text-[22px] sm:text-[25px] md:text-[30px] lg:text-[40px] xl:text-[45px] Dosxl:text-[50px] uppercase mt-20'>
        {data.nadpis}
      </motion.h1>

      <motion.div className='flex flex-col items-center md:flex-row text-white py-16 w-full rounded-lg shadow-lg justify-center font-sans gap-0 max-w-[90%] mx-auto'>
        {/* Formulář */}
        <motion.div className='w-full md:w-3/5 p-2 flex flex-col flex-1'>
          <form ref={form} onSubmit={sendEmail} className='flex flex-col flex-grow'>
            <input type='text' name='user_name' placeholder='Jakub Novak' className='w-full p-4 bg-[#1C1728] rounded-xl text-white placeholder-gray-400 h-16 mb-4 text-lg' required />
            <input type='email' name='user_email' placeholder='Email' className='w-full p-4 bg-[#1C1728] rounded-xl text-white placeholder-gray-400 h-16 mb-4 text-lg' required />
            <textarea name='message' placeholder='Zadejte zprávu' rows='6' className='w-full p-4 bg-[#1C1728] rounded-xl text-white placeholder-gray-400 h-full mb-4 text-lg flex-grow' required></textarea>
            <button type='submit' disabled={isSubmitting} className='w-full bg-[#C060CB] text-white py-4 rounded-xl text-xl font-bold opacity-90 hover:opacity-100 transition-all disabled:opacity-50'>
              {isSubmitting ? 'Odesílání...' : 'Odeslat'}
            </button>
          </form>
        </motion.div>

        {/* Kontaktní údaje ze Strapi */}
        <motion.div className='w-full md:w-2/5 p-2 flex flex-col gap-4 justify-center flex-1'>
          {data.blockKontakt.map((item, i) => (
            <motion.div key={i} className='bg-[#1C1728] h-[135px] p-6 rounded-xl flex items-center gap-4 w-full'>
              <div className='shrink-0 text-[#C060CB] text-[20px] md:text-[24px]'>
                {iconMap[item.kontaktUdajNazev] || <FaMapMarkerAlt />}
              </div>
              <div className='min-w-0 flex-grow'>
                <p className='text-gray-400 text-lg'>{item.kontaktUdajNazev}</p>
                <p className='text-white font-bold text-[14px] sm:text-[16px] md:text-[18px] break-words'>{item.kontaktUdaj}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default KontaktForm;
