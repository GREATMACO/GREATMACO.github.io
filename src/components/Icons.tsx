/**
 * Custom icon set for 404 Collective.
 * Theme: breaking free from digital grids, returning to something organic.
 * Style: thin-line, minimalist, with amber/emerald accents.
 */

type IconProps = {
  className?: string;
  color?: string;
};

/** Broken ring — focus mode / breaking the loop */
export function IconFocus({ className = "w-8 h-8", color = "currentColor" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="10" stroke={color} strokeWidth="1.5" strokeDasharray="14 8" strokeLinecap="round" opacity="0.5" />
      <path d="M22 10.5C22 10.5 24 12 23 14C22 16 19 16 19 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 12V16M16 16L13 19M16 16L19 19" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Neural spark — AI coach / awareness */
export function IconCoach({ className = "w-8 h-8", color = "currentColor" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="8" r="2" stroke={color} strokeWidth="1.5" />
      <circle cx="8" cy="22" r="2" stroke={color} strokeWidth="1.5" />
      <circle cx="24" cy="22" r="2" stroke={color} strokeWidth="1.5" />
      <circle cx="16" cy="16" r="2.5" stroke={color} strokeWidth="1.5" />
      <line x1="16" y1="10" x2="16" y2="13.5" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="16" y1="18.5" x2="16" y2="20" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="13.5" y1="16" x2="10" y2="20" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="18.5" y1="16" x2="22" y2="20" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M14 16C14 14 16 12 16 12C16 12 18 14 18 16" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

/** Emergent path — real-world quests / leaving the grid */
export function IconQuest({ className = "w-8 h-8", color = "currentColor" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="8" height="8" rx="1" stroke={color} strokeWidth="1" opacity="0.3" />
      <rect x="14" y="4" width="8" height="8" rx="1" stroke={color} strokeWidth="1" opacity="0.3" />
      <rect x="4" y="14" width="8" height="8" rx="1" stroke={color} strokeWidth="1" opacity="0.3" />
      <rect x="14" y="14" width="8" height="8" rx="1" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M22 18C22 18 26 16 28 18C30 20 28 24 26 24" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 18L26 16M28 18L26 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Connected nodes — collective / community */
export function IconCollective({ className = "w-8 h-8", color = "currentColor" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="2" fill={color} opacity="0.3" />
      <circle cx="22" cy="10" r="2" fill={color} opacity="0.3" />
      <circle cx="16" cy="22" r="2" fill={color} opacity="0.3" />
      <circle cx="16" cy="16" r="3" stroke={color} strokeWidth="1.5" fill="none" />
      <line x1="12" y1="12" x2="14" y2="14" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="20" y1="12" x2="18" y2="14" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="14" y1="18" x2="14" y2="20" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

/** Rising organic curve — metrics / growth */
export function IconMetrics({ className = "w-8 h-8", color = "currentColor" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="6" y1="26" x2="26" y2="26" stroke={color} strokeWidth="1" opacity="0.2" />
      <line x1="6" y1="6" x2="6" y2="26" stroke={color} strokeWidth="1" opacity="0.2" />
      <path d="M6 22C6 22 10 18 14 18C18 18 22 22 26 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="14" cy="18" r="2" stroke={color} strokeWidth="1" fill="none" />
      <path d="M26 10L24 12M26 10L24 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Shared circle — therapist collaboration */
export function IconTherapist({ className = "w-8 h-8", color = "currentColor" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="13" cy="16" r="7" stroke={color} strokeWidth="1.5" fill="none" opacity="0.4" />
      <circle cx="19" cy="16" r="7" stroke={color} strokeWidth="1.5" fill="none" opacity="0.4" />
      <path d="M16 12C16 12 14 16 16 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="16" r="2" fill={color} opacity="0.6" />
    </svg>
  );
}

/** Grid breaking — hero / manifesto */
export function IconBreak({ className = "w-8 h-8", color = "currentColor" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 6L26 26" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 6V10" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      <path d="M18 6V10" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      <path d="M26 6V10" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      <path d="M6 14L10 14" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      <path d="M14 14L18 14" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      <path d="M22 14L26 14" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      <path d="M6 22L10 22" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      <path d="M14 22L18 22" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      <path d="M22 22L26 22" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    </svg>
  );
}

/** Open door — CTA */
export function IconDoor({ className = "w-8 h-8", color = "currentColor" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 6L6 26" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 6C10 6 16 8 16 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 26C10 26 16 24 16 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 10C22 10 26 14 26 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path d="M26 18L28 16M26 18L28 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

/** Book — reading / learning */
export function IconBook({ className = "w-8 h-8", color = "currentColor" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 8C6 8 10 6 16 8C22 6 26 8 26 8V24C26 24 22 22 16 24C10 22 6 24 6 24V8Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="16" y1="8" x2="16" y2="24" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="9" y1="12" x2="13" y2="12" stroke={color} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      <line x1="9" y1="15" x2="13" y2="15" stroke={color} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      <line x1="19" y1="12" x2="23" y2="12" stroke={color} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      <line x1="19" y1="15" x2="23" y2="15" stroke={color} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

/** Leaf — growth / organic */
export function IconLeaf({ className = "w-8 h-8", color = "currentColor" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 28C16 28 6 20 6 12C6 6 16 4 26 8C30 10 28 20 24 24C22 26 16 28 16 28Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M16 28L16 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 16L12 13" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      <path d="M16 20L20 17" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    </svg>
  );
}

/** Eye / awareness — mental health */
export function IconEye({ className = "w-8 h-8", color = "currentColor" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 16C4 16 8 8 16 8C24 8 28 16 28 16C28 16 24 24 16 24C8 24 4 16 4 16Z" stroke={color} strokeWidth="1.5" />
      <circle cx="16" cy="16" r="3" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="16" cy="16" r="1" fill={color} opacity="0.6" />
    </svg>
  );
}
