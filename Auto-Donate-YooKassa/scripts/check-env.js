const fs = require('fs');
const path = require('path');

const requiredEnvVars = [
  'NEXT_PUBLIC_BASE_URL',
  'NEXT_PUBLIC_SERVER_NAME',
  'NEXT_PUBLIC_SERVER_IP',
  'NEXT_PUBLIC_PRICE',
  'NEXT_PUBLIC_DISCORD_URL',
  'RCON_HOST',
  'RCON_PORT',
  'RCON_PASSWORD',
  'RCON_COMMAND',
  'YUKASSA_SHOP_ID',
  'YUKASSA_SECRET_KEY',
];

const envPath = path.join(__dirname, '..', '.env');

console.log('Проверка переменных окружения...\n');

if (!fs.existsSync(envPath)) {
  console.error('Ошибка: файл .env не найден!');
  console.log('Скопируйте .env.example в .env и заполните значения.');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf-8');
const envLines = envContent.split('\n');
const envVars = {};

envLines.forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const [key, ...valueParts] = trimmed.split('=');
    if (key) {
      envVars[key.trim()] = valueParts.join('=').trim();
    }
  }
});

let hasErrors = false;

requiredEnvVars.forEach(varName => {
  const value = envVars[varName];

  if (!value || value === '' || value.includes('example') || value.includes('your_')) {
    console.error(`✗ ${varName}: не настроено`);
    hasErrors = true;
  } else {
    console.log(`✓ ${varName}: настроено`);
  }
});

console.log('');

if (hasErrors) {
  console.error('Некоторые переменные окружения не настроены.');
  console.log('Проверьте файл .env и заполните все необходимые значения.');
  process.exit(1);
} else {
  console.log('Все переменные окружения настроены правильно!');
  process.exit(0);
}
