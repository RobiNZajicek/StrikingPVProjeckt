'use client';

import React, { useState, useEffect, useRef, FC } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { db } from '../../../firebase'; // Zkontroluj cestu k tvé Firebase instanci (např. Striking/firebase.ts)
import { addDoc, collection } from 'firebase/firestore';
import { toast, Toaster } from "react-hot-toast";
import emailjs from '@emailjs/browser';

// Import komponenty kalendáře
import TrainingCalendarAndSelector from './TrainingCalendarAndSelector';
// Import pomocných funkcí
import { generateSimpleCode, cleanText, formatTrainingTimeForFirebase } from '../utils/helpers';

// Typy pro data formuláře
type FormData = {
  sport: string;
  name: string;
  email: string;
  phone: string;
  training_time: string;
};

// Typ pro textové props (předpokládá se ze Strapi CMS)
type TextsProps = {
  nadpis: string;
  sport: string;
  jmeno: string;
  mail: string;
  cislo: string;
  prijdu: string;
};

interface RegistrationFormContentProps {
  texts: TextsProps;
}

const RegistrationFormContent: FC<RegistrationFormContentProps> = ({ texts }) => {
  const searchParams = useSearchParams();
  const selectedSportFromParam = searchParams?.get('sport') || "Kickbox";

  const initialFormData = {
    sport: selectedSportFromParam,
    name: "",
    email: "",
    phone: "",
    training_time: "", // Bude nastaveno z kalendáře
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTraining, setSelectedTraining] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  // Když se vybere trénink v dceřiné komponentě, aktualizuje se formData
  useEffect(() => {
    if (selectedTraining && selectedDate) {
      const [time, sport] = selectedTraining.split(' - ');
      setFormData(prev => ({
        ...prev,
        training_time: formatTrainingTimeForFirebase(selectedDate, time, sport),
        sport: sport // Aktualizuj i sport ve formuláři podle vybraného tréninku
      }));
    } else {
      // Pokud žádný trénink není vybrán (např. po resetu)
      setFormData(prev => ({ ...prev, training_time: "" }));
    }
  }, [selectedTraining, selectedDate]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setSelectedTraining(null);
    setSelectedDate(new Date()); // Resetuj i datum
    setShowCalendar(false); // Zavři kalendář
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const sanitizedData = {
        name: cleanText(formData.name),
        email: formData.email,
        phone: cleanText(formData.phone),
        sport: formData.sport,
        training_time: formData.training_time
      };

      if (!sanitizedData.training_time) {
        toast.error("Prosím, vyberte termín tréninku z kalendáře.");
        setIsSubmitting(false);
        return;
      }

      if (!db) {
        console.error("Firebase DB není inicializována pro ukládání v Booking!");
        toast.error("Chyba: Firebase databáze není dostupná.");
        setIsSubmitting(false);
        return;
      }

      await addDoc(collection(db, 'users'), {
        ...sanitizedData,
        paid: false,
        createdAt: new Date(),
        training_history: [], 
        has_discount: false,
      });

      const templateParams = {
        user_name: sanitizedData.name,
        user_email: sanitizedData.email,
        user_phone: sanitizedData.phone,
        user_sport: sanitizedData.sport,
        training_time: sanitizedData.training_time,
        client_vs: generateSimpleCode(),
        is_kids: sanitizedData.sport === "Děti Kickbox"
      };

      const response = await emailjs.send(
        'service_3ir417w',
        'template_xb82yo9',
        templateParams,
        'FjHR19_UwmBrW35Gr'
      );

      console.log('Email status:', response.status);

      toast.success('Registrace úspěšná! Detaily byly odeslány na email.', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#1A1A1A',
          color: '#ffffff',
          border: '1px solid #4A4A4A',
          fontWeight: 'bold',
        },
      });

      resetForm();
    } catch (error) {
      console.error('Chyba při odesílání formuláře:', error);
      toast.error('Nastala chyba při odesílání. Zkuste to prosím znovu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <motion.div
      className="relative w-[95%] md:w-[90%] bg-[#00060E]/90 p-4 md:p-10 rounded-xl shadow-lg flex flex-col lg:flex-row items-stretch gap-8"
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
      viewport={{ once: true }}
    >
      <motion.div
        className="w-full lg:w-[40%] gap-6 pt-6 lg:pt-10 flex flex-col"
        variants={fadeInUp}
      >
        <h2 className="font-black text-primary mb-0 font-sans text-[25px] sm:text-[30px] md:text-[30px] lg:text-[40px] xl:text-[40px] Dosxl:text-[50px]">
          {texts.nadpis}
        </h2>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="w-full lg:w-[60%] p-6 lg:p-10 rounded-xl space-y-4 flex flex-col"
        variants={fadeInUp}
      >
        <label className="block font-bold text-[15px] sm:text-[16px] md:text-[15px] lg:text-[18px] Dosxl:text-[20px] font-sans">{texts.sport}</label>
        <select
          name="sport"
          value={formData.sport}
          onChange={handleChange}
          className="w-full p-4 mb-2 border border-transparent font-sans rounded-xl bg-[#1A1A1A] text-white focus:ring-0 focus:outline-none hover:shadow-[0_0_15px_3px_var(--tw-shadow-color)] focus:shadow-[0_0_15px_3px_var(--tw-shadow-color)] shadow-primary transition duration-300 ease-in-out"
        >
          <option value="Kickbox">Kickbox</option>
          <option value="Thaibox">Thaibox</option>
          <option value="Grappling">Grappling</option>
          <option value="Děti Kickbox">Děti (8-14) Kickbox</option>
          <option value="Kondiční Kickbox">Kondiční Kickbox</option>
          <option value="Pokročilí">Pokročilí</option>
          <option value="Kruhový Trénink">Kruhový trénink</option>
        </select>

        <label className="block font-bold text-[15px] sm:text-[16px] md:text-[15px] lg:text-[18px] Dosxl:text-[20px] font-sans">{texts.jmeno}</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Zadejte jméno"
          className="w-full p-3 font-sans border border-transparent rounded-xl bg-[#1A1A1A] text-white focus:ring-0 focus:outline-none focus:shadow-[0_0_15px_3px_var(--tw-shadow-color)] shadow-primary transition duration-300 ease-in-out"
        />

        <label className="block font-bold text-[15px] sm:text-[16px] md:text-[15px] lg:text-[18px] Dosxl:text-[20px] font-sans">{texts.mail}</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Zadejte email"
          className="w-full p-3 border font-sans border-transparent rounded-xl bg-[#1A1A1A] text-white focus:ring-0 focus:outline-none focus:shadow-[0_0_15px_3px_var(--tw-shadow-color)] shadow-primary transition duration-300 ease-in-out"
        />

        <label className="block font-bold text-[15px] sm:text-[16px] md:text-[15px] lg:text-[18px] Dosxl:text-[20px] font-sans">{texts.cislo}</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="752 331 915"
          className="w-full p-3 border font-sans border-transparent rounded-xl bg-[#1A1A1A] text-white focus:ring-0 focus:outline-none focus:shadow-[0_0_15px_3px_var(--tw-shadow-color)] shadow-primary transition duration-300 ease-in-out"
        />

        <label className="block font-bold text-[15px] sm:text-[16px] md:text-[15px] lg:text-[18px] Dosxl:text-[20px] font-sans">{texts.prijdu}</label>
        {/* Vložení komponenty pro kalendář a výběr tréninku */}
        <TrainingCalendarAndSelector
          showCalendar={showCalendar}
          setShowCalendar={setShowCalendar}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTraining={selectedTraining}
          setSelectedTraining={setSelectedTraining}
          formatTrainingTimeForFirebase={formatTrainingTimeForFirebase}
          calendarRef={calendarRef}
        />

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary font-sans text-white font-black text-[14px] xl:text-[18px] py-3 mt-4 rounded-xl hover:bg-opacity-80 transition"
          >
            {isSubmitting ? 'Zpracovávání...' : 'Registrovat se'}
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default RegistrationFormContent;
