import React from 'react';

interface VoiceOverPlayerProps {
  audioUrl: string;
}

export const VoiceOverPlayer: React.FC<VoiceOverPlayerProps> = ({ audioUrl }) => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-2 text-cyan-400">Generated Voiceover:</h4>
      <audio controls src={audioUrl} className="w-full">
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};
