export default function FollowUpForm({ followUps, answers, onAnswer, onBack, onNext }) {
  return (
    <div>
      <p className="form-line">Section B — a nurse would ask these next.</p>

      <div className="followup-list">
        {followUps.map((f) => (
          <div className="followup-row" key={f.id}>
            <p className="followup-question">
              <span className="followup-context">{f.symptomLabel}:</span> {f.question}
            </p>
            <div className="yn-group">
              <button
                type="button"
                className={`yn-circle ${answers[f.id] === true ? 'circled' : ''}`}
                onClick={() => onAnswer(f.id, true)}
              >
                Yes
              </button>
              <button
                type="button"
                className={`yn-circle ${answers[f.id] === false ? 'circled' : ''}`}
                onClick={() => onAnswer(f.id, false)}
              >
                No
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="form-actions">
        <button type="button" className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <button type="button" className="proceed-btn" onClick={onNext}>
          See result →
        </button>
      </div>
    </div>
  )
}
