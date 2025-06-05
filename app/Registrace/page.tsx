// app/Registrace/page.tsx
// ODSTRANĚNO: 'use client'; - tato stránka musí být serverová komponenta, aby fungovalo revalidate

import React from 'react';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout'; // Předpokládá se, že toto je server side utility
import RegistraceForm from '@/components/Registrace/RegistraceForm'; // Upravená cesta k nové hlavní komponentě formuláře
import { Suspense } from 'react'; // Pro použití se server komponentami

export const revalidate = 60; // Globální cache, nyní správně na serveru
export const dynamic = 'force-dynamic';

// Definice typu pro data ze Strapi, které komponenta RegistraceForm očekává
type StrapiBlockRegistrace = {
  __component: string; // Např. 'blocks.registrace'
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

const RegistracePage = async () => {
  try {
    const res = await fetchWithTimeout(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/home-page?populate[blocks][populate]=*`
    );
    
    const json = await res.json();
    const blocks = json.data?.blocks || [];
    const registraceData = blocks.find(block => block.__component === 'blocks.registrace') as StrapiBlockRegistrace;

    if (!registraceData) {
      console.error('Registrace data nebyla nalezena');
      return <div>Omlouváme se, data nejsou dostupná.</div>;
    }

    return (
      <Suspense fallback={<div>Načítám registrační formulář...</div>}>
        {/* Předáváme načtená data do RegistraceForm */}
        <RegistraceForm texts={registraceData} />
      </Suspense>
    );
  } catch (error: unknown) {
    console.error('Chyba při načítání dat pro registraci:', error);
    return <div>Omlouváme se, došlo k chybě při načítání dat pro registraci.</div>;
  }
};

export default RegistracePage;
  