import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const ColorGame = ({ difficulty, onExit }) => {
  const colors = [
    { name: "Red", hex: "#EF4444" },
    { name: "Blue", hex: "#3B82F6" },
    { name: "Green", hex: "#10B981" },
    { name: "Yellow", hex: "#F59E0B" },
    { name: "Purple", hex: "#8B5CF6" },
    { name: "Pink", hex: "#EC4899" },
    { name: "Orange", hex: "#F97316" },
    { name: "Teal", hex: "#14B8A6" },
  ];

  const activeColors = difficulty === "easy" ? colors.slice(0, 4) : colors;
  const [targetColor, setTargetColor] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    newRound();
  }, []);

  const newRound = () => {
    const target = activeColors[Math.floor(Math.random() * activeColors.length)];
    setTargetColor(target);

    const wrongOptions = activeColors
      .filter((c) => c.name !== target.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const allOptions = [...wrongOptions, target].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  };

 const handleSelect = (choice) => {
  if (choice.name === targetColor.name) {
    setScore(score + 1);
    setFeedback("correct");

    setTimeout(() => {
      setFeedback("");   // <-- FIX
      newRound();        // <-- FIX
    }, 700);
  } else {
    setFeedback("wrong");
    setTimeout(() => setFeedback(""), 600);
  }
};


  return (
    <div className="fixed inset-0 bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 flex flex-col z-50">
      <div className="bg-white shadow p-6 flex justify-between">
        <h2 className="text-3xl font-bold text-orange-600">Color Game</h2>

        <button
          onClick={onExit}
          className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Target */}
      <div className="text-center mt-8">
        <h3 className="text-4xl font-bold mb-4">Find the color:</h3>
        <p
          className="text-6xl font-bold"
          style={{ color: targetColor?.hex }}
        >
          {targetColor?.name}
        </p>
      </div>

      {/* Options */}
      <div className="flex-1 flex items-center justify-center mt-10">
        <div className="grid grid-cols-2 gap-8">
          {options.map((c, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSelect(c)}
              className="w-40 h-40 rounded-3xl shadow-xl cursor-pointer"
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>

      {/* Feedback Animations */}
      <AnimatePresence mode="wait">
  {feedback && (
    <motion.div
      key={feedback}
      className="absolute inset-0 flex items-center justify-center text-9xl pointer-events-none"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {feedback === "correct" ? "🎉" : "❌"}
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
};

export default ColorGame;
