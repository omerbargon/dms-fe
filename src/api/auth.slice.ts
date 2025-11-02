import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthState, IUser } from './auth.types';
import { secureStorage, validateToken } from './lib/security';

const SECURE_STORAGE_KEY = 'authState';

/**
 * Load persisted auth state securely (async)
 */
export const loadAuthState = async (): Promise<Partial<IAuthState>> => {
  try {
    const state = await secureStorage.getItem(SECURE_STORAGE_KEY);
    if (!state) return {};
    if (state.auth?.accessToken && !validateToken(state.auth.accessToken)) {
      console.warn('Invalid or expired token found, clearing auth state');
      await clearAuthStorage();
      return {};
    }

    return state?.isLoggedIn && state?.auth?.accessToken ? state : {};
  } catch (error) {
    console.error('Failed to load auth state:', error);
    await clearAuthStorage();
    return {};
  }
};

/**
 * Save the current auth state to secure storage (async)
 */
export const saveAuthState = async (state: IAuthState) => {
  try {
    if (state.isLoggedIn && state.auth?.accessToken) {
      await secureStorage.setItem(SECURE_STORAGE_KEY, {
        ...state,
        errors: state.errors?.length > 10 ? state.errors.slice(-5) : state.errors,
      });
    } else {
      await clearAuthStorage();
    }
  } catch (err) {
    console.error('Failed to save auth state:', err);
  }
};

/**
 * Clear stored auth state
 */
export const clearAuthStorage = async () => {
  try {
    await secureStorage.removeItem(SECURE_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear secure storage:', err);
  }
};

/**
 * Default Redux initial state (synchronous)
 * Actual persisted data is merged in later when hydrated.
 */
const initialState: IAuthState = {
  task: 'read',
  status: 'idle',
  isLoggedIn: false,
  errors: [],
};

/**
 * Slice definition
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const token = action.payload?.accessToken || action.payload?.token;
      if (token && validateToken(token)) {
        state.status = 'success';
        state.auth = action.payload;
        state.isLoggedIn = true;
        state.errors = [];
        state.user = undefined;
        void saveAuthState(state);
      } else {
        console.error('Invalid token received during login');
        state.status = 'failed';
        state.isLoggedIn = false;
      }
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      void saveAuthState(state);
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
      void saveAuthState(state);
    },
    clearUser: state => {
      state.user = undefined;
      state.auth = undefined;
      state.isLoggedIn = false;
      state.task = 'logout';
      state.status = 'idle';
      state.errors = [];
      void clearAuthStorage();
    },
    hydrateAuthState: (state, action: PayloadAction<Partial<IAuthState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setLogin, setUser, setIsLoggedIn, clearUser, hydrateAuthState } = authSlice.actions;
export default authSlice.reducer;
