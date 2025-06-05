// components/Registrace/utils/helpers.ts

export const generateSimpleCode = (): string => {
  return 'PSA-' + Date.now().toString().slice(-6);
};

export const cleanText = (text: string): string => {
  return text.replace(/[^\w\sá-žÁ-Ž]/gi, '');
};

export const formatTrainingTimeForFirebase = (date: Date, time: string, sport: string): string => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}.${month}.${year} ${time} - ${sport}`;
};

export const getDayOfWeek = (date: Date): string => {
  const days = ['nedele', 'pondeli', 'utery', 'streda', 'ctvrtek', 'patek', 'sobota'];
  return days[date.getDay()];
};
