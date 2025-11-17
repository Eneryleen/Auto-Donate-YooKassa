import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'processed_payments.json');

interface ProcessedPayments {
  [paymentId: string]: {
    username: string;
    processedAt: string;
  };
}

function ensureDbExists(): void {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({}));
  }
}

export function isPaymentProcessed(paymentId: string): boolean {
  ensureDbExists();
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  const payments: ProcessedPayments = JSON.parse(data);
  return !!payments[paymentId];
}

export function markPaymentAsProcessed(paymentId: string, username: string): void {
  ensureDbExists();
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  const payments: ProcessedPayments = JSON.parse(data);

  payments[paymentId] = {
    username,
    processedAt: new Date().toISOString(),
  };

  fs.writeFileSync(DB_PATH, JSON.stringify(payments, null, 2));
}
