import { NextResponse } from 'next/server';
import { getPetState } from '@/lib/db';

export async function GET() {
    const state = await getPetState();
    return NextResponse.json(state);
}
