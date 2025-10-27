import React, { useState, useCallback } from 'react';
import { StoryData } from '../types';
import { ClipboardIcon, CheckIcon, DownloadIcon } from './icons/Icons';
import { VoiceOverPlayer } from './VoiceOverPlayer';
import { LoadingSpinner } from './LoadingSpinner';

interface StoryDisplayProps {
  data: StoryData;
  onGenerateVoiceover: () => void;
  isVoiceoverLoading: boolean;
  voiceoverError: string | null;
  audioUrl: string | null;
}

interface SectionProps {
  title: string;
  sectionNumber: number;
  icon?: string;
  children: React.ReactNode;
  onDownload?: () => void;
}

const downloadTextAsFile = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};


const Section: React.FC<SectionProps> = ({ title, sectionNumber, icon = '🧩', children, onDownload }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-6 bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex justify-between items-center bg-gray-800 hover:bg-gray-700/50 transition-colors"
      >
        <h2 className="text-xl font-bold text-teal-400 text-left flex-grow">
          <span className="text-gray-500">{String(sectionNumber).padStart(2, '0')}</span> {icon} {title}
        </h2>
        <div className="flex items-center gap-2">
            {onDownload && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDownload();
                    }}
                    className="p-2 rounded-full hover:bg-gray-600 transition-colors"
                    aria-label={`Download ${title}`}
                    title={`Download ${title}`}
                >
                    <DownloadIcon />
                </button>
            )}
            <span className="text-teal-400 transform transition-transform duration-300 text-2xl leading-none" style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
              ▸
            </span>
        </div>
      </button>
      {isOpen && <div className="p-4 md:p-6 border-t border-gray-700">{children}</div>}
    </div>
  );
};


