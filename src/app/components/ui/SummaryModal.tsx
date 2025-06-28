import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { IconX } from "@tabler/icons-react";

interface SummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalContent: string;
  summarizedContent: string;
  isLoading: boolean;
}

export default function SummaryModal({
  isOpen,
  onClose,
  originalContent,
  summarizedContent,
  isLoading
}: SummaryModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white dark:bg-neutral-900 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <DialogTitle className="text-xl font-bold text-black dark:text-white">
              Content Summary
            </DialogTitle>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <IconX size={24} />
            </button>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-400">Generating summary...</span>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Original Content:</h3>
                <div className="bg-gray-100 dark:bg-neutral-800 p-4 rounded-lg max-h-32 overflow-y-auto">
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{originalContent}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Summary:</h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-gray-800 dark:text-gray-200">{summarizedContent}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 