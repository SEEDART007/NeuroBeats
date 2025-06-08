'use client';

import { useState } from 'react';
import EmotionForm from './components/EmotionForm';
import TrackList from './components/TrackList';
import MoodTag from './components/MoodTag';
import { detectEmotion } from './lib/emotion';
import { fetchTracksByMood } from './lib/spotify';

export default function Home() {
  const [tracks, setTracks] = useState([]);
  const [emotionData, setEmotionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (text) => {
    setIsLoading(true);
    setError('');
    setTracks([]);
    setEmotionData(null);

    try {
      const { emotion, score } = await detectEmotion(text);
      setEmotionData({ emotion, score });

      const tracks = await fetchTracksByMood(emotion);
      setTracks(tracks);
    } catch (err) {
      setError('❌ Failed to process your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white px-4 py-12">
      <main className="max-w-6xl mx-auto space-y-12">
        <header className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            NeuroBeats
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto">
            AI-powered music recommendations based on your emotions.
          </p>
        </header>
        <section className="flex justify-center">
          <EmotionForm onSubmit={handleSubmit} isLoading={isLoading} />
        </section>
        {error && (
          <div className="text-center text-red-400 font-medium">
            {error}
          </div>
        )}
        {emotionData && (
          <section className="text-center">
            <MoodTag emotion={emotionData.emotion} score={emotionData.score} />
          </section>
        )}
        <section>
          <TrackList tracks={tracks} emotion={emotionData?.emotion} />
        </section>
        {isLoading && (
          <div className="text-center text-sm text-gray-400 mt-4 animate-pulse">
            Analyzing your emotion and curating the perfect tracks...
          </div>
        )}
        <footer className="pt-12 border-t border-gray-800 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} NeuroBeats — Made with ❤️ for music lovers
        </footer>
      </main>
    </div>
  );
}
