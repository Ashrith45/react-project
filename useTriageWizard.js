import { useMemo, useState } from 'react'
import { followUpsForSelection, computeTriage } from '../utils/triage'

export function useTriageWizard() {
  const [step, setStep] = useState('select') // 'select' | 'followups' | 'result'
  const [selected, setSelected] = useState(new Set())
  const [answers, setAnswers] = useState({})

  const followUps = useMemo(() => followUpsForSelection([...selected]), [selected])

  function toggleSymptom(id) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function setAnswer(id, value) {
    setAnswers((prev) => ({ ...prev, [id]: value }))
  }

  function goToFollowUps() {
    setStep(followUps.length > 0 ? 'followups' : 'result')
  }

  function goToResult() {
    setStep('result')
  }

  function back() {
    setStep((s) => (s === 'result' ? (followUps.length > 0 ? 'followups' : 'select') : 'select'))
  }

  function reset() {
    setSelected(new Set())
    setAnswers({})
    setStep('select')
  }

  const result = useMemo(
    () => (step === 'result' ? computeTriage([...selected], answers) : null),
    [step, selected, answers],
  )

  return {
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
  }
}
