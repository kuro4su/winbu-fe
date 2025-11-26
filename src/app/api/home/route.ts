import { NextResponse } from 'next/server';
import { getHomeDataMock } from '@/lib/mock-data';

export async function GET() {
  try {
    const data = getHomeDataMock();
    return NextResponse.json({ status: 'success', data });
  } catch (error) {
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
