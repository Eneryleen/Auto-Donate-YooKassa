import crypto from 'crypto';
import siteConfig from '@/config/site.config';

export interface PaymentData {
  username: string;
  amount: number;
  currency: string;
  description: string;
  returnUrl: string;
}

export interface YooKassaPayment {
  id: string;
  status: string;
  paid: boolean;
  amount: {
    value: string;
    currency: string;
  };
  confirmation: {
    type: string;
    confirmation_url?: string;
  };
  metadata?: {
    username?: string;
  };
}

export interface WebhookPayload {
  type: string;
  event: string;
  object: YooKassaPayment;
}

export async function createPayment(data: PaymentData): Promise<YooKassaPayment> {
  const { shopId, secretKey } = siteConfig.yukassa;
  const idempotenceKey = crypto.randomUUID();

  const requestBody = {
    amount: {
      value: data.amount.toFixed(2),
      currency: data.currency,
    },
    confirmation: {
      type: 'redirect',
      return_url: data.returnUrl,
    },
    capture: true,
    description: data.description,
    metadata: {
      username: data.username,
    },
  };

  const auth = Buffer.from(`${shopId}:${secretKey}`).toString('base64');

  const response = await fetch('https://api.yookassa.ru/v3/payments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotence-Key': idempotenceKey,
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `YooKassa API error: ${response.status} - ${JSON.stringify(errorData)}`
    );
  }

  return response.json();
}

export async function getPayment(paymentId: string): Promise<YooKassaPayment> {
  const { shopId, secretKey } = siteConfig.yukassa;
  const auth = Buffer.from(`${shopId}:${secretKey}`).toString('base64');

  const response = await fetch(`https://api.yookassa.ru/v3/payments/${paymentId}`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  if (!response.ok) {
    throw new Error(`YooKassa API error: ${response.status}`);
  }

  return response.json();
}

export function verifyWebhookSignature(body: string, signature: string): boolean {
  const { secretKey } = siteConfig.yukassa;

  const hash = crypto
    .createHmac('sha256', secretKey)
    .update(body)
    .digest('hex');

  return hash === signature;
}

export function isPaymentSuccessful(payment: YooKassaPayment): boolean {
  return payment.status === 'succeeded' && payment.paid === true;
}
