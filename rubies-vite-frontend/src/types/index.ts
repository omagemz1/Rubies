export interface Transaction {
  _id: string;
  amount: number;
  description: string;
  category?: string;
  date: string;
}

export interface TransactionsState {
  list: Transaction[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
