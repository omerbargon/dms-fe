import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';
import DeviceInfo from 'react-native-device-info';
import { API_PATH } from '@env';
import { RootState } from './store';
import { clearUser } from './auth.slice';

export interface BaseQueryFnArgs<Data = AxiosRequestConfig['data'] | undefined> {
  method?: Method;
  url: string;
  params?: AxiosRequestConfig['params'];
  data?: Data;
  options?: AxiosRequestConfig;
}

export const axiosBaseQuery: BaseQueryFn<BaseQueryFnArgs, unknown, unknown> = async (args, reduxApi) => {
  const { method = 'GET', url, params, data, options } = args;

  const deviceType = DeviceInfo.getSystemName();
  const deviceId = await DeviceInfo.getUniqueId();

  try {
    const storeState = reduxApi.getState() as RootState;
    const { accessToken } = storeState?.auth?.auth || {};

    const headers: Record<string, string> = {
      'Device-Type': deviceType,
      'Device-Id': deviceId,
    };

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const axiosInstance = axios.create({
      baseURL: API_PATH,
      headers,
    });

    const response = await axiosInstance({
      method,
      url,
      data,
      params,
      ...options,
    });

    return { data: response.data };
  } catch (axiosError) {
    const err = axiosError as AxiosError;
    console.error('API Error:', err.response?.data || err.message);

    if (err.response?.status === 401) {
      reduxApi.dispatch(clearUser());
    }

    return {
      error: {
        status: err.response?.status || 500,
        data: err.response?.data || err.message,
      },
    };
  }
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery,
  tagTypes: [],
  endpoints: build => ({
    getTestPosts: build.query<any, void>({
      query: () => ({
        method: 'GET',
        url: '/posts',
      }),
    }),
  }),
});

export const { useGetTestPostsQuery } = authApi;
