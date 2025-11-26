import { NextResponse } from 'next/server';

const EXTERNAL_API_URL = 'https://winbu-scrape.vercel.app/api';

// Helper function to extract src from iframe string
const extractSrcFromIframe = (iframeString: string): string | null => {
  const match = iframeString.match(/src="([^"]+)"/);
  return match ? match[1] : null;
};

export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  try {
    const slug = params.slug.join('/');
    const { search } = new URL(request.url);
    const apiPath = `${EXTERNAL_API_URL}/${slug}${search}`;
    
    const apiResponse = await fetch(apiPath, {
      headers: {
        'User-Agent': request.headers.get('User-Agent') || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
       cache: 'no-store',
    });

    if (!apiResponse.ok) {
      return NextResponse.json({ message: `Error from external API: ${apiResponse.statusText}` }, { status: apiResponse.status });
    }

    const jsonResponse = await apiResponse.json();

    // Check if data is an iframe string
    if (slug.startsWith('server/') && typeof jsonResponse.data === 'string' && jsonResponse.data.includes('<iframe')) {
      const src = extractSrcFromIframe(jsonResponse.data);
      if (src) {
        // Return in the expected format
        return NextResponse.json({ data: { embed_url: src } });
      } else {
         return NextResponse.json({ message: 'Could not extract embed URL from iframe string' }, { status: 500 });
      }
    }

    return NextResponse.json(jsonResponse);

  } catch (error) {
    console.error('Proxy API Error:', error);
    return NextResponse.json({ message: 'Server Error in proxy' }, { status: 500 });
  }
}
