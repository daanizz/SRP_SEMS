import { motion, AnimatePresence } from "framer-motion";

const DifficultyModal = ({ open, onClose, onSelect }) => {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white p-8 rounded-3xl max-w-md w-full shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Select Difficulty</h2>

          <div className="space-y-4">
            <button
              onClick={() => onSelect("easy")}
              className="w-full p-5 bg-green-500 text-white rounded-2xl text-2xl font-bold"
            >
              🌟 Easy
            </button>

            <button
              onClick={() => onSelect("medium")}
              className="w-full p-5 bg-red-500 text-white rounded-2xl text-2xl font-bold"
            >
              🔥 Medium
            </button>
          </div>

          <button
            onClick={onClose}
            className="mt-5 w-full p-3 bg-gray-200 text-gray-700 rounded-xl"
          >
            Cancel
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DifficultyModal;
