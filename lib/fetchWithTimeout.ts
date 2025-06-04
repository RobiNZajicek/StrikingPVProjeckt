export const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {},
  timeout = 30000
) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      next: { revalidate: 60 } // Next.js specifické
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response;
  } catch (error: unknown) { // Changed 'any' to 'unknown'
    clearTimeout(timeoutId);
    
    // Type guard to check for AbortError
    if (error instanceof Error) {
      throw error.name === 'AbortError' 
        ? new Error('Request timed out') 
        : error;
    }
    
    // If it's not an Error object, just throw it as is
    throw error;
  }
};