'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MoodTag({ emotion, score }) {
  const [isHovered, setIsHovered] = useState(false);

  const emotionData = {
    joy: {
      name: "Joy",
      icon: "😊",
      color: "from-yellow-400 to-yellow-600",
      barColor: "bg-yellow-400",
      shadow: "shadow-yellow-500/30"
    },
    sadness: {
      name: "Sadness",
      icon: "😢",
      color: "from-blue-400 to-blue-600",
      barColor: "bg-blue-400",
      shadow: "shadow-blue-500/30"
    },
    anger: {
      name: "Anger",
      icon: "😠",
      color: "from-red-500 to-red-700",
      barColor: "bg-red-500",
      shadow: "shadow-red-500/30"
    },
    surprise: {
      name: "Surprise",
      icon: "😲",
      color: "from-green-400 to-green-600",
      barColor: "bg-green-400",
      shadow: "shadow-green-500/30"
    },
    fear: {
      name: "Fear",
      icon: "😨",
      color: "from-purple-500 to-purple-700",
      barColor: "bg-purple-500",
      shadow: "shadow-purple-500/30"
    },
    love: {
      name: "Love",
      icon: "❤️",
      color: "from-pink-500 to-pink-700",
      barColor: "bg-pink-500",
      shadow: "shadow-pink-500/30"
    }
  };

  if (!emotion) return null;

  const emotionInfo = emotionData[emotion] || {
    name: emotion.charAt(0).toUpperCase() + emotion.slice(1),
    icon: "❓",
    color: "from-gray-500 to-gray-700",
    barColor: "bg-gray-500",
    shadow: "shadow-gray-500/30"
  };

  const percentage = (score * 100).toFixed(1);

  return (
    <div className="relative mb-8 w-fit mx-auto">
      <motion.div
        className="relative inline-block cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className={`bg-gradient-to-r ${emotionInfo.color} text-white px-5 py-2.5 rounded-full flex items-center space-x-3 font-semibold backdrop-blur-md ${emotionInfo.shadow}`}>
          <span className="text-xl">{emotionInfo.icon}</span>
          <span>{emotionInfo.name}</span>
          <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full font-bold tracking-wide">
            {percentage}%
          </span>
        </div>
      </motion.div>
      <div className="mt-3 h-2 w-full bg-gray-700/30 rounded-full overflow-hidden shadow-inner">
        <motion.div
          className={`h-full ${emotionInfo.barColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1 }}
        />
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 transform -translate-x-1/2 mt-3 bg-gray-900 text-white text-sm px-4 py-2 rounded-lg shadow-xl z-10"
          >
            <div className="text-sm font-semibold text-center">Emotion Confidence</div>
            <div className="text-xs text-gray-400 text-center mt-1">
              AI is {percentage}% confident in detecting this emotion.
            </div>
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45 z-[-1]"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
