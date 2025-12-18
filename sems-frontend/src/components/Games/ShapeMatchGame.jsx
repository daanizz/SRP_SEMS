import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const shapes = [
  { id: "circle", icon: "⚫" },
  { id: "square", icon: "⬛" },
  { id: "triangle", icon: "🔺" },
  { id: "star", icon: "⭐" }
];

const ShapeMatchGame = ({ difficulty, onExit }) => {
  const activeShapes = difficulty === "easy" ? shapes.slice(0, 2) : shapes;

  const [target, setTarget] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    nextRound();
  }, []);

  const nextRound = () => {
    const t = activeShapes[Math.floor(Math.random() * activeShapes.length)];
    setTarget(t);

    const arr = [...activeShapes].sort(() => Math.random() - 0.5);
    setOptions(arr);
    setFeedback("");
  };

  const handleClick = (shape) => {
    if (shape.id === target.id) {
      setScore(score + 1);
      setFeedback("correct");
      setTimeout(() => nextRound(), 1000);
    } else {
      setFeedback("wrong");
      setTimeout(() => setFeedback(""), 1000);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-100 to-blue-200 flex flex-col z-50">
      {/* Header */}
      <div className="flex justify-between bg-white shadow p-6">
        <h2 className="text-3xl font-bold text-purple-600">Shape Match</h2>
        <div className="flex gap-3">
          <div className="px-4 py-2 rounded-full text-xl font-bold bg-green-600 text-white">
            Score: {score}
          </div>
          <button onClick={onExit} className="p-3 bg-red-500 rounded-full text-white">
            <X />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col items-center justify-center gap-14">
        <div className="text-6xl">Match this:</div>

        <motion.div className="text-8xl">{target?.icon}</motion.div>

        <div className="grid grid-cols-2 gap-10">
          {options.map((shape, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleClick(shape)}
              className="w-40 h-40 flex items-center justify-center text-6xl rounded-3xl bg-white shadow-2xl"
            >
              {shape.icon}
            </motion.button>
          ))}
        </div>

        {feedback === "correct" && <div className="text-6xl">🎉</div>}
        {feedback === "wrong" && <div className="text-6xl">❌</div>}
      </div>
    </div>
  );
};

export default ShapeMatchGame;
