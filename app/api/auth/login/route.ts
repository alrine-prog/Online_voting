export const dynamic = 'force-dynamic'; // Prevents static page data collection errors at build time

import { prisma } from '@/lib/prisma'; // Ensure correct path to your Prisma client

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Authentication logic here
    if (!email || !password) {
      return Response.json({ error: 'Missing email or password' }, { status: 400 });
    }

    // Example user check
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    return Response.json({ message: 'Login successful', user }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

