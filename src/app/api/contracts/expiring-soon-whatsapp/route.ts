import { NextResponse } from 'next/server';
import { sendExpiringSoonWhatsAppAlerts } from '@/app/actions/renewals';

function isAuthorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;

  const authHeader = req.headers.get('authorization');
  return authHeader === `Bearer ${secret}`;
}

async function handleRequest(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const results = await sendExpiringSoonWhatsAppAlerts();
    return NextResponse.json({
      success: true,
      processed: results.length,
      results,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  return handleRequest(req);
}

export async function POST(req: Request) {
  return handleRequest(req);
}
