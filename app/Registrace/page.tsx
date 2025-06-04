import RegistrationForm from '@/components/Registrace/RegistraceForm';
import React from 'react';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';

export const revalidate = 60; // Globální cache
export const dynamic = 'force-dynamic';

const Registrace = async () => {
  try {
    const res = await fetchWithTimeout(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/home-page?populate[blocks][populate]=*`
    );
    
    const json = await res.json();
    const blocks = json.data?.blocks || [];
    const registraceData = blocks.find(block => block.__component === 'blocks.registrace');

    if (!registraceData) {
      console.error('Registrace data nebyla nalezena');
      return <div>Omlouváme se, data nejsou dostupná.</div>;
    }

    return (
      <div>
        
          <RegistrationForm texts={registraceData} />
        
      </div>
    );
  } catch (error: unknown) {
    console.error('Chyba při načítání dat:', error);
    return <div>Omlouváme se, došlo k chybě při načítání dat.</div>;
  }
};

export default Registrace;