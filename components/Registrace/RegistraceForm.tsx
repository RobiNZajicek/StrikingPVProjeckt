'use client';

import React, { type FC } from "react";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

// Import nové komponenty s obsahem formuláře
import RegistrationFormContent from './components/RegistrationFormContent';

// Vnější Prop pro texty (předpokládáme, že pochází ze Strapi CMS)
type StrapiTexts = {
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

// Typ props pro tuto komponentu, exportovaný pro použití v testech a jinde
export interface RegistraceFormProps {
  texts: StrapiTexts;
}

const RegistraceForm: FC<RegistraceFormProps> = ({ texts }) => {
  const backgroundUrl = texts?.obrazekPozadi?.url?.startsWith('http')
    ? texts.obrazekPozadi.url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${texts?.obrazekPozadi?.url}`;

  // Animace (pokud jsou potřeba, jinak se dají zjednodušit)


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

      {/* Zde renderujeme komponentu s obsahem formuláře */}
      <RegistrationFormContent texts={texts} />
    </div>
  );
};

export default RegistraceForm;
