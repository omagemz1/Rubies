import axios, { AxiosResponse } from 'axios';
import { Transaction } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/transactions';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const getTransactions = (): Promise<AxiosResponse<Transaction[]>> => 
  axiosInstance.get<Transaction[]>('/');

export const addTransaction = (data: Omit<Transaction, '_id' | 'date'>): Promise<AxiosResponse<Transaction>> => 
  axiosInstance.post<Transaction>('/', data);

export const updateTransaction = (id: string, data: Partial<Omit<Transaction, '_id'>>): Promise<AxiosResponse<Transaction>> => 
  axiosInstance.put<Transaction>(`/${id}`, data);

export const deleteTransaction = (id: string): Promise<AxiosResponse<{ message: string }>> => 
  axiosInstance.delete<{ message: string }>(`/${id}`);
