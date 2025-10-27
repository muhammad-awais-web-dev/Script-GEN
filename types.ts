export interface Scene {
  title: string;
  description: string;
  lens: '24mm' | '35mm' | '85mm' | '100mm_macro';
  shotSize: 'wide' | 'medium' | 'close-up' | 'macro';
}

export interface VeoPrompt {
  prompt: string;
  parameters: string;
}

export interface StoryData {
  title: string;
  setting: string;
  role: string;
  jobTitle: string;
  wardrobe: string;
  narrationScript: string[];
  scenes: Scene[];
  veoPrompts: VeoPrompt[];
  musicAndSfxNotes: string[];
  voiceoverDirection: string[];
  viralTitles: string[];
  viralHook: string;
  thumbnailPrompt: string;
  hashtags: string[];
  audioUrl?: string;
}
