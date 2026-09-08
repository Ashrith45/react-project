export default function ClipboardCard({ children }) {
  return (
    <div className="clipboard">
      <svg className="clip" viewBox="0 0 120 60" aria-hidden="true">
        <rect x="10" y="4" width="100" height="18" rx="9" fill="#8a7a63" />
        <rect x="30" y="16" width="60" height="34" rx="6" fill="none" stroke="#8a7a63" strokeWidth="6" />
      </svg>
      <div className="clipboard-page">{children}</div>
    </div>
  )
}
