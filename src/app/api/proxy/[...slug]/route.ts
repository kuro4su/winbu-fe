import { NextResponse } from 'next/server';

const EXTERNAL_API_URL = 'https://winbu-scrape.vercel.app/api';

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

    const data = await apiResponse.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Proxy API Error:', error);
    return NextResponse.json({ message: 'Server Error in proxy' }, { status: 500 });
  }
}
