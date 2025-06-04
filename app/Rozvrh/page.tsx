import RozvrhAbove from '@/components/Rozvrh/RozvrhAbove';
import RozvrhTable from '@/components/Rozvrh/RozvrhTable/RozvrhTable';
import React from 'react';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';

export const revalidate = 60; // Globální cache
export const dynamic = 'force-dynamic';

const Rozvrh = async () => {
  try {
    const res = await fetchWithTimeout(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/home-page?populate[blocks][populate]=*`
    );
    
    const json = await res.json();
    const blocks = json.data?.blocks || [];
    const rozvrhAboveData = blocks.find(block => block.__component === 'blocks.rozvrh');
    const rozvrhTableData = blocks.find(block => block.__component === 'blocks.rozvrh-table');
    
    if (!rozvrhAboveData || !rozvrhTableData) {
      console.error('Rozvrh data nebyla nalezena');
      return <div>Omlouváme se, data nejsou dostupná.</div>;
    }

    return (
      <div>
        <RozvrhAbove data={rozvrhAboveData} />
        <RozvrhTable data={rozvrhTableData} />
      </div>
    );
  } catch (error: unknown) {
    console.error('Chyba při načítání dat:', error);
    return <div>Omlouváme se, došlo k chybě při načítání dat.</div>;
  }
};

export default Rozvrh;