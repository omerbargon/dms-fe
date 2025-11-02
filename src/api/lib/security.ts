import 'react-native-get-random-values';
import EncryptedStorage from 'react-native-encrypted-storage';
import CryptoJS from 'crypto-js';
import sanitizeHtmlLib from 'sanitize-html';
import { decode as atob } from 'base-64';
import { ENCRYPTION_KEY as ECRYP_KEY } from '@env';

const ENCRYPTION_KEY = ECRYP_KEY || 'fallback-key-for-dev-only';
const STORAGE_PREFIX = 'br_secure_';
const STORAGE_INDEX_KEY = `${STORAGE_PREFIX}__keys_index`;

if (ENCRYPTION_KEY === 'fallback-key-for-dev-only') {
  // eslint-disable-next-line no-console
  console.warn('⚠️ Using fallback encryption key. Set ENCRYPTION_KEY in production!');
}

// --- Helpers to track our own keys since EncryptedStorage doesn't expose key listing
async function readKeyIndex(): Promise<Set<string>> {
  try {
    const raw = await EncryptedStorage.getItem(STORAGE_INDEX_KEY);
    if (!raw) return new Set<string>();
    const arr = JSON.parse(raw) as string[];
    return new Set(arr);
  } catch {
    return new Set<string>();
  }
}

async function writeKeyIndex(keys: Set<string>): Promise<void> {
  try {
    await EncryptedStorage.setItem(STORAGE_INDEX_KEY, JSON.stringify(Array.from(keys)));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Failed to persist key index', e);
  }
}

// --- Encryption / Decryption (AES)
export const encryptData = (data: any): string => {
  try {
    const jsonString = JSON.stringify(data);
    // Using passphrase-based AES (CBC+Pkcs7 internally)
    return CryptoJS.AES.encrypt(jsonString, ENCRYPTION_KEY).toString();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Encryption failed:', error);
    throw new Error('Failed to encrypt data');
  }
};

export const decryptData = (encryptedData: string): any => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedString) return null;
    return JSON.parse(decryptedString);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Decryption failed:', error);
    return null;
  }
};

// --- Secure storage (EncryptedStorage wrapper)
export const secureStorage = {
  setItem: async (key: string, value: any): Promise<void> => {
    try {
      const encryptedValue = encryptData(value);
      await EncryptedStorage.setItem(STORAGE_PREFIX + key, encryptedValue);

      const index = await readKeyIndex();
      index.add(key);
      await writeKeyIndex(index);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to store secure data:', error);
    }
  },

  getItem: async (key: string): Promise<any> => {
    try {
      const encryptedValue = await EncryptedStorage.getItem(STORAGE_PREFIX + key);
      if (!encryptedValue) return null;
      return decryptData(encryptedValue);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to retrieve secure data:', error);
      return null;
    }
  },

  removeItem: async (key: string): Promise<void> => {
    try {
      await EncryptedStorage.removeItem(STORAGE_PREFIX + key);
      const index = await readKeyIndex();
      if (index.has(key)) {
        index.delete(key);
        await writeKeyIndex(index);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to remove secure data:', error);
    }
  },

  clear: async (): Promise<void> => {
    try {
      const index = await readKeyIndex();
      await Promise.all(Array.from(index).map(k => EncryptedStorage.removeItem(STORAGE_PREFIX + k)));
      await EncryptedStorage.removeItem(STORAGE_INDEX_KEY);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to clear secure storage:', error);
    }
  },
};

// --- Input sanitization (no DOM in RN)
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  // Strip all tags and attributes, keep text content
  return sanitizeHtmlLib(input, {
    allowedTags: [],
    allowedAttributes: {},
    textFilter: text => text,
  }).trim();
};

// Rich HTML sanitization (for RN HTML renderers)
export const sanitizeHtml = (html: string): string => {
  if (typeof html !== 'string') return '';
  return sanitizeHtmlLib(html, {
    allowedTags: ['b', 'i', 'em', 'strong', 'p', 'br'],
    allowedAttributes: {},
    disallowedTagsMode: 'discard',
    // Explicitly forbid risky tags/attrs
    exclusiveFilter: () => false,
  });
};

// --- Validators
export const validateEmail = (email: string): boolean => {
  const sanitizedEmail = sanitizeInput(email);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(sanitizedEmail) && sanitizedEmail.length <= 254;
};

export const validatePhone = (phone: string): boolean => {
  const sanitizedPhone = sanitizeInput(phone);
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,15}$/;
  return phoneRegex.test(sanitizedPhone);
};

export const validateName = (name: string): boolean => {
  const sanitizedName = sanitizeInput(name);
  const nameRegex = /^[a-zA-Z\s\-'\.]{1,100}$/;
  return nameRegex.test(sanitizedName) && sanitizedName.trim().length >= 2;
};

export const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (!password || password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  return { isValid: true, message: 'Password is strong' };
};

// --- In-memory rate limiter
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  canProceed(identifier: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];
    const recentAttempts = attempts.filter(time => now - time < this.windowMs);

    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }

    recentAttempts.push(now);
    this.attempts.set(identifier, recentAttempts);
    return true;
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

export const loginRateLimiter = new RateLimiter(5, 15 * 60 * 1000);

// --- "Security headers" (note: these are server response headers; setting them in mobile requests is usually ineffective)
export const getSecurityHeaders = (): Record<string, string> => {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  };
};

// --- Token (JWT) validation (no signature verification here—just structure/claims check)
export const validateToken = (token: string): boolean => {
  if (!token || typeof token !== 'string') return false;

  const parts = token.split('.');
  if (parts.length !== 3) return false;

  try {
    const payloadJson = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(payloadJson);

    // 5-minute clock skew buffer
    if (payload.exp && payload.exp * 1000 < Date.now() + 300_000) {
      return false;
    }
    if (!payload.sub || !payload.iat) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

// --- Secure random ID (32 bytes -> hex)
export const generateSecureId = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};
