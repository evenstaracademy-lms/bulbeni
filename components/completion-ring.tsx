export function CompletionRing({ value, size = 148, className = "" }: { value: number; size?: number; className?: string }) {
  const stroke = 10; const radius = (size - stroke) / 2; const circumference = 2 * Math.PI * radius;
  return <div className={`completion-ring ${className}`} style={{ width:size, height:size }} aria-label={`Profile ${value}% complete`}>
    <svg viewBox={`0 0 ${size} ${size}`} aria-hidden="true"><circle className="ring-track" cx={size/2} cy={size/2} r={radius}/><circle className="ring-progress" cx={size/2} cy={size/2} r={radius} strokeDasharray={circumference} strokeDashoffset={circumference*(1-value/100)}/></svg>
    <div><strong>{value}%</strong><span>complete</span></div>
  </div>;
}
