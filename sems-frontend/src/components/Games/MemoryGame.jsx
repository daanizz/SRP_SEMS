import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, RotateCcw, Trophy } from "lucide-react";

const MemoryGame = ({ difficulty, onExit }) => {
  const emojis = [
    "🐶", "🐱", "🦊", "🐻",
    "🐼", "🐨", "🐯", "🦁",
    "🐮", "🐷", "🐸", "🐵"
  ];

  const cardCount = difficulty === "easy" ? 8 : 16;
  const gameEmojis = emojis.slice(0, cardCount / 2);

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    const shuffledCards = [...gameEmojis, ...gameEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji }));

    setCards(shuffledCards);
    setFlipped([]);
    setMatched([]);
    setScore(0);
  };

  const handleFlip = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [a, b] = newFlipped;

      if (cards[a].emoji === cards[b].emoji) {
        setMatched([...matched, a, b]);
        setScore(score + 10);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const allMatched = matched.length === cards.length;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col z-50">
      {/* Header */}
      <div className="bg-white shadow p-6 flex justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-blue-600">Memory Game</h2>
          <div className="px-4 py-2 bg-green-500 text-white rounded-full text-xl font-bold">
            Score: {score}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={initGame}
            className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
          >
            <RotateCcw className="w-6 h-6" />
          </button>

          <button
            onClick={onExit}
            className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Board */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div
          className={`grid ${
            difficulty === "easy" ? "grid-cols-4" : "grid-cols-4"
          } gap-4`}
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFlip(card.id)}
              className={`w-24 h-24 rounded-xl shadow-lg text-5xl flex items-center justify-center cursor-pointer
              ${flipped.includes(card.id) || matched.includes(card.id)
                  ? "bg-white"
                  : "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
              }`}
            >
              {(flipped.includes(card.id) || matched.includes(card.id)) ? card.emoji : "?"}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Win Modal */}
      {allMatched && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center"
        >
          <div className="bg-white rounded-3xl p-10 shadow-2xl text-center">
            <Trophy className="w-24 h-24 mb-6 text-yellow-500 mx-auto" />
            <h2 className="text-4xl font-bold">You Won!</h2>
            <p className="text-2xl text-gray-600 mt-2">Score: {score}</p>

            <button
              onClick={initGame}
              className="mt-6 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
            >
              Play Again
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MemoryGame;
