import { useState, useEffect, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { X, Plus, Loader2 } from 'lucide-react';
import { fetchTransactions } from '../features/transactionsSlice';
import { addTransaction, updateTransaction } from '../services/api';
import { Transaction } from '../types';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  editData: Transaction | null;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose, editData }) => {
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editData) {
      setAmount(String(Math.abs(Number(editData.amount))));
      setDescription(editData.description || '');
      setType(Number(editData.amount) < 0 ? 'expense' : 'income');
    } else {
      setAmount('');
      setDescription('');
      setType('income');
    }
  }, [editData, isOpen]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amt = Number(amount);
    if (isNaN(amt) || amt <= 0) {
      alert('Please enter a valid amount greater than 0');
      return;
    }

    const finalAmount = type === 'expense' ? -Math.abs(amt) : Math.abs(amt);
    setIsSubmitting(true);

    try {
      if (editData) {
        await updateTransaction(editData._id, { amount: finalAmount, description });
      } else {
        await addTransaction({ amount: finalAmount, description });
      }
      dispatch(fetchTransactions() as any);
      onClose();
    } catch (err) {
      console.error(err);
      alert('Error: ' + ((err as any).response?.data?.message || (err as Error).message));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {editData ? '✏️ Edit Transaction' : '➕ Add Transaction'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isSubmitting}
            type="button"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Amount (OMR)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.01"
              min="0.01"
              className="input-field"
              disabled={isSubmitting}
              required
            />
            <div className="mt-3 flex gap-2">
              {[8, 10, 12, 15, 20].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmount(String(amt))}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                  disabled={isSubmitting}
                >
                  {amt} OMR
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Type</label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="income"
                  checked={type === 'income'}
                  onChange={() => setType('income')}
                  className="w-4 h-4 text-green-500"
                  disabled={isSubmitting}
                />
                <span className="text-sm font-medium text-gray-700">💰 Income</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="expense"
                  checked={type === 'expense'}
                  onChange={() => setType('expense')}
                  className="w-4 h-4 text-red-500"
                  disabled={isSubmitting}
                />
                <span className="text-sm font-medium text-gray-700">💸 Expense</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description (Optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field"
              placeholder="e.g., Groceries, Salary..."
              disabled={isSubmitting}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {['🛒 Groceries', '🍔 Talabat', '📦 Others', '🏢 Work'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setDescription(preset)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                  disabled={isSubmitting}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="btn-primary flex-1 flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Plus size={20} />
                  <span>{editData ? 'Update' : 'Add'}</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
