'use client';

import React, { FC, useEffect, useMemo } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// Předpokládá se, že základní styly kalendáře jsou importovány globálně
// nebo jsou zahrnuty v jiném CSS souboru.
// Pokud máš specifický CSS soubor pro kalendář, zkontroluj jeho cestu.
// Příklad: import '../../Calendar.css'; // Pokud existuje na této cestě

import { cs } from 'date-fns/locale';
import { registerLocale } from 'react-datepicker';
import './Calendar.css'

// Import typů a konstant z nově vytvořených utility souborů
import { ScheduleRow, TrainingColors, schedule, trainingColors } from '../utils/constants';
import { getDayOfWeek } from '../utils/helpers';

// Registrace české locale pro kalendář
registerLocale('cs', cs);

interface TrainingCalendarAndSelectorProps {
  showCalendar: boolean;
  setShowCalendar: (show: boolean) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedTraining: string | null;
  setSelectedTraining: (training: string | null) => void;
  formatTrainingTimeForFirebase: (date: Date, time: string, sport: string) => string;
  calendarRef: React.RefObject<HTMLDivElement | null>;
}

const TrainingCalendarAndSelector: FC<TrainingCalendarAndSelectorProps> = ({
  showCalendar,
  setShowCalendar,
  selectedDate,
  setSelectedDate,
  selectedTraining,
  setSelectedTraining,
  formatTrainingTimeForFirebase,
  calendarRef,
}) => {

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
      const firstTraining = trainingsForSelectedDay[0];
      setSelectedTraining(`${firstTraining.time} - ${firstTraining.sport}`);
    } else {
      setSelectedTraining(null);
    }
  };

  const handleTrainingSelect = (time: string, sport: string) => {
    setSelectedTraining(`${time} - ${sport}`);
    setShowCalendar(false);
  };

  const tileClassName = ({ date }: { date: Date }): string | null => {
    return hasTraining(date) ? 'has-training' : null;
  };

  // Efekt pro zavření kalendáře kliknutím mimo něj
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [calendarRef, setShowCalendar]);

  // Efekt pro skrytí/zobrazení scrollbaru těla stránky
  useEffect(() => {
    document.body.style.overflow = showCalendar ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showCalendar]);

  // Vypočtené tréninky pro zobrazený den
  const trainingsForCurrentSelectedDay = useMemo(() => {
    const dayOfWeek = getDayOfWeek(selectedDate);
    return schedule
      .filter((row) => row[dayOfWeek as keyof ScheduleRow])
      .map((row) => ({ time: row.time, sport: row[dayOfWeek as keyof ScheduleRow] }));
  }, [selectedDate]);

  return (
    <div className="relative" ref={calendarRef}>
      <input
        type="text"
        name="training_time"
        value={
          selectedTraining 
          ? formatTrainingTimeForFirebase(selectedDate, selectedTraining.split(' - ')[0], selectedTraining.split(' - ')[1])
          : `Vyberte trénink z kalendáře`
        }
        readOnly
        placeholder="Vyberte trénink z kalendáře"
        onClick={() => setShowCalendar(!showCalendar)}
        className="w-full p-3 border font-sans border-transparent rounded-xl bg-[#1A1A1A] text-white focus:ring-0 focus:outline-none focus:shadow-[0_0_15px_3px_var(--tw-shadow-color)] shadow-primary transition duration-300 ease-in-out cursor-pointer"
      />
      {showCalendar && (
        <div className="absolute right-[20%] top-[45px] lg:right-[110%] lg:-top-72 z-50 bg-[#00060E] rounded-xl">
          <Calendar
            onChange={handleDateChange as any} // 'any' pro zjednodušení, typování FullCalendar je komplexní
            value={selectedDate}
            className="react-calendar"
            tileClassName={tileClassName}
            showNeighboringMonth={false}
            locale="cs"
          />
          {selectedDate && (
            <div className="mt-4 p-2">
              <h3 className="font-bold mb-4 text-primary text-[9px] lg:text-[12px]">Tréninky na {selectedDate.toLocaleDateString('cs-CZ')}</h3>
              {trainingsForCurrentSelectedDay.length > 0 ? (
                trainingsForCurrentSelectedDay.map((training, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer p-2 w-full text-[9px] lg:text-[13px] hover:bg-[#1A1A1A] rounded-lg ${trainingColors[training.sport]}`}
                    onClick={() => handleTrainingSelect(training.time, training.sport)}
                  >
                    {training.time} - {training.sport}
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-xs">Žádné tréninky na tento den.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrainingCalendarAndSelector;
