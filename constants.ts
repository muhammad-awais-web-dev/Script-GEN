
export const SETTINGS = [
  "a remote desert weigh-station",
  "an eerie, underfunded hospital basement",
  "a sprawling, automated warehouse on the outskirts of town",
  "a forgotten subway maintenance tunnel",
  "a high-voltage power substation in a desolate area",
  "a clinical, sterile research lab after hours",
  "a run-down motel on a lonely highway",
  "a small town's empty library at midnight"
];

export const ROLES_MAP: { [key: string]: { role: string, jobTitle: string, wardrobe: string } } = {
  "a remote desert weigh-station": { role: "night-shift weigh station operator", jobTitle: "Operator", wardrobe: "a worn field jacket over a uniform shirt" },
  "an eerie, underfunded hospital basement": { role: "late-night morgue attendant", jobTitle: "Attendant", wardrobe: "standard-issue medical scrubs" },
  "a sprawling, automated warehouse on the outskirts of town": { role: "lone overnight inventory technician", jobTitle: "Technician", wardrobe: "a high-visibility safety vest over a work uniform" },
  "a forgotten subway maintenance tunnel": { role: "solitary track maintenance worker", jobTitle: "Worker", wardrobe: "heavy-duty coveralls and a hard hat" },
  "a high-voltage power substation in a desolate area": { role: "night-shift substation technician", jobTitle: "Technician", wardrobe: "a flame-retardant utility uniform" },
  "a clinical, sterile research lab after hours": { role: "junior lab assistant on cleanup duty", jobTitle: "Assistant", wardrobe: "a pristine white lab coat" },
  "a run-down motel on a lonely highway": { role: "night manager of a secluded motel", jobTitle: "Manager", wardrobe: "a slightly frayed blazer over a collared shirt" },
  "a small town's empty library at midnight": { role: "overnight security guard at the municipal archive", jobTitle: "Guard", wardrobe: "a crisp security guard uniform" }
};


export const LENS_PATTERN: { lens: '24mm' | '35mm' | '85mm' | '100mm_macro'; shotSize: 'wide' | 'medium' | 'close-up' | 'macro' }[] = [
    { lens: '24mm', shotSize: 'wide' },
    { lens: '35mm', shotSize: 'medium' },
    { lens: '85mm', shotSize: 'close-up' },
    { lens: '100mm_macro', shotSize: 'macro' },
];

export const NEGATIVE_PROMPTS = "cartoon, overexposed, saturated colors, text overlay, harsh shadows, flat lighting, fantasy armor, anime lines, smiling faces, cluttered background, out-of-frame composition, low-res, motion blur, double exposure, watermark, logo, text artifacts, mutated hands, extra fingers, deformed limbs, duplicate face.";
