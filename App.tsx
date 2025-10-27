import React, { useState, useCallback, useRef } from 'react';
import { StoryData } from './types';
import { generateHorrorStory } from './services/geminiService';
import { generateVoiceOver } from './services/voiceService';
import { StoryDisplay } from './components/StoryDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';

const App: React.FC = () => {
  const [storyData, setStoryData] = useState<StoryData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // State for Voiceover (simplified)
  const [isVoiceoverLoading, setIsVoiceoverLoading] = useState<boolean>(false);
  const [voiceoverError, setVoiceoverError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setStoryData(null);
    setAudioUrl(null); 
    setVoiceoverError(null);

    try {
      const story = await generateHorrorStory();
      setStoryData(story);

       setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      const errorMessage = err instanceof Error ? `Generation failed: ${err.message}` : 'An unknown error occurred.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGenerateVoiceover = useCallback(async () => {
    if (!storyData) return;
    
    setIsVoiceoverLoading(true);
    setVoiceoverError(null);
    setAudioUrl(null);

    try {
        const fullNarration = storyData.narrationScript.join('\n\n');
        const url = await generateVoiceOver(fullNarration);
        setAudioUrl(url);
    } catch (err) {
        const errorMessage = err instanceof Error ? `Voice generation failed: ${err.message}` : 'An unknown error occurred during voice generation.';
        setVoiceoverError(errorMessage);
        console.error(err);
    } finally {
        setIsVoiceoverLoading(false);
    }
  }, [storyData]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 font-mono p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8 border-b-2 border-teal-500/30 pb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
            🎬 Cinematic Horror Story Generator
          </h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Produce a studio-ready deliverable for your next TikTok horror story.
          </p>
        </header>

        <main className="text-center">
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="bg-teal-500 hover:bg-teal-400 text-gray-900 font-bold py-3 px-8 rounded-lg shadow-lg shadow-teal-500/20 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100"
          >
            {isLoading ? 'Generating Script...' : 'Generate Story Script'}
          </button>

          <div className="mt-8">
            {isLoading && <LoadingSpinner message="Generating Cinematic Script..." />}
            {error && <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg">{error}</div>}
          </div>
        </main>
        
        <div ref={resultsRef}>
          {storyData && (
            <StoryDisplay 
                data={storyData}
                onGenerateVoiceover={handleGenerateVoiceover}
                isVoiceoverLoading={isVoiceoverLoading}
                voiceoverError={voiceoverError}
                audioUrl={audioUrl}
            />
          )}
        </div>
        
        <footer className="text-center mt-12 text-gray-600 text-sm">
            <p>Powered by Google Gemini. Designed for cinematic professionals.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;