export const StoryDisplay: React.FC<StoryDisplayProps> = ({ 
    data,
    onGenerateVoiceover,
    isVoiceoverLoading,
    voiceoverError,
    audioUrl
}) => {
  const [copied, setCopied] = useState(false);

  const formatStoryForClipboard = useCallback(() => {
    let text = `🎬 Rule-Based Horror Story – ${data.title}\n\n`;

    text += `🧩 SECTION 1: Story Script (Narration Format)\n🎙 NARRATION SCRIPT\n${data.narrationScript.join('\n\n')}\n\n`;
    
    text += `🎞 SECTION 2: Scene-by-Scene B-Roll Plan\n${data.scenes.map((s, i) => `Scene ${String(i + 1).padStart(2, '0')} — ${s.title}\nDescription: ${s.description} [${s.lens}]`).join('\n\n')}\n\n`;
    
    text += `🖼 SECTION 3: Veo 3 Image Prompts (Optimized)\n${data.veoPrompts.map((p, i) => `Prompt ${i + 1}:\n${p.prompt}\nParameters:\n${p.parameters}`).join('\n\n')}\n\n`;

    text += `🎵 SECTION 4: Music + SFX Design Notes\n${data.musicAndSfxNotes.join('\n')}\n\n`;
    
    text += `🔊 SECTION 5: Voiceover Direction\n${data.voiceoverDirection.join('\n')}\n\n`;
    
    text += `🧠 SECTION 6: Viral Title + Hook Options\nTitles:\n${data.viralTitles.join('\n')}\n\nHook Rewrite:\n${data.viralHook}\n\n`;
    
    text += `🧩 SECTION 7: Thumbnail Prompt\n${data.thumbnailPrompt}\n\n`;
    
    text += `⚠️ SECTION 8: Safety Disclaimer\nThis story and all visual elements are fictional. No real locations, persons, or organizations are depicted. All AI generations follow content safety standards.\n\n`;
    
    text += `🧭 SECTION 9: Export Controls\n[ ] Copy to Notion Template\n[ ] Export as Veo 3 Prompt Bundle\n[ ] Download PDF for Production\n[ ] Copy to Clipboard\n\n`;
    
    text += `SECTION 10: Viral Hashtags\n${data.hashtags.map(h => `#${h}`).join(' ')}\n`;

    return text;
  }, [data]);

  const handleCopyToClipboard = useCallback(() => {
    const textToCopy = formatStoryForClipboard();
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [formatStoryForClipboard]);


  return (
    <div className="mt-10 text-left bg-gray-900/50 p-4 sm:p-6 rounded-lg border-2 border-teal-500/30">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 pb-4 border-b border-gray-700">
            🎬 Rule-Based Horror Story – {data.title}
        </h1>

        <Section 
            title="Story Script (Narration Format)" 
            sectionNumber={1}
            onDownload={() => downloadTextAsFile(data.narrationScript.join('\n\n'), '01_Narration_Script.txt')}
        >
            <h3 className="text-lg font-semibold mb-3 text-cyan-400">🎙 NARRATION SCRIPT</h3>
            <div className="whitespace-pre-wrap space-y-4">
                {data.narrationScript.map((line, index) => <p key={index}>{line}</p>)}
            </div>
        </Section>

        <Section 
            title="Scene-by-Scene B-Roll Plan" 
            sectionNumber={2}
            onDownload={() => downloadTextAsFile(data.scenes.map((s, i) => `Scene ${String(i + 1).padStart(2, '0')} — ${s.title}\nDescription: ${s.description} [${s.lens}]`).join('\n\n'), '02_B-Roll_Plan.txt')}
        >
            {data.scenes.map((scene, index) => (
                <div key={index} className="mb-4 pb-4 border-b border-gray-700/50 last:border-b-0">
                    <h4 className="font-bold text-cyan-400">Scene {String(index + 1).padStart(2, '0')} — {scene.title}</h4>
                    <p className="text-gray-400">Description: {scene.description} <span className="text-teal-400 font-semibold">[{scene.lens}]</span></p>
                </div>
            ))}
        </Section>
        
        <Section 
            title="Veo 3 Image Prompts (Optimized)" 
            sectionNumber={3}
            onDownload={() => downloadTextAsFile(data.veoPrompts.map((p, i) => `Prompt ${i + 1}:\n${p.prompt}\n\nParameters:\n${p.parameters}\n\nNegative Prompts:\n${"cartoon, overexposed, saturated colors, text overlay, harsh shadows, flat lighting, fantasy armor, anime lines, smiling faces, cluttered background, out-of-frame composition, low-res, motion blur, double exposure, watermark, logo, text artifacts, mutated hands, extra fingers, deformed limbs, duplicate face."}`).join('\n\n---\n\n'), '03_Veo_Prompts.txt')}
        >
            {data.veoPrompts.map((prompt, index) => (
                <div key={index} className="mb-4 font-mono text-sm bg-black/30 p-3 rounded">
                    <p className="font-bold text-cyan-400">Prompt {index + 1}:</p>
                    <p className="text-gray-300 my-1">{prompt.prompt}</p>
                    <p className="font-bold text-cyan-400 mt-2">Parameters:</p>
                    <p className="text-teal-300">{prompt.parameters}</p>
                </div>
            ))}
        </Section>

        <Section 
            title="Music + SFX Design Notes" 
            sectionNumber={4}
            onDownload={() => downloadTextAsFile(data.musicAndSfxNotes.join('\n'), '04_Music_SFX_Notes.txt')}
        >
            <ul className="list-disc list-inside space-y-2 text-gray-400">
                {data.musicAndSfxNotes.map((note, i) => <li key={i}>{note}</li>)}
            </ul>
        </Section>

        <Section 
            title="Voiceover Direction" 
            sectionNumber={5}
            onDownload={() => downloadTextAsFile(data.voiceoverDirection.join('\n'), '05_Voiceover_Direction.txt')}
        >
            <ul className="list-disc list-inside space-y-2 text-gray-400">
                {data.voiceoverDirection.map((note, i) => <li key={i}>{note}</li>)}
            </ul>
        </Section>

        <Section 
            title="Viral Title + Hook Options" 
            sectionNumber={6}
            onDownload={() => downloadTextAsFile(`10 Title Options:\n${data.viralTitles.join('\n')}\n\nHook Rewrite (First 5 seconds):\n"${data.viralHook}"`, '06_Viral_Content.txt')}
        >
            <h4 className="font-bold text-cyan-400">10 Title Options:</h4>
            <ul className="list-decimal list-inside my-2 pl-4 text-gray-400">
                {data.viralTitles.map((title, i) => <li key={i}>{title}</li>)}
            </ul>
            <h4 className="font-bold text-cyan-400 mt-4">Hook Rewrite (First 5 seconds):</h4>
            <p className="text-gray-400 italic mt-1">"{data.viralHook}"</p>
        </Section>

        <Section 
            title="Thumbnail Prompt" 
            sectionNumber={7}
            onDownload={() => downloadTextAsFile(data.thumbnailPrompt, '07_Thumbnail_Prompt.txt')}
        >
            <div className="font-mono text-sm bg-black/30 p-3 rounded">
                <p className="font-bold text-cyan-400">Thumbnail Prompt:</p>
                <p className="text-gray-300 mt-1">{data.thumbnailPrompt}</p>
            </div>
        </Section>
        
        <Section title="Safety Disclaimer" sectionNumber={8}>
            <p className="text-sm text-gray-500 italic">This story and all visual elements are fictional. No real locations, persons, or organizations are depicted. All AI generations follow content safety standards.</p>
        </Section>

        <Section title="Export Controls" sectionNumber={9}>
            <div className="space-y-3">
              <label className="flex items-center text-gray-400 cursor-pointer">
                  <input type="checkbox" className="form-checkbox h-5 w-5 bg-gray-700 border-gray-600 text-teal-500 rounded focus:ring-teal-500" />
                  <span className="ml-3">Copy to Notion Template</span>
              </label>
              <label className="flex items-center text-gray-400 cursor-pointer">
                  <input type="checkbox" className="form-checkbox h-5 w-5 bg-gray-700 border-gray-600 text-teal-500 rounded focus:ring-teal-500" />
                  <span className="ml-3">Export as Veo 3 Prompt Bundle</span>
              </label>
              <label className="flex items-center text-gray-400 cursor-pointer">
                  <input type="checkbox" className="form-checkbox h-5 w-5 bg-gray-700 border-gray-600 text-teal-500 rounded focus:ring-teal-500" />
                  <span className="ml-3">Download PDF for Production</span>
              </label>
              <button onClick={handleCopyToClipboard} className="flex items-center text-gray-200 mt-2 p-2 rounded-md bg-teal-600 hover:bg-teal-500 transition-colors">
                  {copied ? <CheckIcon/> : <ClipboardIcon />}
                  <span className="ml-2">{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
              </button>
            </div>
        </Section>

        <Section 
            title="Viral Hashtags" 
            sectionNumber={10}
            onDownload={() => downloadTextAsFile(data.hashtags.map(h => `#${h}`).join(' '), '10_Viral_Hashtags.txt')}
        >
            <p className="text-cyan-300 break-words">
                {data.hashtags.map(h => `#${h}`).join(' ')}
            </p>
        </Section>

        <Section title="Voice Cloning (TTS)" sectionNumber={11} icon="✨">
            <div className="space-y-4">
                 <p className="text-gray-400">
                    Generate a high-quality, clinical-toned voiceover for the narration script using Google's Gemini TTS model.
                </p>
                <button
                    onClick={onGenerateVoiceover}
                    disabled={isVoiceoverLoading}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    {isVoiceoverLoading ? 'Synthesizing...' : 'Generate Voice Clone'}
                </button>
                {isVoiceoverLoading && <LoadingSpinner message="Synthesizing Audio..." />}
                {voiceoverError && <div className="mt-4 p-3 bg-red-900/50 border border-red-700 text-red-300 rounded-lg">{voiceoverError}</div>}
                {audioUrl && !isVoiceoverLoading && !voiceoverError && (
                    <div className="mt-4">
                        <VoiceOverPlayer audioUrl={audioUrl} />
                    </div>
                )}
            </div>
        </Section>
    </div>
  );
};