import { NextResponse } from 'next/server';
import { getSeriesDetailMock } from '@/lib/mock-data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json({ message: 'Bad Request: ID is required' }, { status: 400 });
    }
    const data = getSeriesDetailMock(id);
    if (!data) {
      return NextResponse.json({ message: 'Not Found' }, { status: 404 });
    }
    return NextResponse.json({ status: 'success', data });
  } catch (error) {
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
