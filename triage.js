import { findSymptom } from '../data/symptoms'

export const LEVELS = {
  emergency: {
    id: 'emergency',
    label: 'EMERGENCY',
    action: 'Call your local emergency number or get to an ER now.',
  },
  urgent: {
    id: 'urgent',
    label: 'URGENT',
    action: 'Try to be seen within the next few hours — urgent care or ER.',
  },
  routine: {
    id: 'routine',
    label: 'ROUTINE',
    action: 'Book a regular appointment with a doctor in the next few days.',
  },
  'self-care': {
    id: 'self-care',
    label: 'SELF-CARE',
    action: 'Rest, hydrate, and monitor. See a doctor if it gets worse.',
  },
}

// The engine is deliberately simple and transparent: a running score from
// base symptom weights + answered follow-ups, with any single red-flag
// answer overriding the score entirely. Real clinical triage is far more
// nuanced than this — this exists to demonstrate branching logic and
// derived state, not to make real medical decisions. See the in-app
// disclaimer.
export function computeTriage(selectedIds, answers) {
  let score = 0
  let redFlagQuestion = null

  for (const id of selectedIds) {
    const symptom = findSymptom(id)
    if (!symptom) continue
    score += symptom.baseWeight

    for (const followUp of symptom.followUps) {
      if (answers[followUp.id]) {
        score += followUp.weight
        if (followUp.redFlag && !redFlagQuestion) {
          redFlagQuestion = followUp.question
        }
      }
    }
  }

  let levelId
  if (redFlagQuestion) levelId = 'emergency'
  else if (score >= 6) levelId = 'urgent'
  else if (score >= 3) levelId = 'routine'
  else levelId = 'self-care'

  return { level: LEVELS[levelId], score, redFlagQuestion }
}

export function followUpsForSelection(selectedIds) {
  return selectedIds.flatMap((id) => {
    const symptom = findSymptom(id)
    if (!symptom) return []
    return symptom.followUps.map((f) => ({ ...f, symptomLabel: symptom.label }))
  })
}
