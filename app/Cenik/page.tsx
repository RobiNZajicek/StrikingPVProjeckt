import CenikAbove from '@/components/Cenik/CenikAbove/CenikAbove';
import PricingComponent from '@/components/Cenik/PricingComponent';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';

export const revalidate = 60; // Globální cache
export const dynamic = 'force-dynamic';

const Cenik = async () => {
  try {
    const res = await fetchWithTimeout(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/home-page?populate[blocks][populate]=*`
    );
    
    const json = await res.json();
    const blocks = json.data?.blocks || [];
    
    const cenikAboveData = blocks.find(block => block.__component === 'blocks.cenik');
    const cenyData = blocks.find(block => block.__component === 'blocks.ceny');

    return (
      <div>
        {cenikAboveData && <CenikAbove data={cenikAboveData} />}
        {cenyData && <PricingComponent data={cenyData} />}
      </div>
    );
  } catch (error: unknown) {
    console.error('Chyba při načítání dat:', error);
    return <div>Omlouváme se, došlo k chybě při načítání dat.</div>;
  }
};

export default Cenik;