import { NextResponse } from 'next/server';
import { getServerDataMock } from '@/lib/mock-data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const id = params.id;
    const nume = searchParams.get('nume');
    const type = searchParams.get('type');

    if (!id || !nume || !type) {
      return NextResponse.json({ message: 'Bad Request: Missing parameters' }, { status: 400 });
    }
    
    const data = getServerDataMock(id, nume, type);
    return NextResponse.json({ status: 'success', data });
  } catch (error) {
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
