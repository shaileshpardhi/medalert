interface CircularProgressProps {
  value: number;
}

export const CircularProgress = ({ value }: CircularProgressProps) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative h-32 w-32">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120" aria-label="Daily medicine completion">
        <circle cx="60" cy="60" r={radius} className="stroke-white/10" strokeWidth="12" fill="transparent" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          className="stroke-blue-400 transition-all duration-700"
          strokeWidth="12"
          strokeLinecap="round"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-lg font-semibold text-white">{value}%</div>
    </div>
  );
};
