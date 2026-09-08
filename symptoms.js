// Each symptom carries a small base weight, plus optional follow-up
// questions that only appear once the symptom itself is selected — the
// wizard never asks about a follow-up for something the user didn't pick.
//
// A follow-up marked redFlag: true means "yes" to it should short-circuit
// the whole score and force an Emergency result, regardless of anything
// else selected. These are deliberately conservative and simplified for
// demo purposes — see the disclaimer in the UI.

export const SYMPTOM_CATALOG = [
  {
    category: 'Chest & breathing',
    symptoms: [
      {
        id: 'chest_pain',
        label: 'Chest pain or pressure',
        baseWeight: 3,
        followUps: [
          { id: 'cp_breath', question: 'Trouble breathing along with it?', weight: 5, redFlag: true },
          { id: 'cp_radiate', question: 'Pain spreading to your arm or jaw?', weight: 4, redFlag: true },
        ],
      },
      {
        id: 'shortness_breath',
        label: 'Shortness of breath',
        baseWeight: 3,
        followUps: [
          { id: 'sb_rest', question: 'Happening even while resting?', weight: 4, redFlag: true },
        ],
      },
      {
        id: 'cough',
        label: 'Persistent cough',
        baseWeight: 1,
        followUps: [
          { id: 'cough_blood', question: 'Coughing up blood?', weight: 5, redFlag: true },
        ],
      },
    ],
  },
  {
    category: 'Head & nervous system',
    symptoms: [
      {
        id: 'headache',
        label: 'Headache',
        baseWeight: 1,
        followUps: [
          { id: 'hd_sudden', question: "Started suddenly, worst of your life?", weight: 5, redFlag: true },
        ],
      },
      {
        id: 'dizziness',
        label: 'Dizziness or fainting',
        baseWeight: 2,
        followUps: [
          { id: 'dz_fainted', question: 'Did you actually lose consciousness?', weight: 4, redFlag: true },
        ],
      },
      {
        id: 'fever',
        label: 'Fever',
        baseWeight: 1,
        followUps: [
          { id: 'fever_temp', question: 'Above 103°F (39.4°C)?', weight: 3, redFlag: false },
          { id: 'fever_stiffneck', question: 'Stiff neck or severe headache with it?', weight: 5, redFlag: true },
        ],
      },
    ],
  },
  {
    category: 'Abdomen & digestive',
    symptoms: [
      {
        id: 'abdominal_pain',
        label: 'Abdominal pain',
        baseWeight: 2,
        followUps: [
          { id: 'ap_severe', question: 'Severe — 8/10 or higher?', weight: 3, redFlag: false },
          { id: 'ap_bloodvomit', question: 'Vomiting blood or black stool?', weight: 5, redFlag: true },
        ],
      },
    ],
  },
  {
    category: 'Skin & injury',
    symptoms: [
      {
        id: 'rash',
        label: 'Skin rash',
        baseWeight: 1,
        followUps: [
          { id: 'rash_spread', question: 'Spreading fast or blistering?', weight: 2, redFlag: false },
        ],
      },
      {
        id: 'wound',
        label: 'Cut or wound',
        baseWeight: 1,
        followUps: [
          { id: 'wound_bleed', question: "Bleeding won't stop after 10 min pressure?", weight: 5, redFlag: true },
        ],
      },
      {
        id: 'joint_pain',
        label: 'Joint or muscle pain',
        baseWeight: 1,
        followUps: [
          { id: 'jp_swollen', question: 'Very swollen, red, or hot to touch?', weight: 2, redFlag: false },
        ],
      },
    ],
  },
]

export function allSymptoms() {
  return SYMPTOM_CATALOG.flatMap((c) => c.symptoms)
}

export function findSymptom(id) {
  return allSymptoms().find((s) => s.id === id)
}
