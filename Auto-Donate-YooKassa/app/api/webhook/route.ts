import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature, isPaymentSuccessful } from '@/lib/yukassa';
import { executeRconCommand } from '@/lib/rcon';
import { isPaymentProcessed, markPaymentAsProcessed } from '@/lib/db';
import type { WebhookPayload } from '@/lib/yukassa';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-yookassa-signature');

    if (!signature) {
      console.error('Missing webhook signature');
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    if (!verifyWebhookSignature(body, signature)) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 403 }
      );
    }

    const payload: WebhookPayload = JSON.parse(body);

    if (payload.event !== 'payment.succeeded') {
      return NextResponse.json({ status: 'ignored' });
    }

    const payment = payload.object;

    if (!isPaymentSuccessful(payment)) {
      console.log(`Payment ${payment.id} is not successful, status: ${payment.status}`);
      return NextResponse.json({ status: 'not_successful' });
    }

    if (isPaymentProcessed(payment.id)) {
      console.log(`Payment ${payment.id} already processed`);
      return NextResponse.json({ status: 'already_processed' });
    }

    const username = payment.metadata?.username;
    if (!username) {
      console.error(`No username in payment ${payment.id} metadata`);
      return NextResponse.json(
        { error: 'No username in metadata' },
        { status: 400 }
      );
    }

    try {
      await executeRconCommand(username);
      markPaymentAsProcessed(payment.id, username);

      console.log(`Successfully processed payment ${payment.id} for user ${username}`);

      return NextResponse.json({ status: 'success' });
    } catch (error) {
      console.error(`RCON execution failed for payment ${payment.id}:`, error);
      return NextResponse.json(
        { error: 'RCON execution failed' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
