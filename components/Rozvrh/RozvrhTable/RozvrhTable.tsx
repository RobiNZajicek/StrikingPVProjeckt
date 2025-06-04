  "use client";

  import React, { useState, useEffect } from 'react';
  import { motion } from 'framer-motion';
  import Image from 'next/image';
  import uni from '@/public/assets/uni.png';
  import './RozvrhTable.css';
  import Link from 'next/link';

  type TrainingEntry = {
    id: number;
    cas: string;
    nazevTreninku: string;
  };

  type ScheduleData = {
    pondeli: TrainingEntry[];
    utery: TrainingEntry[];
    streda: TrainingEntry[];
    ctvrtek: TrainingEntry[];
    patek: TrainingEntry[];
    sobota: TrainingEntry[];
    nedele: TrainingEntry[];
  };

  type TrainingColors = {
    [key: string]: string;
  };

  const trainingColors: TrainingColors = {
    'Kickbox': 'lg:border-l-4 border-l-2 border-green-500 pl-2',
    'Thaibox': 'lg:border-l-4 border-l-2 border-red-500 pl-2',
    'Kondiční Kickbox': 'lg:border-l-4 border-l-2 border-blue-500 pl-2',
    'Děti Kickbox': 'lg:border-l-4 border-l-2 border-green-500 pl-2',
    'Pokročilí': 'lg:border-l-4 border-l-2 border-purple-500 pl-2',
    'Grappling': 'lg:border-l-4 border-l-2 border-yellow-500 pl-2',
    'Kruhový Trénink': 'lg:border-l-4 border-l-2 border-primary pl-2'
  };

  type TrainingType = keyof typeof trainingInfo;

  const trainingInfo = {
    'Kickbox': 'Dynamické lekce zaměřené na kickbox, důraz na správné technické provedení úderů a na kondici. Doporučeno pro všechny zkušenostní kategorie.',
    'Thaibox': 'Komplexní bojový sport obsahující údery pěstmi, lokty, koleny, nohama, strhy a spoustu dalšího. Doporučeno pro všechny zkušenostní kategorie. Fyzický kontakt není povinný.',
    'Kondiční Kickbox': 'Bezkontaktní lekce zaměřené na spálení vysokého počtu kalorií. Tréninky budují kondici a formují postavu, vše v přátelské atmosféře. Doporučeno pro muže, ženy, mladistvé všech zkušenostních kategorií.',
    'Děti Kickbox': 'Zábavné lekce pro děti ideálně 9-14 let. Na tréninku se budeme věnovat všestrannému rozvoji pohybu, základním technikám kickboxu a rozvoji sportovního ducha. Vše v přátelské a bezpečné atmosféře.',
    'Pokročilí': 'Pokročilé techniky bojových sportů pro zkušené cvičence.',
    'Grappling': 'Lekce grapplingu vhodné pro úplné začátečníky a mírně pokročilé. Na tyto tréninky prosíme kraťasy bez kapes/legíny; uplné tričko (ideálně rashguard); ostříhané nehty a zvýšenou pozornost na hygienu.',
    'Kruhový Trénink': 'Lekce, kde posilujeme celé tělo metodou kruhového tréninku. Cvičení spočívá v několika stanovištích, které trvají určitou dobu. Mezi stanovištěmi je krátká pauza. Tréninky jsou zaměřeny na budování kondice, síly a výbušnosti.'
  };

  const trainerInfo: Record<TrainingType, string> = {
    'Kickbox': 'Trenér: Kuba',
    'Thaibox': 'Trenér: Dan',
    'Kondiční Kickbox': 'Trenér: Kuba',
    'Děti Kickbox': 'Trenér: Kuba',
    'Pokročilí': 'Trenér: Kuba',
    'Grappling': 'Trenér: Ayan',
    'Kruhový Trénink': 'Trenér: Barča'
  };

  const RozvrhTable = ({ data }: { data: ScheduleData }) => {
    const [selectedTraining, setSelectedTraining] = useState<TrainingType | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
      if (selectedTraining) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
      return () => {
        document.body.style.overflow = 'auto';
      };
    }, [selectedTraining]);

    const handleClick = (e: React.MouseEvent, training: TrainingType) => {
      setSelectedTraining(training);
    };

    // Animation variants
    const fadeInUp = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    // Map days to their Czech equivalents with diacritics
    const daysInCzech: { [key: string]: string } = {
      pondeli: 'Pondělí',
      utery: 'Úterý',
      streda: 'Středa',
      ctvrtek: 'Čtvrtek',
      patek: 'Pátek',
      sobota: 'Sobota',
      nedele: 'Neděle'
    };

    return (
      <motion.div
        className='relative text-white py-16 px-4 sm:px-8 w-full Dosxl:max-w-7xl md:mx-auto mx-0 font-sans rounded-xl mt-16'
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ once: true }}
      >
        <div className='susosBluros'></div>

        {/* Logo with Framer Motion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 0.5, duration: 2.5, ease: "linear" }}
          className="absolute inset-0 w-[400px] h-[400px] top-36 opacity-10 mx-auto"
          style={{ left: '33%', transform: 'translateX(-50%)' }}
        >
          <Image src={uni} alt='Striking Academy Logo' className="w-full md:flex h-full hidden" />
        </motion.div>

        <motion.div
          className='overflow-x-auto'
          variants={fadeInUp}
        >
          {isMobile ? (
            // Mobile Layout: Collapsible days
            <div className='w-full max-w-2xl'>
              <div className='w-full flex-1'>
                {Object.entries(daysInCzech).map(([dayKey, dayName]) => (
                  <div key={dayKey} className='mb-2'>
                    <span className='font-bold text-primary'>{dayName}</span>
                    <div className='mt-2 rounded-lg p-2'>
                      {data[dayKey as keyof ScheduleData]
                        .filter((row) => row.nazevTreninku)
                        .map((row) => (
                          <div key={row.id} className='flex justify-between items-center py-1'>
                            <span className='text-[12px] sm:text-[14px]'>{row.cas.trim()}</span>
                            <motion.div
                              className={`cursor-pointer w-32 inline-block text-[12px] sm:text-[14px] ${trainingColors[row.nazevTreninku] || ''}`}
                              onClick={(e) => handleClick(e, row.nazevTreninku as TrainingType)}
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                            >
                              {row.nazevTreninku.trim()}
                            </motion.div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Desktop Layout: Times at the top, days on the left
            <table className='w-full border-collapse text-center md:max-w-[85%] mx-auto Dosxl:max-w-7xl text-lg rounded-b-xl table-fixed'>
              <thead className='rounded-xl'>
                <tr className='bg-primary rounded-xl xl:h-8 Dosxl:h-16 text-white'>
                  <th className='py-4 px-1 text-start w-[10%] sm:w-[12.5%] rounded-tl-xl text-[8px] sm:text-[14px] md:text-[16px] lg:text-[20px] xl:h-[50px]'></th>
                  {data.pondeli.map((row, index) => (
                    <th
                      key={index}
                      className={`py-4 px-1 xl:py-2 xl:px-0 xl:max-w-8 text-start w-[12.5%] text-[8px] sm:text-[14px] md:text-[16px] lg:text-[20px] xl:text-[16px] Dosxl:text-[20px] xl:h-[50px] ${
                        index === data.pondeli.length - 1 ? 'rounded-tr-xl' : ''
                      }`}
                    >
                      {row.cas.trim()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className='bg-[#0C0C0C] rounded-xl'>
                {Object.entries(daysInCzech).map(([dayKey, dayName]) => (
                  <tr key={dayKey} className='border-t border-gray-800/90 Dosxl:h-24 xl:h-[72px]'>
                    <td className='p-0 text-[8px] sm:text-[12px] md:text-[12px] lg:text-[14px] xl:text-[14px] Dosxl:text-[18px] lg:p-4 font-bold xl:pl-4 xl:text-start Dosxl:text-center'>{dayName}</td>
                    {data[dayKey as keyof ScheduleData].map((row) => (
                      <td key={row.id} className='p-0 md:p-4 relative text-start'>
                        {row.nazevTreninku && (
                          <motion.div
                            className={`cursor-pointer inline-block text-[8px] sm:text-[11px] md:text-[12px] lg:text-[14px] xl:text-[14px] Dosxl:text-[18px] ${trainingColors[row.nazevTreninku] || ''}`}
                            onClick={(e) => handleClick(e, row.nazevTreninku as TrainingType)}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            {row.nazevTreninku.trim()}
                          </motion.div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </motion.div>

        {selectedTraining && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            onClick={() => setSelectedTraining(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-primary w-[90%] sm:w-[400px] h-[320px] p-6 text-white rounded-xl shadow-lg relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                width={196}
                height={172}
                src={uni.src}
                className="absolute opacity-30 top-4 right-4 z-1 object-cover"
                alt="logo"
              />
              <div className="h-[200px] bg-primary">
                <h3 className="text-[20px] font-black mb-0">{selectedTraining}</h3>
                <p className="text-[20px] font-black mb-2">{trainerInfo[selectedTraining]}</p>
                <span className="font-sans font-bold text-[16px]">{trainingInfo[selectedTraining]}</span>
              </div>
              <div className="flex justify-center gap-4">
                <Link
                 href={`/Registrace?sport=${encodeURIComponent(selectedTraining)}`}
                  className="mt-8 flex justify-center items-center font-black border-2 bg-white text-primary w-32 p-2 rounded-xl"
                >
                  Objednat se
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    );
  };

  export default RozvrhTable;