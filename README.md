# WinterMC Studios.
Современный веб-сайт для автоматизированной продажи проходки (whitelist) на сервер Minecraft с интеграцией платежной системы ЮКасса и автоматической выдачей через RCON.

## Возможности

- Минималистичный и современный дизайн с темной темой
- Валидация никнеймов игроков согласно правилам Minecraft
- Безопасная интеграция с платежной системой ЮКасса
- Автоматическая выдача проходки через RCON после успешной оплаты
- Защита от повторной обработки одного платежа
- Проверка подписи webhook от ЮКасса
- Адаптивный дизайн для всех устройств
- Красивые анимации при успешной оплате
- SEO оптимизация

## Технический стек

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Bootstrap Icons
- ЮКасса API
- RCON Client

## Требования

- Node.js 18.0.0 или выше

## Установка

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd Auto-Donate-YooKassa
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env` на основе `.env.example`:
```bash
cp .env.example .env
```

4. Заполните переменные окружения в файле `.env`

## Конфигурация

### Переменные окружения

Откройте файл `.env` и заполните следующие параметры:

#### Основные настройки

```env
# Базовый URL вашего сайта
NEXT_PUBLIC_BASE_URL=https://yourdomain.com

# Название сервера
NEXT_PUBLIC_SERVER_NAME=Minecraft Server

# IP адрес сервера для копирования
NEXT_PUBLIC_SERVER_IP=play.example.com

# Цена проходки в рублях
NEXT_PUBLIC_PRICE=100

# Ссылка на Discord сервер
NEXT_PUBLIC_DISCORD_URL=https://discord.gg/example
```

#### Настройки RCON

```env
# IP адрес или домен вашего Minecraft сервера
RCON_HOST=localhost

# RCON порт (по умолчанию 25575)
RCON_PORT=25575

# RCON пароль из server.properties
RCON_PASSWORD=your_rcon_password

# Команда для выдачи проходки
# {username} будет заменен на никнейм игрока
RCON_COMMAND=lp user {username} parent add vip
```

#### Настройки ЮКасса

```env
# ID магазина из личного кабинета ЮКасса
YUKASSA_SHOP_ID=123456

# Секретный ключ из личного кабинета ЮКасса
YUKASSA_SECRET_KEY=live_xxxxxxxxxxxxxx
```

#### SEO настройки (опционально)

```env
NEXT_PUBLIC_SEO_TITLE=Minecraft Server — Покупка проходки
NEXT_PUBLIC_SEO_DESCRIPTION=Купите проходку на наш Minecraft сервер быстро и безопасно
```

### Настройка RCON на сервере

1. Откройте файл `server.properties` вашего Minecraft сервера

2. Найдите и настройте следующие параметры:
```properties
enable-rcon=true
rcon.port=25575
rcon.password=your_secure_password
```

3. Перезапустите сервер

### Настройка ЮКасса

1. Зарегистрируйтесь на [yookassa.ru](https://yookassa.ru)

2. Создайте магазин в личном кабинете

3. Получите Shop ID и Secret Key в разделе "Настройки" → "Параметры магазина"

4. Настройте webhook для получения уведомлений о платежах:
   - URL: `https://yourdomain.com/api/webhook`
   - События: `payment.succeeded`

5. Сохраните настройки и добавьте данные в `.env`

### Примеры RCON команд

В зависимости от используемого плагина для управления правами, команда может отличаться:

LuckPerms:
```bash
lp user {username} parent add vip
```

Whitelist:
```bash
whitelist add {username}
```

## Запуск

### Режим разработки

```bash
npm run dev
```

Сайт будет доступен по адресу `http://localhost:3000`

### Production сборка

```bash
npm run build
npm start
```

## Структура проекта

```
ukassa-minecraft-store/
├── app/                      # Next.js App Router
│   ├── api/                  # API endpoints
│   │   ├── payment/          # Создание и проверка платежей
│   │   └── webhook/          # Webhook от ЮКасса
│   ├── success/              # Страница успешной оплаты
│   ├── layout.tsx            # Корневой layout
│   ├── page.tsx              # Главная страница
│   └── globals.css           # Глобальные стили
├── components/               # React компоненты
│   └── PurchaseForm.tsx      # Форма покупки
├── config/                   # Конфигурация
│   └── site.config.ts        # Настройки сайта
├── lib/                      # Утилиты и интеграции
│   ├── validation.ts         # Валидация никнеймов
│   ├── yukassa.ts            # Интеграция ЮКасса
│   ├── rcon.ts               # Интеграция RCON
│   └── db.ts                 # Простое хранилище данных
├── data/                     # Данные приложения
│   └── processed_payments.json  # История обработанных платежей
└── public/                   # Статические файлы
```

## Контакты

Разработчик: Winter Studio
Telegram: https://t.me/winterstudiomc
