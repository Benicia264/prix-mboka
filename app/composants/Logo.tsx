export default function Logo({ tagline = false }: { tagline?: boolean }) {
  return (
    <span className="flex items-center gap-2 sm:gap-3">
      <svg
        viewBox="0 0 36 40"
        aria-hidden="true"
        className="h-9 w-8 shrink-0 sm:h-[52px] sm:w-[46px]"
      >
        <defs>
          <linearGradient id="logo-degrade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffa31a" />
            <stop offset="1" stopColor="#ff6a00" />
          </linearGradient>
        </defs>
        <path
          d="M18 0C8.06 0 0 8.06 0 18c0 12.5 18 22 18 22s18-9.5 18-22C36 8.06 27.94 0 18 0z"
          fill="url(#logo-degrade)"
        />
        <circle cx="18" cy="17" r="10" fill="white" />
        <g
          transform="translate(11.4 10.4) scale(0.55)"
          fill="none"
          stroke="#ff7a00"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </g>
      </svg>
      <span className="flex flex-col leading-tight">
        <span className="whitespace-nowrap text-xl font-bold text-slate-900 sm:text-3xl">
          Prix <span className="text-[#ff7a00]">Mboka</span>
        </span>
        {tagline && (
          <span className="hidden text-xs text-slate-700 sm:block">
            Comparez. Économisez. Ensemble.
          </span>
        )}
      </span>
    </span>
  );
}