import { AlertTriangle, Loader2 } from 'lucide-react'

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm: () => void;
  isLoading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  onConfirm, 
  isLoading = false 
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-100 rounded-full">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          </div>
          <p className="text-gray-600 mb-6">{message}</p>
          <div className="flex gap-3">
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="btn-danger flex-1 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                <span>Delete</span>
              )}
            </button>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
