import React from "react";
import { Smile, Frown, Meh } from "lucide-react";

export const getMoodIcon = (mood) => {
  switch (mood) {
    case "Happy":
      return <Smile className="w-5 h-5" />;
    case "Sad":
      return <Frown className="w-5 h-5" />;
    case "Neutral":
      return <Meh className="w-5 h-5" />;
    default:
      return <Meh className="w-5 h-5" />;
  }
};

export const getMoodColor = (mood) => {
  switch (mood) {
    case "Happy":
      return "bg-green-500";
    case "Sad":
      return "bg-red-500";
    case "Neutral":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
};

const MoodBadge = ({ mood }) => {
  return (
    <span
      className={`${getMoodColor(
        mood
      )} text-white px-4 py-2 rounded-full text-sm font-medium inline-flex items-center gap-2 shadow-md`}
    >
      {getMoodIcon(mood)}
      {mood}
    </span>
  );
};

export default MoodBadge;
