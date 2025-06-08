'use client';

import React from 'react';
import Image from 'next/image';

const TrackList = ({ tracks, emotion }) => {
  if (!tracks?.length) return null;

  const getImageUrl = (track) => track.album?.cover_medium || null;

  const getEmoji = () => {
    const emojiMap = {
      happy: '😊',
      sad: '😢',
      energetic: '⚡',
      calm: '🧘',
      romantic: '💖',
      angry: '😠',
      default: '🎵'
    };
    return emotion ? emojiMap[emotion.toLowerCase()] || emojiMap.default : '';
  };
  const getTrackMeta = (track) => {
    const seed = track.id.toString().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const duration = `${(seed % 4) + 1}:${(seed % 60).toString().padStart(2, '0')}`;
    const plays = `${(seed % 400 + 100)}K plays`;
    return { duration, plays };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            {emotion ? `${emotion} ` : 'Recommended '}Tracks {getEmoji()}
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            Curated just for you, based on your vibe today.
          </p>
        </div>
        <span className="mt-4 md:mt-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-md">
          {tracks.length} Tracks
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tracks.map((track) => {
          const imageUrl = getImageUrl(track);
          const { duration, plays } = getTrackMeta(track);

          return (
            <div
              key={track.id}
              className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transform transition-all hover:-translate-y-1"
            >
              <div className="relative aspect-square">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={track.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-xl transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center text-4xl text-gray-500">
                    🎵
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-lg font-semibold truncate">
                      {track.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1 truncate">
                      {track.artist.name}
                    </p>
                  </div>
                  <a
                    href={track.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 bg-gray-700 hover:bg-gray-600 p-2 rounded-full text-blue-400 transition-colors"
                    title="Open in Deezer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>

                <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
                  <div className="flex gap-2">
                    <span className="bg-gray-800 px-2 py-1 rounded">{duration}</span>
                    <span className="bg-gray-800 px-2 py-1 rounded">{plays}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackList;
