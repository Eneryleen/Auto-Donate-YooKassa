Шаг 1: Установка
```bash
npm install
```

Шаг 2: Конфигурация
Настройте файл .env

Шаг 3: Настройка RCON на сервере

В `server.properties`:

```properties
enable-rcon=true
rcon.port=25575
rcon.password=ваш_надежный_пароль
```

Перезапустите сервер Minecraft.

## Шаг 4: Настройка ЮКасса

1. Зарегистрируйтесь на [yookassa.ru](https://yookassa.ru)
2. Создайте магазин
3. Скопируйте Shop ID и Secret Key
4. Настройте webhook: `https://yourdomain.com/api/webhook`
5. Выберите событие: `payment.succeeded`

## Шаг 5: Запуск

Режим разработки:
```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

Production:
```bash
npm run build
npm start
```

Поддержка:
https://t.me/winterstudiomc
