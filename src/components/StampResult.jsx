import { SYMPTOM_CATALOG } from '../data/symptoms'

function HandCheck() {
  return (
    <svg className="hand-check" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3 10.5L8 15L17 4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function SymptomChecklist({ selected, onToggle, onNext }) {
  return (
    <div>
      <p className="form-line">Section A — check anything you're experiencing today.</p>

      {SYMPTOM_CATALOG.map((group) => (
        <fieldset key={group.category} className="symptom-group">
          <legend>{group.category}</legend>
          <div className="checklist">
            {group.symptoms.map((s) => {
              const checked = selected.has(s.id)
              return (
                <button
                  type="button"
                  key={s.id}
                  className={`check-item ${checked ? 'checked' : ''}`}
                  onClick={() => onToggle(s.id)}
                  aria-pressed={checked}
                >
                  <span className="box">{checked && <HandCheck />}</span>
                  {s.label}
                </button>
              )
            })}
          </div>
        </fieldset>
      ))}

      <button type="button" className="proceed-btn" onClick={onNext} disabled={selected.size === 0}>
        Continue →
      </button>
    </div>
  )
}
