export const config = {
  site: {
    name: process.env.NEXT_PUBLIC_SITE_NAME || 'HQVerse',
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'A maior comunidade de HQs digitalizadas',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001',
  },
  auth: {
    accessExpiry: parseInt(process.env.NEXT_PUBLIC_JWT_ACCESS_EXPIRY || '7200'),
    refreshExpiry: parseInt(process.env.NEXT_PUBLIC_JWT_REFRESH_EXPIRY || '604800'),
  },
  features: {
    darkMode: process.env.NEXT_PUBLIC_ENABLE_DARK_MODE === 'true',
    analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  },
  debug: process.env.NEXT_PUBLIC_DEBUG_MODE === 'true',
};

export function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function isProd(): boolean {
  return process.env.NODE_ENV === 'production';
}

export function isTest(): boolean {
  return process.env.NODE_ENV === 'test';
}

export function getEnv(key: string, fallback?: string): string | undefined {
  return process.env[key] || fallback;
}

export function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}
