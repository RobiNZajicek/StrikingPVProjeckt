// types/index.ts

// Typ pro záznam v historii tréninků
export type TrainingRecord = {
  date: string; // Formát: "YYYY-MM-DD HH:MM"
  sport: string;
  confirmed_attendance: boolean; // Nové pole pro potvrzení absolvování
};

// Typy pro data uživatelů z Firebase (nyní zahrnuje i historii a slevy)
// Nahrazuje FireUserWithHistory
export type FireUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  sport: string;           // např. "Kickbox"
  training_time: string;   // např. "4.6.2025 18:00 - Kickbox"
  paid: boolean;
  training_history?: TrainingRecord[]; // Pole pro historii tréninků
  has_discount?: boolean; // Pole pro odměny
};

// Typ pro událost, kterou FullCalendar očekává
export type CalendarEvent = {
  id: string; // Unikátní ID pro událost
  title: string;
  start: Date; // Objekt Date
  end?: Date; // Volitelný konec události (pro dobu trvání)
  allDay: boolean; // Důležité: false pro události s časem
  backgroundColor: string;
  borderColor: string;
  textColor?: string; // Barva textu události
  extendedProps: {
    attendees: FireUser[];
    numPaid: number;
    numUnpaid: number;
    sportType: string; // Pro snadnější přístup k typu sportu v eventContent
  };
};

export type GroupKey = string; // např. "2025-06-04T18:00|Kickbox"

// Nové typy pro rozvrh
export type DayOfWeek = 'pondeli' | 'utery' | 'streda' | 'ctvrtek' | 'patek' | 'sobota' | 'nedele';
export type ScheduleRow = {
  time: string;
  [key: string]: string; // Pro pondeli, utery, atd.
};

// Typ pro statistiky sportů (používané na stránce Statistiky)
export type SportStatistic = {
  name: string;
  trainings: number;
};

// Typ pro statistiky dnů v týdnu (používané na stránce Statistiky)
export type DailyStatistic = {
  day: string;
  trainings: number;
};
