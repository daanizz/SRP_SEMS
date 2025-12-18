import { motion } from "framer-motion";

const GameCard = ({ game, index, onClick }) => {
  return (
    <motion.div
      key={game.id}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      whileHover={{ scale: 1.05, y: -8 }}
      onClick={onClick}
      className={`cursor-pointer bg-gradient-to-br ${game.color}
        p-8 rounded-3xl shadow-xl text-white`}
    >
      <div className="text-7xl mb-4">{game.icon}</div>
      <h3 className="text-3xl font-bold">{game.name}</h3>
      <p className="opacity-90 mt-2">{game.description}</p>

      <motion.div whileHover={{ x: 10 }} className="mt-6 font-bold flex gap-2">
        Play Now →
      </motion.div>
    </motion.div>
  );
};

export default GameCard;
