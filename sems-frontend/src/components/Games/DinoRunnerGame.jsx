import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 280;
const GROUND_HEIGHT = 40;

export default function DinoRunnerGame({ difficulty, onExit }) {
  const [dinoY, setDinoY] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Refs for mutable values used inside the RAF loop
  const dinoYRef = useRef(0);
  const vyRef = useRef(0); // vertical velocity (px/s), positive = up
  const obstaclesRef = useRef([]);
  const scoreRef = useRef(0);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(0);
  const spawnTimerRef = useRef(0);

  const DINO_LEFT = 60;
  const DINO_WIDTH = 72;
  const DINO_HEIGHT = 64;
  const OB_WIDTH = 48;
  const OB_HEIGHT = 48;

  const GRAVITY = 3000; // px/s^2
  const JUMP_V = 900; // px/s
  const obstacleSpeed = difficulty === "easy" ? 300 : 450; // px/s
  const spawnInterval = difficulty === "easy" ? 1.8 : 1.3; // seconds

  // Keep refs in sync with state when state changes externally
  useEffect(() => {
    dinoYRef.current = dinoY;
  }, [dinoY]);
  useEffect(() => {
    obstaclesRef.current = obstacles;
  }, [obstacles]);
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  // Main game loop (time-based)
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    lastTimeRef.current = performance.now();

    const loop = (time) => {
      const dt = Math.max(0, (time - lastTimeRef.current) / 1000);
      lastTimeRef.current = time;

      // Physics: apply gravity
      vyRef.current = vyRef.current - GRAVITY * dt; // gravity pulls down

      // Integrate position
      dinoYRef.current = Math.max(0, dinoYRef.current + vyRef.current * dt);

      // If landed, zero velocity
      if (dinoYRef.current === 0 && vyRef.current < 0) vyRef.current = 0;

      // Move obstacles
      const moved = obstaclesRef.current
        .map((ob) => ({ ...ob, x: ob.x - obstacleSpeed * dt }))
        .filter((ob) => ob.x > -OB_WIDTH - 20);
      obstaclesRef.current = moved;

      // Spawn new obstacles based on timer
      spawnTimerRef.current += dt;
      if (spawnTimerRef.current >= spawnInterval) {
        spawnTimerRef.current = 0;
        const newOb = {
          id: Date.now() + Math.random(),
          x: GAME_WIDTH + 50,
          emoji: Math.random() > 0.5 ? "🌵" : "📦",
        };
        obstaclesRef.current = [...obstaclesRef.current, newOb];
      }

      // Collision detection (bounding-box with small tolerance gap)
      const COLLISION_GAP = 8; // small gap before collision triggers
      for (const ob of obstaclesRef.current) {
        const obLeft = ob.x;
        const obRight = ob.x + OB_WIDTH;
        const dinoLeft = DINO_LEFT;
        const dinoRight = DINO_LEFT + DINO_WIDTH;
        const dinoBottom = GROUND_HEIGHT + dinoYRef.current;
        const dinoTop = dinoBottom + DINO_HEIGHT;
        const obTop = GROUND_HEIGHT + OB_HEIGHT;

        // Add tolerance: collision only if truly overlapping (not just close)
        const horizontalOverlap = obRight > dinoLeft + COLLISION_GAP && obLeft < dinoRight - COLLISION_GAP;
        const verticalOverlap = dinoBottom < obTop - COLLISION_GAP; // small gap before collision

        if (horizontalOverlap && verticalOverlap) {
          // collision
          setGameOver(true);
          setGameStarted(false);
          if (Math.floor(scoreRef.current) > highScore) setHighScore(Math.floor(scoreRef.current));
          break;
        }
      }

      // Score increases with time
      scoreRef.current += dt * 10;

      // Push updates to React state for rendering
      setDinoY(dinoYRef.current);
      setObstacles([...obstaclesRef.current]);
      setScore(Math.floor(scoreRef.current));

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [gameStarted, gameOver, difficulty]);

  // Single key handler (registered once)
  useEffect(() => {
    const handler = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        // jump
        if (!gameStarted) setGameStarted(true);
        if (dinoYRef.current === 0) vyRef.current = JUMP_V;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [gameStarted]);

  // Tap/click to jump
  const jump = () => {
    if (!gameStarted) setGameStarted(true);
    if (dinoYRef.current === 0) vyRef.current = JUMP_V;
  };

  const restart = () => {
    // reset refs and state
    vyRef.current = 0;
    dinoYRef.current = 0;
    obstaclesRef.current = [];
    scoreRef.current = 0;
    spawnTimerRef.current = 0;
    setObstacles([]);
    setDinoY(0);
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gradient-to-b from-sky-200 to-sky-100">

      {/* HEADER */}
      <div className="bg-white shadow-lg p-5 flex justify-between items-center">
        <div className="flex gap-4 text-2xl font-bold">
          <span className="text-green-700">🦖 Dino Runner</span>
          <span className="px-4 py-2 bg-blue-600 text-white rounded-full">
            Score: {score}
          </span>
          <span className="px-4 py-2 bg-yellow-500 text-white rounded-full">
            High: {highScore}
          </span>
        </div>

        <button
          onClick={onExit}
          className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-full"
          title="Close"
        >
          <X />
        </button>
      </div>

      {/* GAME AREA */}
      <div className="flex justify-center items-end flex-1 relative">
        <div
          className="relative bg-[#e7f5ff] border border-blue-300 rounded-xl shadow-xl"
          style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
          onClick={jump}
        >
          {/* GROUND */}
          <div
            className="absolute w-full bg-green-600"
            style={{
              bottom: 0,
              height: `${GROUND_HEIGHT}px`,
            }}
          />

          {/* DINO */}
          <motion.div
            className="absolute text-6xl"
            style={{
              left: `${DINO_LEFT}px`,
              bottom: `${GROUND_HEIGHT + dinoY}px`,
            }}
            animate={{ rotate: dinoY > 0 ? -8 : 0 }}
          >
            🦖
          </motion.div>

          {/* OBSTACLES */}
          {obstacles.map((ob) => (
            <div
              key={ob.id}
              className="absolute text-5xl"
              style={{
                bottom: `${GROUND_HEIGHT}px`,
                left: `${ob.x}px`,
                width: `${OB_WIDTH}px`,
                height: `${OB_HEIGHT}px`,
              }}
            >
              {ob.emoji}
            </div>
          ))}

          {/* CLOUDS */}
          <motion.div
            className="absolute top-12 text-6xl opacity-60"
            animate={{ x: [-200, GAME_WIDTH + 200] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            ☁️
          </motion.div>
        </div>

        {/* START OVERLAY */}
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white p-10 rounded-3xl text-center shadow-2xl">
              <h2 className="text-4xl font-bold mb-4">🦖 Dino Runner</h2>
              <p className="text-lg mb-4">Press SPACE or TAP to Jump</p>
              <button
                onClick={() => setGameStarted(true)}
                className="px-8 py-3 bg-green-600 text-white rounded-xl"
                title="Start game"
              >
                START
              </button>
            </div>
          </div>
        )}

        {/* GAME OVER */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-10 rounded-3xl text-center shadow-2xl">
              <div className="text-7xl mb-4">💀</div>
              <h3 className="text-4xl font-bold">Game Over</h3>
              <p className="text-xl my-4">Score: {score}</p>

              <button
                onClick={restart}
                className="px-10 py-4 bg-blue-600 text-white rounded-2xl text-xl"
                title="Play again"
              >
                PLAY AGAIN
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}