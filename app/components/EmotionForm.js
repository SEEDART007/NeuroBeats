'use client';

import { useState, useRef } from 'react';

const MAX_CHARACTERS = 500;

export default function EmotionForm({ onSubmit, isLoading }) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);
  const charactersLeft = MAX_CHARACTERS - text.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSubmit(text);
    }
  };

  const handleClear = () => {
    setText('');
    textareaRef.current.focus();
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-xl mx-auto bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 space-y-5"
      aria-label="Emotion analysis form"
    >
      <h2 className="text-2xl font-bold text-white tracking-tight">
        Tell us how you feel ✨
      </h2>

      <div className="relative">
        <label htmlFor="emotion-textarea" className="block text-base font-medium text-gray-200 mb-2">
          How are you feeling today?
        </label>

        <textarea
          ref={textareaRef}
          id="emotion-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write freely about your thoughts, emotions, or vibe..."
          className="w-full p-4 bg-white/5 text-white placeholder-gray-400 border border-white/20 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition duration-200"
          rows={5}
          required
          disabled={isLoading}
          maxLength={MAX_CHARACTERS}
          aria-describedby="character-counter"
        />

        <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
          <span id="character-counter">
            {charactersLeft === MAX_CHARACTERS
              ? `${MAX_CHARACTERS} characters allowed`
              : `${charactersLeft} characters left`}
          </span>

          {text.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="text-purple-400 hover:text-purple-300 transition-colors duration-200 font-medium"
              aria-label="Clear text"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || text.trim().length === 0}
        className={`w-full py-3 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-3
          transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-800
          ${
            isLoading || text.trim().length === 0
              ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-500 via-indigo-600 to-purple-700 hover:brightness-110 hover:-translate-y-0.5 shadow-lg hover:shadow-xl text-white'
          }`}
        aria-busy={isLoading}
      >
        {isLoading ? (
          <>
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            Analyzing...
          </>
        ) : (
          'Get Music Recommendations 🎵'
        )}
      </button>
    </form>
  );
}
