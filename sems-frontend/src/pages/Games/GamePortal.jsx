import React, { useState } from "react";
import { motion } from "framer-motion";

import GameCard from "../../components/Games/GameCard";
import DifficultyModal from "../../components/Games/DifficultyModal";

import ShapeMatchGame from "../../components/Games/ShapeMatchGame";
import MemoryGame from "../../components/Games/MemoryGame";
import ColorGame from "../../components/Games/ColorGame";
import DinoRunnerGame from "../../components/Games/DinoRunnerGame";
import Sidebar from "../../components/Sidebar";


const games = [
  {
    id: "shape-match",
    name: "Shape Match",
    icon: "🔷",
    color: "from-purple-500 to-pink-500",
    description: "Match the correct shape!",
  },
  {
    id: "memory-game",
    name: "Memory Game",
    icon: "🧠",
    color: "from-blue-500 to-cyan-500",
    description: "Find matching pairs!",
  },
  {
    id: "color-game",
    name: "Color Game",
    icon: "🎨",
    color: "from-orange-500 to-red-500",
    description: "Identify the right color!",
  },
  {
    id: "dino-runner",
    name: "Dino Runner",
    icon: "🦖",
    color: "from-green-500 to-emerald-600",
    description: "Jump & survive obstacles!",
  },
];

const GamesPortal = () => {
  const [activeNav, setActiveNav] = useState("games");
  const [selectedGame, setSelectedGame] = useState(null);
  const [showDifficulty, setShowDifficulty] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [pendingGame, setPendingGame] = useState(null);

  const handleGameSelect = (gameId) => {
    setPendingGame(gameId);
    setShowDifficulty(true);
  };

  const startGame = (level) => {
    setDifficulty(level);
    setSelectedGame(pendingGame);
    setShowDifficulty(false);
  };

  const renderGame = () => {
    switch (selectedGame) {
      case "shape-match":
        return (
          <ShapeMatchGame
            difficulty={difficulty}
            onExit={() => setSelectedGame(null)}
          />
        );
      case "memory-game":
        return (
          <MemoryGame
            difficulty={difficulty}
            onExit={() => setSelectedGame(null)}
          />
        );
      case "color-game":
        return (
          <ColorGame
            difficulty={difficulty}
            onExit={() => setSelectedGame(null)}
          />
        );
      case "dino-runner":
        return (
          <DinoRunnerGame
            difficulty={difficulty}
            onExit={() => setSelectedGame(null)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-blue-50">

      {/* ✅ ALWAYS VISIBLE SIDEBAR */}
       <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-auto p-10">
        {!selectedGame && (
          <>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
            >
              Educational Games
            </motion.h1>

            <p className="text-lg text-gray-600 mb-10">
              Fun learning games designed for special education needs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {games.map((game, index) => (
                <GameCard
                  key={game.id}
                  game={game}
                  index={index}
                  onClick={() => handleGameSelect(game.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Difficulty Modal */}
      <DifficultyModal
        open={showDifficulty}
        onClose={() => setShowDifficulty(false)}
        onSelect={startGame}
      />

      {/* Fullscreen Game */}
      {selectedGame && renderGame()}
    </div>
  );
};

export default GamesPortal;
