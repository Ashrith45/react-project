# Symptom Triage Slip 🩺

A branching questionnaire styled as a physical hospital intake form — pick
symptoms on a paper "clipboard," answer only the relevant nurse-style
follow-ups, and get a rule-based urgency result stamped on like actual
rubber ink.

**This is a portfolio demo, not a real medical tool.** The scoring rules
are intentionally simplified. The app says so on every screen — don't
present it as anything else.

## Why it's more than a form

Most "symptom checker" demos are a flat list of checkboxes mapped to one
canned message. This one actually branches:

- Follow-up questions only appear for symptoms you've selected
  (`followUpsForSelection` in `src/utils/triage.js`)
- Certain answers are marked `redFlag: true` (e.g. chest pain + trouble
  breathing) and force an Emergency result immediately, overriding the
  running score entirely
- Otherwise, a running score from base symptom weights + follow-up weights
  decides Urgent / Routine / Self-care

That's the piece worth explaining in an interview: a small rule engine
with an explicit short-circuit path, not just an if/else chain.

## Stack

- React 18 + Vite, no UI library
- All state in a single `useTriageWizard` hook — no routing needed, three
  steps driven by one `step` value

## Running locally

```bash
npm install
npm run dev
```

## Project structure

```
src/
  data/symptoms.js        symptom catalog + follow-up questions + red flags
  utils/triage.js          scoring engine
  hooks/useTriageWizard.js wizard state (step, selections, answers)
  components/
    ClipboardCard.jsx      paper + binder-clip wrapper
    SymptomChecklist.jsx   step 1
    FollowUpForm.jsx       step 2
    StampResult.jsx        step 3, rendered as a rotated stamp
    DisclaimerStrip.jsx    persistent "this is a demo" notice
  App.jsx
  styles.css
```
