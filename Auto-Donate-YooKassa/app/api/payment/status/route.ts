import { NextRequest, NextResponse } from 'next/server';
import { getPayment, isPaymentSuccessful } from '@/lib/yukassa';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const paymentId = searchParams.get('paymentId');

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      );
    }

    const payment = await getPayment(paymentId);

    return NextResponse.json({
      status: payment.status,
      paid: payment.paid,
      successful: isPaymentSuccessful(payment),
      username: payment.metadata?.username,
    });
  } catch (error) {
    console.error('Payment status check error:', error);
    return NextResponse.json(
      { error: 'Failed to check payment status' },
      { status: 500 }
    );
  }
}
