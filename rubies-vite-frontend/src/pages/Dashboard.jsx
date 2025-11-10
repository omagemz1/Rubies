import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Plus, Gem, TrendingUp, TrendingDown, Loader2 } from 'lucide-react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { format } from 'date-fns'
import { fetchTransactions } from '../features/transactionsSlice'
import { deleteTransaction } from '../services/api'
import AddTransactionModal from '../components/AddTransactionModal'
import TransactionTable from '../components/TransactionTable'
import ConfirmModal from '../components/ConfirmModal'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { list: transactions, status } = useSelector((state) => state.transactions)

  const [modalOpen, setModalOpen] = useState(false)
  const [editData, setEditData] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [toDeleteId, setToDeleteId] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    dispatch(fetchTransactions())
  }, [dispatch])

  const handleEdit = (transaction) => {
    setEditData(transaction)
    setModalOpen(true)
  }

  const handleDelete = (id) => {
    setToDeleteId(id)
    setConfirmOpen(true)
  }

  const handleDeleteConfirmed = async () => {
    if (!toDeleteId) return
    setIsDeleting(true)
    try {
      await deleteTransaction(toDeleteId)
      dispatch(fetchTransactions())
    } catch (err) {
      console.error('Delete failed', err)
      alert('Failed to delete transaction')
    } finally {
      setIsDeleting(false)
      setConfirmOpen(false)
      setToDeleteId(null)
    }
  }

  const total = transactions.reduce((acc, t) => acc + Number(t.amount), 0)
  const income = transactions
    .filter((t) => Number(t.amount) > 0)
    .reduce((acc, t) => acc + Number(t.amount), 0)
  const expenses = Math.abs(
    transactions
      .filter((t) => Number(t.amount) < 0)
      .reduce((acc, t) => acc + Number(t.amount), 0)
  )

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          
        </div>

        {/* Stats Cards */}
        <div className="flex justify-center mb-8">
          <div className={`card bg-gradient-to-br w-full md:w-96 ${
            total >= 0 
              ? 'from-blue-50 to-indigo-50 border-2 border-blue-200' 
              : 'from-orange-50 to-red-50 border-2 border-orange-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-semibold mb-1 ${
                  total >= 0 ? 'text-blue-700' : 'text-orange-700'
                }`}>
                  Balance
                </p>
                <p className={`text-3xl font-bold ${
                  total >= 0 ? 'text-blue-600' : 'text-orange-600'
                }`}>
                  {total >= 0 ? '+' : ''}{total.toFixed(2)}
                </p>
                <p className={`text-xs mt-1 ${
                  total >= 0 ? 'text-blue-600' : 'text-orange-600'
                }`}>
                  OMR
                </p>
              </div>
              <div className={`p-4 rounded-full ${
                total >= 0 ? 'bg-blue-200' : 'bg-orange-200'
              }`}>
                <Gem className={total >= 0 ? 'text-blue-700' : 'text-orange-700'} size={32} />
              </div>
            </div>
          </div>
        </div>

        {/* Add Transaction Button */}
        <div className="mb-6 text-center">
          <button
            onClick={() => {
              setEditData(null)
              setModalOpen(true)
            }}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Plus size={20} />
            <span>Add Transaction</span>
          </button>
        </div>

        {/* Loading State */}
        {status === 'loading' && (
          <div className="card text-center py-12">
            <Loader2 className="animate-spin mx-auto text-pink-600 mb-4" size={48} />
            <p className="text-gray-600">Loading transactions...</p>
          </div>
        )}

        {/* Error State */}
        {status === 'failed' && (
          <div className="card text-center py-12 bg-red-50 border-2 border-red-200">
            <p className="text-red-600 text-lg font-semibold">Failed to load transactions</p>
            <button
              onClick={() => dispatch(fetchTransactions())}
              className="mt-4 btn-primary"
            >
              Retry
            </button>
          </div>
        )}

        {/* Transactions Table */}
        {status === 'succeeded' && (
          <TransactionTable
            transactions={transactions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        {/* Calendar View */}
        {status === 'succeeded' && (
          <div className="mt-8">
            <div className="card">
              <h4 className="text-center mb-6 text-2xl font-bold text-gray-800">📅 Calendar View</h4>
              <div className="flex justify-center w-full mb-6">
                <div className="max-w-md w-full">
                  <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    className="mx-auto border-2 border-gray-200 rounded-lg shadow-sm"
                  />
                </div>
              </div>
              <div className="mt-6">
                <h5 className="text-center mb-4 text-lg font-semibold text-gray-700">
                  Transactions on {format(selectedDate, 'MMM dd, yyyy')}
                </h5>
                {(() => {
                  const dateStr = format(selectedDate, 'yyyy-MM-dd')
                  const dayTransactions = transactions.filter(t => {
                    const tDate = new Date(t.date)
                    return format(tDate, 'yyyy-MM-dd') === dateStr
                  })
                  const dayTotal = dayTransactions.reduce((acc, t) => acc + Number(t.amount), 0)
                  
                  return (
                    <>
                      <p className={`text-center font-bold text-xl mb-4 ${
                        dayTotal >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        Total: {dayTotal >= 0 ? '+' : ''}{dayTotal.toFixed(2)} OMR
                      </p>
                      {dayTransactions.length > 0 ? (
                        <ul className="space-y-2 max-w-2xl mx-auto">
                          {dayTransactions.map((t) => (
                            <li
                              key={t._id}
                              className={`flex justify-between items-center p-4 rounded-lg border-l-4 ${
                                Number(t.amount) >= 0
                                  ? 'bg-green-50 border-green-500'
                                  : 'bg-red-50 border-red-500'
                              }`}
                            >
                              <div>
                                <strong className={`text-lg ${
                                  Number(t.amount) >= 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {Number(t.amount) >= 0 ? '+' : ''}{Number(t.amount).toFixed(2)} OMR
                                </strong>
                                <div className="text-gray-600 text-sm mt-1">
                                  {t.category}
                                </div>
                                {t.description && (
                                  <div className="text-gray-500 text-xs mt-1">
                                    {t.description}
                                  </div>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-center text-gray-500 py-8">
                          No transactions on this date
                        </p>
                      )}
                    </>
                  )
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Modals */}
        <AddTransactionModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false)
            setEditData(null)
          }}
          editData={editData}
        />

        <ConfirmModal
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          title="Delete Transaction"
          message="Are you sure you want to permanently delete this transaction? This action cannot be undone."
          onConfirm={handleDeleteConfirmed}
          isLoading={isDeleting}
        />
      </div>
    </div>
  )
}

export default Dashboard
