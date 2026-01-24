interface IconProps {
  className?: string;
}

export function XIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function TelegramIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

export function ThreadsIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.182.408-2.256 1.332-3.023.88-.73 2.082-1.146 3.384-1.17 1.278-.026 2.463.254 3.543.772l.05-.012c-.01-.323-.038-.634-.09-.932-.226-1.293-.846-2.27-1.793-2.825-1.012-.593-2.35-.86-3.976-.793l-.138-2.082c1.922-.08 3.565.277 4.887 1.063 1.394.83 2.345 2.132 2.748 3.762.112.458.18.942.217 1.449.666.358 1.254.784 1.758 1.278 1.072 1.052 1.816 2.45 2.08 4.108.417 2.61-.503 5.013-2.596 6.77C18.087 23.196 15.39 24 12.186 24zm.123-8.036c-.781.016-1.462.197-1.97.525-.506.328-.755.765-.722 1.264.03.456.276.853.712 1.136.48.31 1.119.455 1.848.415 1.076-.058 1.887-.455 2.412-1.18.388-.535.635-1.245.72-2.105-.83-.351-1.792-.532-2.87-.532-.044 0-.087 0-.13.002z" />
    </svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.32031 4.75C3.62996 4.75 3.07031 5.30964 3.07031 6C3.07031 6.69036 3.62996 7.25 4.32031 7.25H4.33031C5.02067 7.25 5.58031 6.69036 5.58031 6C5.58031 5.30964 5.02067 4.75 4.33031 4.75H4.32031Z"
        fill="currentColor"
      />
      <path
        d="M8.31055 5.25C7.89633 5.25 7.56055 5.58579 7.56055 6C7.56055 6.41421 7.89633 6.75 8.31055 6.75L20.3105 6.75C20.7248 6.75 21.0605 6.41421 21.0605 6C21.0605 5.58579 20.7248 5.25 20.3105 5.25H8.31055Z"
        fill="currentColor"
      />
      <path
        d="M8.31055 17.25C7.89633 17.25 7.56055 17.5858 7.56055 18C7.56055 18.4142 7.89633 18.75 8.31055 18.75L20.3105 18.75C20.7248 18.75 21.0605 18.4142 21.0605 18C21.0605 17.5858 20.7248 17.25 20.3105 17.25L8.31055 17.25Z"
        fill="currentColor"
      />
      <path
        d="M7.56055 12C7.56055 11.5858 7.89633 11.25 8.31055 11.25L20.3105 11.25C20.7248 11.25 21.0605 11.5858 21.0605 12C21.0605 12.4142 20.7248 12.75 20.3105 12.75L8.31055 12.75C7.89633 12.75 7.56055 12.4142 7.56055 12Z"
        fill="currentColor"
      />
      <path
        d="M3.07031 12C3.07031 11.3096 3.62996 10.75 4.32031 10.75H4.33031C5.02067 10.75 5.58031 11.3096 5.58031 12C5.58031 12.6904 5.02067 13.25 4.33031 13.25H4.32031C3.62996 13.25 3.07031 12.6904 3.07031 12Z"
        fill="currentColor"
      />
      <path
        d="M4.32031 16.75C3.62996 16.75 3.07031 17.3096 3.07031 18C3.07031 18.6904 3.62996 19.25 4.32031 19.25H4.33031C5.02067 19.25 5.58031 18.6904 5.58031 18C5.58031 17.3096 5.02067 16.75 4.33031 16.75H4.32031Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function TokenCoinIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="coinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B9D" />
          <stop offset="100%" stopColor="#E91E8C" />
        </linearGradient>
        <linearGradient id="coinShine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFB8D0" />
          <stop offset="50%" stopColor="#FF6B9D" />
          <stop offset="100%" stopColor="#C91870" />
        </linearGradient>
        <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF0F5" />
          <stop offset="100%" stopColor="#FFD6E5" />
        </linearGradient>
      </defs>
      {/* Outer coin ring with depth */}
      <ellipse cx="100" cy="105" rx="90" ry="90" fill="#C91870" opacity="0.3" />
      <circle cx="100" cy="100" r="90" fill="url(#coinGradient)" />
      <circle cx="100" cy="100" r="85" fill="url(#coinShine)" />
      {/* Inner circle */}
      <circle cx="100" cy="100" r="70" fill="url(#innerGradient)" />
      {/* Stylized Z letter */}
      <path
        d="M60 65H140L60 135H140"
        stroke="url(#coinGradient)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Highlight arc for 3D effect */}
      <path
        d="M40 70 Q20 100 40 130"
        stroke="#FFD6E5"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}

export function CopyIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
