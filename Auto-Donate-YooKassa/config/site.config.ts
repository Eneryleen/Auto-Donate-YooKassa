export interface SiteConfig {
  server: {
    name: string;
    ip: string;
    price: number;
    currency: string;
  };
  discord: {
    url: string;
  };
  rcon: {
    host: string;
    port: number;
    password: string;
    command: string;
  };
  yukassa: {
    shopId: string;
    secretKey: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

const siteConfig: SiteConfig = {
  server: {
    name: process.env.NEXT_PUBLIC_SERVER_NAME || 'Minecraft Server',
    ip: process.env.NEXT_PUBLIC_SERVER_IP || 'play.example.com',
    price: parseInt(process.env.NEXT_PUBLIC_PRICE || '100', 10),
    currency: 'RUB',
  },
  discord: {
    url: process.env.NEXT_PUBLIC_DISCORD_URL || 'https://discord.gg/example',
  },
  rcon: {
    host: process.env.RCON_HOST || 'localhost',
    port: parseInt(process.env.RCON_PORT || '25575', 10),
    password: process.env.RCON_PASSWORD || '',
    command: process.env.RCON_COMMAND || 'lp user {username} parent add vip',
  },
  yukassa: {
    shopId: process.env.YUKASSA_SHOP_ID || '',
    secretKey: process.env.YUKASSA_SECRET_KEY || '',
  },
  seo: {
    title: process.env.NEXT_PUBLIC_SEO_TITLE || '{server_name} — Покупка проходки',
    description: process.env.NEXT_PUBLIC_SEO_DESCRIPTION || 'Купите проходку на {server_name} быстро и безопасно через ЮКасса',
    keywords: [
      'minecraft',
      'проходка',
      'whitelist',
      'майнкрафт',
      'сервер',
      'покупка',
    ],
  },
};

export default siteConfig;
