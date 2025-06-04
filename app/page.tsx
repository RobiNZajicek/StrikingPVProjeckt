// app/page.tsx
import HeroText from '@/components/Hero/HeroText';
import Proces from '@/components/Proces/Proces';
import { FaqSimple } from '@/components/FaQ/FaqSimple';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';

export const revalidate = 60; // Globální cache

export default async function Home() {
  try {
    const res = await fetchWithTimeout(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/home-page?populate[blocks][populate]=*`
    );
    
    const { data } = await res.json();
    const blocks = data?.blocks || [];

    return (
      <div>
        {blocks.map((block) => {
          switch(block.__component) {
            case 'blocks.hero-text':
              return <HeroText key={block.id} data={block} />;
            case 'blocks.postup':
              return <Proces key={block.id} data={block} />;
            case 'blocks.faq':
              return <FaqSimple key={block.id} data={block} />;
            default:
              return null;
          }
        })}
      </div>
    );
  } catch (error) {
    console.error('Data loading error:', error);
    return <div>Error loading content</div>;
  }
}