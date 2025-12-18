// Gradient color + emoji helpers (identical mapping to your file)
export const getTherapyColor = (type) => {
  switch (type) {
    case "Speech Therapy":
      return "from-purple-500 to-purple-600";
    case "Occupational Therapy":
      return "from-blue-500 to-blue-600";
    case "Physiotherapy":
      return "from-green-500 to-green-600";
    default:
      return "from-gray-500 to-gray-600";
  }
};

export const getTherapyIcon = (type) => {
  switch (type) {
    case "Speech Therapy":
      return "🗣️";
    case "Occupational Therapy":
      return "✋";
    case "Physiotherapy":
      return "🏃";
    default:
      return "📋";
  }
};
