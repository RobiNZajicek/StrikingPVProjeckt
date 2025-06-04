import OnasAbove from '@/components/Onas/OnasAbove';
import Treneri from '@/components/Onas/Treneri/Treneri';
import ReviewsCarousel from '@/components/Onas/ReviewsCarousel/ReviewsCarousel';
import React from 'react';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';

export const revalidate = 60; // Globální cache
export const dynamic = 'force-dynamic';

const Onas = async () => {
  try {
    const res = await fetchWithTimeout(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/home-page?populate[blocks][populate]=*`
    );
    
    const json = await res.json();
    const blocks = json.data?.blocks || [];
    
    const onasData = blocks.find(block => block.__component === 'blocks.onas');
    const treneriData = blocks.find(block => block.__component === 'blocks.treneri');
    const recenzeData = blocks.find(block => block.__component === 'blocks.recenze');

    if (!onasData || !treneriData || !recenzeData) {
      console.error('O nás data nebyla nalezena');
      return <div>Omlouváme se, data nejsou dostupná.</div>;
    }

    return (
      <div>
        <OnasAbove data={onasData} />
        <Treneri data={treneriData} />
        <ReviewsCarousel data={recenzeData} />
      </div>
    );
  } catch (error: unknown) {
    console.error('Chyba při načítání dat:', error);
    return <div>Omlouváme se, došlo k chybě při načítání dat.</div>;
  }
};

export default Onas;