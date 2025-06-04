// app/booking/page.tsx (nebo RegistrationForm.tsx - název souboru je na vás)
'use client';

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'; // Ujisti se, že tento CSS soubor existuje a obsahuje potřebné styly pro kalendář
import { db } from '../../firebase'; // **DŮLEŽITÉ: ZKONTROLUJ TUTO CESTU!**
import { addDoc, collection } from 'firebase/firestore';
import { toast, Toaster } from "react-hot-toast";
import emailjs from '@emailjs/browser';

// Typy pro data
type ScheduleRow = {
  time: string;
  pondeli: string;
  utery: string;
  streda: string;
  ctvrtek: string;
  patek: string;
  sobota: string;
  nedele: string;
};

type TrainingColors = {
  [key: string]: string;
};

type FormData = {
  sport: string;
  name: string;
  email: string;
  phone: string;
  training_time: string;
};

// Rozvrh tréninků
const schedule: ScheduleRow[] = [
  { time: '16:00', pondeli: '', utery: '', streda: '', ctvrtek: '', patek: 'Děti Kickbox', sobota: '', nedele: '' },
  { time: '17:00', pondeli: '', utery: 'Kondiční Kickbox', streda: '', ctvrtek: '', patek: 'Kondiční Kickbox', sobota: 'Grappling', nedele: '' },
  { time: '18:00', pondeli: 'Thaibox', utery: 'Kickbox', streda: '', ctvrtek: 'Thaibox', patek: 'Kickbox', sobota: '', nedele: 'Kruhový Trénink' },
  { time: '19:00', pondeli: '', utery: 'Pokročilí', streda: '', ctvrtek: '', patek: '', sobota: '', nedele: '' }
];

// Barvy tréninků (Tailwind CSS třídy)
const trainingColors: TrainingColors = {
  'Kickbox': 'lg:border-l-4 border-l-2 border-green-500 pl-2 w-32',
  'Thaibox': 'lg:border-l-4 border-l-2 border-red-500 pl-2 w-32',
  'Kondiční Kickbox': 'lg:border-l-4 border-l-2 border-blue-500 pl-2 w-32',
  'Děti Kickbox': 'lg:border-l-4 border-l-2 border-green-500 pl-2 w-32',
  'Pokročilí': 'lg:border-l-4 border-l-2 border-purple-500 pl-2 w-32',
  'Grappling': 'lg:border-l-4 border-l-2 border-yellow-500 pl-2 w-32',
  'Kruhový Trénink': 'lg:border-l-4 border-l-2 border-primary pl-2 w-32'
};

type Props = {
  texts: {
    nadpis: string;
    sport: string;
    jmeno: string;
    mail: string;
    cislo: string;
    prijdu: string;
    obrazekPozadi?: {
      url: string;
    };
  };
};

const generateSimpleCode = () => {
  return 'PSA-' + Date.now().toString().slice(-6);
};

const cleanText = (text: string) => {
  return text.replace(/[^\w\sá-žÁ-Ž]/gi, '');
};

// **NOVÁ FUNKCE: Standardizované formátování data a času**
// Zajistí formát "D.M.RRRR HH:MM - Sport" (bez mezer po tečkách)
const formatTrainingTimeForFirebase = (date: Date, time: string, sport: string): string => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Měsíce jsou 0-11
    const year = date.getFullYear();
    // Spojíme vše do přesného formátu
    return `${day}.${month}.${year} ${time} - ${sport}`;
};

