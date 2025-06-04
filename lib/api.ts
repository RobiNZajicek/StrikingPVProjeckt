// lib/api.ts
export async function getHomePageData() {
    const res = await fetch('${process.env.NEXT_PUBLIC_STRAPI_URL}/api/home-page?populate[blocks][populate]=*');
    if (!res.ok) throw new Error('Failed to fetch data');
    return res.json();
  }