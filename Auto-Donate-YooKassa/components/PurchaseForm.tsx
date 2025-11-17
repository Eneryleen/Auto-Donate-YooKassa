'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { validateMinecraftUsername } from '@/lib/validation';
import siteConfig from '@/config/site.config';

export default function PurchaseForm() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validation = validateMinecraftUsername(username);
    if (!validation.valid) {
      setError(validation.error || 'Некорректный никнейм');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Не удалось создать платеж');
      }

      if (data.confirmationUrl) {
        window.location.href = data.confirmationUrl;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card max-w-md w-full mx-auto"
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-display font-bold text-gradient mb-3">
          {siteConfig.server.name}
        </h1>
        <p className="text-gray-400 text-lg">
          Покупка проходки на сервер
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
            Ваш игровой никнейм
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError('');
            }}
            placeholder="Steve"
            className="input-field w-full"
            disabled={loading}
            autoComplete="off"
            maxLength={16}
          />
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-error text-sm mt-2 flex items-center gap-2"
            >
              <i className="bi bi-exclamation-circle"></i>
              {error}
            </motion.p>
          )}
        </div>

        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Стоимость</span>
            <span className="text-2xl font-bold text-primary">
              {siteConfig.server.price} ₽
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !username.trim()}
          className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4"
        >
          {loading ? (
            <>
              <i className="bi bi-hourglass-split animate-spin"></i>
              Создание платежа...
            </>
          ) : (
            <>
              <i className="bi bi-credit-card"></i>
              Оплатить
            </>
          )}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
        <a
          href={siteConfig.discord.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 w-full"
        >
          <i className="bi bi-discord text-xl"></i>
          Наш Discord
        </a>
      </div>
    </motion.div>
  );
}
