import { GoogleGenAI, Type } from "@google/genai";
import { StoryData, Scene, VeoPrompt } from '../types';
import { SETTINGS, ROLES_MAP, LENS_PATTERN, NEGATIVE_PROMPTS } from '../constants';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  console.warn("API_KEY environment variable is not set. Using a placeholder. Please provide a valid key for the app to function.");
}
const ai = new GoogleGenAI({ apiKey: API_KEY });

const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const generateHorrorStory = async (): Promise<StoryData> => {
  const setting = getRandomElement(SETTINGS);
  const { role, jobTitle, wardrobe } = ROLES_MAP[setting];
  const randomId = Math.floor(Math.random() * 99) + 1;
  const characterIdentifier = `${jobTitle} #${randomId}`;

  const prompt = `
    You are an elite cinematic scriptwriter specializing in psychological horror for TikTok, creating a "rule-based" scenario.
    Generate a complete studio-ready script and production plan based on the following parameters:
    - Setting: ${setting}
    - Role: ${role}
    - Character: Southeast Asian male, early 40s, short black hair, gaunt, tired eyes, moody silhouette.

    Your output MUST be a valid JSON object. Do not include any markdown formatting like \`\`\`json.
    
    The JSON object must conform to this schema:
    {
      "title": "A short, ominous, cinematic title.",
      "rules": ["An array of exactly 8 short, imperative rules. Do NOT include prefixes like 'Rule 1:'. Just provide the rule text. The rules should escalate from mild unease to hopelessness. Each rule is a string."],
      "scene_concepts": ["An array of exactly 24 brief, evocative scene concepts, 3 for each of the 8 rules. These should describe an action or a visual related to the corresponding rule."],
      "viral_titles": ["An array of 10 short, ominous, headline-style titles for social media."],
      "viral_hook": "A 1-2 sentence hook for the first 5 seconds of the video, based on the story.",
      "hashtags": ["An array of 10 relevant hashtags."]
    }

    Follow these constraints for the content:
    - The total narration (the 8 rules) must be 120-165 words.
    - The tone must be eerie, cinematic, and psychological, not gory.
  `;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      rules: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      },
      scene_concepts: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      },
      viral_titles: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      },
      viral_hook: { type: Type.STRING },
      hashtags: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    },
    required: ["title", "rules", "scene_concepts", "viral_titles", "viral_hook", "hashtags"]
  };

  const result = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: responseSchema,
      temperature: 1.0,
    }
  });

  const rawJson = result.text.trim();
  const generatedContent = JSON.parse(rawJson);

  // --- Procedurally build the final StoryData object ---
  const formattedRules = generatedContent.rules.map((rule: string, index: number) => `Rule No ${index + 1}: ${rule}`);

  // To build suspense, the "most important" rule will be one of the last three.
  const importantRuleIndex = Math.floor(Math.random() * 3) + 5; // Will be 5, 6, or 7 (for Rule 6, 7, 8)
  const importantRuleNumber = importantRuleIndex + 1;
  const attentionGrabbingLine = `Rule No ${importantRuleNumber} is the most important to follow. Pay close attention.`;

  const narrationScript = [
    `Congratulations. You’ve been hired as ${role} at ${setting}.`,
    attentionGrabbingLine,
    ...formattedRules,
    `Stay calm. Follow the rules. Good luck, ${jobTitle}.`
  ];
  
  const scenes: Scene[] = [];
  // Scene 01-03: Cold Open
  scenes.push({ title: 'Elevator Arrival', description: `teal overhead neon flicker, dense fog, ${characterIdentifier}'s silhouette entering the main door of the ${setting}, soft tungsten desk lamp pool, shallow DOF, cinematic realism.`, ...LENS_PATTERN[0] });
  scenes.push({ title: 'ID Badge Scan', description: `${characterIdentifier} scans ID badge #${randomId} at a security panel. A green light briefly illuminates his tired face.`, ...LENS_PATTERN[1] });
  scenes.push({ title: 'The Empty Workspace', description: 'A slow pan across the eerily quiet and empty workspace. A single monitor hums, casting a cyan glow.', ...LENS_PATTERN[2] });
  
  // Scene 04-27: Script Paragraphs
  generatedContent.scene_concepts.forEach((concept: string, index: number) => {
      const pattern = LENS_PATTERN[(index + 3) % LENS_PATTERN.length];
      scenes.push({
          title: `Rule ${Math.floor(index / 3) + 1} - Scene ${index % 3 + 1}`,
          description: concept,
          ...pattern
      });
  });

  // Scene 28-29: Fallout
  scenes.push({ title: 'A Rule Broken', description: 'A piece of equipment malfunctions violently, its warning light flashing a desperate red against the dominant teal.', ...LENS_PATTERN[0] });
  scenes.push({ title: 'Resigned Fear', description: `Close up on ${characterIdentifier}'s face, eyes wide, reflecting the chaos. He is frozen, realizing his mistake.`, ...LENS_PATTERN[1] });

  // Scene 30: Whisper Outro
  scenes.push({ title: 'Final Glance', description: `Macro shot of the ID badge #${randomId}, slightly askew on his uniform. The name is out of focus, only the number is clear.`, ...LENS_PATTERN[2] });


  const veoPrompts: VeoPrompt[] = scenes.map((scene, index) => {
    const prompt = `${scene.description}, cinematic anime style, teal-cyan neon lighting, tungsten accents, volumetric fog, shallow DOF, cinematic realism, film grain, chromatic aberration, scanlines, desaturated tones, soft vignette, moody atmosphere. Primary: Southeast Asian male, early 40s, short black hair, gaunt, ID#${randomId}, ${wardrobe}, consistent with ${setting}.`;
    const parameters = `--ar 9:16 --style cinematic --lighting teal_neon --camera ${scene.lens} --grain film --depth shallow --vibe eerie --quality ultra --saturation -15 --contrast +10 --fog moderate --vfx_scanlines subtle`;
    return { prompt, parameters };
  });

  const thumbnailPrompt = `${setting} in teal-cyan neon haze, cinematic anime style, warm tungsten pool, ${jobTitle}'s silhouette (male, early 40s, short black hair, ID#${randomId}) half-turned toward camera, monitor glow reflected in eyes, film grain, scanlines, chromatic aberration, shallow DOF, cinematic vignette.`;

  return {
    title: generatedContent.title,
    setting,
    role,
    jobTitle,
    wardrobe,
    narrationScript,
    scenes,
    veoPrompts,
    musicAndSfxNotes: [
        "Ambient Base: A low, continuous mechanical hum or lab drone in the key of C#.",
        "Transitional Cues: Sudden metallic creaks, a sharp hiss of steam, or faint, distant knocking between rule segments.",
        "Emotional Cues: A subtle, deep bass pulse that slowly rises in intensity and frequency with each rule, peaking at rule 8.",
        "Pacing Bed (Optional): An 85 BPM dark ambient track with a simple, repeating synth line to drive the 60-second flow for TikTok.",
        "Mixing Note: Ensure the Voiceover remains clear and intelligible. Sidechain the pacing bed by -4 dB whenever the narrator speaks."
    ],
    voiceoverDirection: [
        "Tone: Deliver the lines in a calm, detached, almost clinical manner. The voice should feel inhumanly professional.",
        "Pacing: Speak at approximately 70% of a normal pace, leaving deliberate, unnerving pauses between phrases.",
        "Breath Beats: Treat each numbered rule as a separate thought. Take a small, audible breath (100-200 ms) before starting each new rule.",
        "Final Line: The final line, 'Good luck...', should be delivered as a soft, almost inaudible whisper, mixed -6 dB below the main VO level."
    ],
    viralTitles: generatedContent.viral_titles,
    viralHook: generatedContent.viral_hook,
    thumbnailPrompt,
    hashtags: generatedContent.hashtags
  };
};