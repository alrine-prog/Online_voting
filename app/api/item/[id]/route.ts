import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const itemId = params.id;
  return NextResponse.json({ id: itemId, name: `Item ${itemId}` });
}
