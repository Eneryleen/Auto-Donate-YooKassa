import { NextRequest, NextResponse } from 'next/server';
import { validateMinecraftUsername } from '@/lib/validation';
import { createPayment } from '@/lib/yukassa';
import siteConfig from '@/config/site.config';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username } = body;

    if (!username || typeof username !== 'string') {
      return NextResponse.json(
        { error: 'Никнейм обязателен' },
        { status: 400 }
      );
    }

    const validation = validateMinecraftUsername(username);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin;
    const returnUrl = `${baseUrl}/success`;

    const payment = await createPayment({
      username: username.trim(),
      amount: siteConfig.server.price,
      currency: siteConfig.server.currency,
      description: `Проходка на сервер ${siteConfig.server.name} для ${username.trim()}`,
      returnUrl,
    });

    if (!payment.confirmation.confirmation_url) {
      throw new Error('No confirmation URL received from YooKassa');
    }

    return NextResponse.json({
      paymentId: payment.id,
      confirmationUrl: payment.confirmation.confirmation_url,
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { error: 'Не удалось создать платеж. Попробуйте позже.' },
      { status: 500 }
    );
  }
}
