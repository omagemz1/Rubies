import { useMemo, useState } from 'react'
import { Edit2, Trash2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { format } from 'date-fns'
import { Transaction } from '../types'

interface TransactionTableProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions = [], onEdit, onDelete }) => {
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date')
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const sorted = useMemo(() => {
    const copy = [...transactions]
    if (sortBy === 'date') {
      copy.sort((a, b) => {
        const ta = a.date ? new Date(a.date).getTime() : 0
        const tb = b.date ? new Date(b.date).getTime() : 0
        return order === 'asc' ? ta - tb : tb - ta
      })
    } else if (sortBy === 'amount') {
      copy.sort((a, b) => {
        const ta = Number(a.amount) || 0
        const tb = Number(b.amount) || 0
        return order === 'asc' ? ta - tb : tb - ta
      })
    }
    return copy
  }, [transactions, sortBy, order])

  const totalPages = Math.ceil(sorted.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = sorted.slice(startIndex, startIndex + itemsPerPage)

  const handleSortChange = (newSortBy: 'date' | 'amount') => {
    setSortBy(newSortBy)
    setCurrentPage(1)
  }

  const toggleOrder = () => {
    setOrder((o) => (o === 'asc' ? 'desc' : 'asc'))
    setCurrentPage(1)
  }

  if (transactions.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-500 text-lg">No transactions yet. Add your first one!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="text-sm font-semibold text-gray-700">Sort by:</label>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value as 'date' | 'amount')}
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
          <button
            onClick={toggleOrder}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
          >
            {sortBy === 'date'
              ? order === 'desc'
                ? '📅 New → Old'
                : '📅 Old → New'
              : order === 'desc'
              ? '💰 High → Low'
              : '💰 Low → High'}
          </button>
        </div>
        <span className="text-sm text-gray-600 font-medium">{sorted.length} transactions</span>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block card overflow-hidden p-0">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-pink-50 to-purple-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Description</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedData.map((t) => {
              const isExpense = Number(t.amount) < 0
              return (
                <tr key={t._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span
                      className={`font-bold text-lg ${
                        isExpense ? 'text-red-600' : 'text-green-600'
                      }`}
                    >
                      {isExpense ? '−' : '+'}
                      {Math.abs(t.amount).toFixed(2)} OMR
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {t.description || <span className="text-gray-400 italic">No description</span>}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {t.date ? format(new Date(t.date), 'MMM dd, yyyy HH:mm') : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(t)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => onDelete(t._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {paginatedData.map((t) => {
          const isExpense = Number(t.amount) < 0
          return (
            <div key={t._id} className="card">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span
                    className={`font-bold text-xl ${
                      isExpense ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {isExpense ? '−' : '+'}
                    {Math.abs(t.amount).toFixed(2)} OMR
                  </span>
                  <p className="text-gray-700 mt-1">
                    {t.description || <span className="text-gray-400 italic">No description</span>}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {t.date ? format(new Date(t.date), 'MMM dd, yyyy HH:mm') : '-'}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onEdit(t)} className="btn-edit flex-1 flex items-center justify-center gap-2">
                  <Edit2 size={16} />
                  <span>Edit</span>
                </button>
                <button onClick={() => onDelete(t._id)} className="btn-danger flex-1 flex items-center justify-center gap-2">
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronsLeft size={20} />
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="px-4 py-2 font-medium text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={20} />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronsRight size={20} />
          </button>
        </div>
      )}
    </div>
  )
}

export default TransactionTable
