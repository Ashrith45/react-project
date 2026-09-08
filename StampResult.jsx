export default function StampResult({ result, onReset, onBack }) {
  const { level, score, redFlagQuestion } = result

  return (
    <div>
      <p className="form-line">Section C — result.</p>

      <div className={`stamp stamp-${level.id}`}>
        <span className="stamp-label">{level.label}</span>
      </div>

      <p className="stamp-action">{level.action}</p>

      {redFlagQuestion && (
        <p className="redflag-note">
          Flagged because you answered yes to: "{redFlagQuestion}"
        </p>
      )}

      <p className="score-note">Internal score: {score}</p>

      <div className="form-actions">
        <button type="button" className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <button type="button" className="proceed-btn" onClick={onReset}>
          Start new form
        </button>
      </div>
    </div>
  )
}