const RegistrationForm = ({ texts }: Props) => {
  const searchParams = useSearchParams();
  const selectedSport = searchParams?.get('sport') || "Kickbox";

  const initialFormData = {
    sport: selectedSport,
    name: "",
    email: "",
    phone: "",
    training_time: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTraining, setSelectedTraining] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const backgroundUrl = texts?.obrazekPozadi?.url?.startsWith('http')
    ? texts.obrazekPozadi.url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${texts?.obrazekPozadi?.url}`;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setSelectedTraining(null);
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
        training_time: formData.training_time // Toto už by mělo být správně formátováno
      };

      if (!db) {
        console.error("Firebase DB není inicializována pro ukládání v Booking!");
        toast.error("Chyba: Firebase databáze není dostupná.");
        setIsSubmitting(false);
        return;
      }

      await addDoc(collection(db, 'users'), {
        ...sanitizedData,
        paid: false,
        createdAt: new Date()
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

  const getDayOfWeek = (date: Date): string => {
    const days = ['nedele', 'pondeli', 'utery', 'streda', 'ctvrtek', 'patek', 'sobota'];
    return days[date.getDay()];
  };

  const hasTraining = (date: Date): boolean => {
    const dayOfWeek = getDayOfWeek(date);
    return schedule.some((row) => row[dayOfWeek as keyof ScheduleRow]);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    const dayOfWeek = getDayOfWeek(date);
    const trainingsForSelectedDay = schedule
      .filter((row) => row[dayOfWeek as keyof ScheduleRow])
      .map((row) => ({ time: row.time, sport: row[dayOfWeek as keyof ScheduleRow] }));

    if (trainingsForSelectedDay.length > 0) {
      // Předvybrat první dostupný trénink
      const firstTraining = trainingsForSelectedDay[0];
      setSelectedTraining(`${firstTraining.time} - ${firstTraining.sport}`);
      // **Zde použijeme novou funkci pro formátování:**
      setFormData({ 
        ...formData, 
        training_time: formatTrainingTimeForFirebase(date, firstTraining.time, firstTraining.sport) 
      });
    } else {
      setSelectedTraining(null);
      setFormData({ ...formData, training_time: `Není trénink v ${date.toLocaleDateString('cs-CZ')}` });
    }
  };

  const handleTrainingSelect = (time: string, sport: string) => {
    setSelectedTraining(`${time} - ${sport}`);
    // **Zde použijeme novou funkci pro formátování:**
    setFormData({ 
      ...formData, 
      training_time: formatTrainingTimeForFirebase(selectedDate, time, sport) 
    });
    setShowCalendar(false);
  };

  const tileClassName = ({ date }: { date: Date }): string | null => {
    return hasTraining(date) ? 'has-training' : null;
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.2 } },
  };

  useEffect(() => {
    document.body.style.overflow = showCalendar ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showCalendar]);

  return (
    <div className="relative flex flex-col lg:flex-row items-center lg:items-start text-white pt-12 pb-44 mb-6 x-8 md:px-2 lg:px-2 xl:px-2 2xl:px-16 mx-auto rounded-xl justify-center overflow-hidden bg-black font-sans">
      <Toaster />

      <div className="absolute inset-0 w-full h-full">
        {backgroundUrl && (
          <Image
            src={`${backgroundUrl}?w=3840?q=85`}
            layout="fill"
            objectFit="cover"
            alt="Registration-Background"
            className="z-0"
            unoptimized
          />
        )}
      </div>

      <div className="absolute inset-0 bg-black/40"></div>

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

          <label className="block font-bold text-[15px] sm:text-[16px] md:text-[15px] lg:text-[18px] Dosxl:text-[20px] font-sans pt-4 mb-2">{texts.jmeno}</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Zadejte jméno"
            className="w-full p-3 font-sans border border-transparent rounded-xl bg-[#1A1A1A] text-white focus:ring-0 focus:outline-none focus:shadow-[0_0_15px_3px_var(--tw-shadow-color)] shadow-primary transition duration-300 ease-in-out"
          />

          <label className="block font-bold text-[15px] sm:text-[16px] md:text-[15px] lg:text-[18px] Dosxl:text-[20px] font-sans pt-4 mb-2">{texts.mail}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Zadejte email"
            className="w-full p-3 border font-sans border-transparent rounded-xl bg-[#1A1A1A] text-white focus:ring-0 focus:outline-none focus:shadow-[0_0_15px_3px_var(--tw-shadow-color)] shadow-primary transition duration-300 ease-in-out"
          />

          <label className="block font-bold text-[15px] sm:text-[16px] md:text-[15px] lg:text-[18px] Dosxl:text-[20px] font-sans pt-4 mb-2">{texts.cislo}</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="752 331 915"
            className="w-full p-3 border font-sans border-transparent rounded-xl bg-[#1A1A1A] text-white focus:ring-0 focus:outline-none focus:shadow-[0_0_15px_3px_var(--tw-shadow-color)] shadow-primary transition duration-300 ease-in-out"
          />

          <label className="block font-bold text-[15px] sm:text-[16px] md:text-[15px] lg:text-[18px] Dosxl:text-[20px] font-sans pt-4 mb-2">{texts.prijdu}</label>
          <div className="relative" ref={calendarRef}>
            <input
              type="text"
              name="training_time"
              value={formData.training_time}
              readOnly
              placeholder="Vyberte trénink z kalendáře"
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full p-3 border font-sans border-transparent rounded-xl bg-[#1A1A1A] text-white focus:ring-0 focus:outline-none focus:shadow-[0_0_15px_3px_var(--tw-shadow-color)] shadow-primary transition duration-300 ease-in-out cursor-pointer"
            />
            {showCalendar && (
              <div className="absolute right-[20%] top-[45px] lg:right-[110%] lg:-top-72 z-50 bg-[#00060E] rounded-xl">
                <Calendar
                  onChange={handleDateChange as any}
                  value={selectedDate}
                  className="react-calendar"
                  tileClassName={tileClassName}
                  showNeighboringMonth={false}
                  formatDay={(locale, date) => date.getDate().toString()}
                />
                {selectedDate && (
                  <div className="mt-4 p-2">
                    <h3 className="font-bold mb-4 text-primary text-[9px] lg:text-[12px]">Tréninky na {selectedDate.toLocaleDateString('cs-CZ')}</h3>
                    {schedule
                      .filter((row) => row[getDayOfWeek(selectedDate) as keyof ScheduleRow])
                      .map((row, index) => (
                        <div
                          key={index}
                          className={`cursor-pointer p-2 w-full text-[9px] lg:text-[13px] hover:bg-[#1A1A1A] rounded-lg ${trainingColors[row[getDayOfWeek(selectedDate) as keyof ScheduleRow]]}`}
                          onClick={() => handleTrainingSelect(row.time, row[getDayOfWeek(selectedDate) as keyof ScheduleRow])}
                        >
                          {row.time} - {row[getDayOfWeek(selectedDate) as keyof ScheduleRow]}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>

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
    </div>
  );
};

export default RegistrationForm;