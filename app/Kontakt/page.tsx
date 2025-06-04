import KontaktAbove from '@/components/Kontakt/KontaktAbove/KontaktAbove';
import KontaktForm from '@/components/Kontakt/KontaktForm/KontaktForm';
import GoogleMap from '@/components/Kontakt/KontaktMaps/GoogleMap';
import React from 'react';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';

export const revalidate = 60; // Globální cache
export const dynamic = 'force-dynamic';

const Kontakt = async () => {
  try {
    const res = await fetchWithTimeout(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/home-page?populate[blocks][populate]=*`
    );
    
    const json = await res.json();
    const blocks = json.data?.blocks || [];

    const kontaktAboveData = blocks.find((block) => block.__component === 'blocks.kontakt');
    const kontaktFormData = blocks.find((block) => block.__component === 'blocks.kontakt-form');
    const mapData = blocks.find((block) => block.__component === 'blocks.map');

    if (!kontaktAboveData || !kontaktFormData || !mapData) {
      console.error('Kontakt data nebyla nalezena');
      return <div>Omlouváme se, data nejsou dostupná.</div>;
    }

    return (
      <div>
        <KontaktAbove data={kontaktAboveData} />
        <KontaktForm data={kontaktFormData} />
        <GoogleMap data={mapData} />
      </div>
    );
  } catch (error: unknown) {
    console.error('Chyba při načítání dat:', error);
    return <div>Omlouváme se, došlo k chybě při načítání dat.</div>;
  }
};

export default Kontakt;