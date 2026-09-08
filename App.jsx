import useTriageWizard from "./useTriageWizard.js";
import ClipboardCard from './components/ClipboardCard'
import SymptomChecklist from './components/SymptomChecklist'
import FollowUpForm from './components/FollowUpForm'
import StampResult from './components/StampResult'
import DisclaimerStrip from './components/DisclaimerStrip'

export default function App() {
  const {
    step,
    selected,
    answers,
    followUps,
    result,
    toggleSymptom,
    setAnswer,
    goToFollowUps,
    goToResult,
    back,
    reset,
  } = useTriageWizard()

  return (
    <div className="app">
      <header className="app-header">
        <p className="kicker">Walk-in Clinic · Form 7B</p>
        <h1>Symptom Triage Slip</h1>
      </header>

      <ClipboardCard>
        {step === 'select' && (
          <SymptomChecklist selected={selected} onToggle={toggleSymptom} onNext={goToFollowUps} />
        )}
        {step === 'followups' && (
          <FollowUpForm
            followUps={followUps}
            answers={answers}
            onAnswer={setAnswer}
            onBack={back}
            onNext={goToResult}
          />
        )}
        {step === 'result' && result && (
          <StampResult result={result} onReset={reset} onBack={back} />
        )}
      </ClipboardCard>

      <DisclaimerStrip />
    </div>
  )
}
