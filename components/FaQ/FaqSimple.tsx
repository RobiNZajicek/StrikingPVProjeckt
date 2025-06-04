'use client';

import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Container,
  Title,
} from '@mantine/core';
import { useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import classes from './FaqSimple.module.css';

export function FaqSimple({ data }) {
  const [opened, setOpened] = useState<string | null>(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.2 } },
  };

  if (!data) return null;

  const questions = [
    { value: 'otazka1', question: data.otazka1, answer: data.odpoved1 },
    { value: 'otazka2', question: data.otazka2, answer: data.odpoved2 },
    { value: 'otazka3', question: data.otazka3, answer: data.odpoved3 },
    { value: 'otazka4', question: data.otazka4, answer: data.odpoved4 },
    { value: 'otazka5', question: data.otazka5, answer: data.odpoved5 },
  ];

  return (
    <Container size="md" className="relative">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ once: true }}
      >
        <Title
          ta="center"
          className="font-black text-[25px]  sm:text-[25px] md:text-[25px] lg:text-[28px] xl:text-[35px] Dosxl:text-[45px] text-primary mb-8 font-orbion"
        >
          {data.nadpis}
        </Title>
      </motion.div>

      <motion.div
        className={classes.FaqRight}
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={staggerChildren}
        viewport={{ once: true }}
      >
        <Accordion
          variant="separated"
          className="w-full Dosxl:max-w-4xl xl:max-w-3xl max-w-3xl mx-auto rounded-lg shadow-lg p-4 space-y-6"
          transitionDuration={300}
        >
          {questions.map((item) => (
            <motion.div key={item.value} variants={fadeInUp}>
              <AccordionItem
                value={item.value}
                className="border border-primary rounded-xl transition-transform duration-300 ease-in-out hover:scale-105 overflow-hidden"
                onClick={() => setOpened(opened === item.value ? null : item.value)}
              >
                <AccordionControl className="flex items-center w-full px-2 xl:px-6 py-4 text-lg font-semibold hover:text-primary transition-all">
                  <div className="flex items-center space-x-2">
                    <IconChevronDown
                      size={20}
                      className={`transition-transform duration-300 ${
                        opened === item.value ? 'rotate-180' : ''
                      }`}
                    />
                    <span className="flex-1 font-sans  text-[12px] sm:text-[15px] md:text-[15px] lg:text-[16px] z-50 xl:text-[17px] Dosxl:text-[18px]">
                      {item.question}
                    </span>
                  </div>
                </AccordionControl>
                <AccordionPanel className="text-white font-normal  leading-relaxed px-6 pb-4 font-sans text-[12px] sm:text-[15px] md:text-[15px] lg:text-[16px] z-50 xl:text-[17px] Dosxl:text-[18px]">
                  {item.answer}
                </AccordionPanel>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </Container>
  );
}
