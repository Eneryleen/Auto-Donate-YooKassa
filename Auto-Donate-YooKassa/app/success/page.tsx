'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import siteConfig from '@/config/site.config';
import Footer from '@/components/Footer';

function SuccessContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [username, setUsername] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const checkPayment = async () => {
      const paymentId = searchParams.get('paymentId');

      if (!paymentId) {
        setStatus('error');
        return;
      }

      try {
        const response = await fetch(`/api/payment/status?paymentId=${paymentId}`);
        const data = await response.json();

        if (data.successful) {
          setStatus('success');
          setUsername(data.username || '');
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Failed to check payment status:', error);
        setStatus('error');
      }
    };

    checkPayment();
  }, [searchParams]);

  const copyServerIp = () => {
    navigator.clipboard.writeText(siteConfig.server.ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <i className="bi bi-hourglass-split text-6xl text-primary animate-spin mb-4"></i>
          <p className="text-xl text-gray-400">Проверка платежа...</p>
        </motion.div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card max-w-md w-full text-center"
        >
          <i className="bi bi-exclamation-triangle text-6xl text-error mb-4"></i>
          <h1 className="text-3xl font-display font-bold mb-3">Ошибка</h1>
          <p className="text-gray-400 mb-6">
            Не удалось подтвердить платеж. Пожалуйста, свяжитесь с администрацией.
          </p>
          <a href="/" className="btn-primary inline-flex items-center gap-2">
            <i className="bi bi-arrow-left"></i>
            На главную
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-success/10 via-transparent to-primary/10 pointer-events-none"></div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-success/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card max-w-md w-full text-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-6"
        >
          <i className="bi bi-check-circle-fill text-8xl text-success"></i>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-display font-bold text-gradient mb-3"
        >
          Проходка выдана!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 text-lg mb-8"
        >
          {username && (
            <>
              Игрок <span className="text-white font-semibold">{username}</span> получил проходку на сервер
            </>
          )}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <div className="bg-dark-hover border border-dark-border rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-2">IP сервера</p>
            <div className="flex items-center justify-between gap-3">
              <code className="text-lg font-mono text-white">{siteConfig.server.ip}</code>
              <button
                onClick={copyServerIp}
                className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
              >
                <i className={`bi ${copied ? 'bi-check-lg' : 'bi-clipboard'}`}></i>
                {copied ? 'Скопировано' : 'Копировать'}
              </button>
            </div>
          </div>

          <a
            href={siteConfig.discord.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 w-full"
          >
            <i className="bi bi-discord text-xl"></i>
            Присоединиться к Discord
          </a>

          <a
            href="/"
            className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2"
          >
            <i className="bi bi-arrow-left"></i>
            Вернуться на главную
          </a>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <i className="bi bi-hourglass-split text-6xl text-primary animate-spin"></i>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
