import { cn } from "@/lib/utils";

/**
 * PromptXona brend belgisi — bitiruv shapkasi kiygan suhbat pufagi ichida
 * ochiq kitob. Bir xil gradient ID'lari bir necha nusxada takrorlansa ham
 * brauzer birinchisini ishlatadi va barcha nusxalar bir xil ko'rinadi.
 *
 * Bu belgi `app/icon.svg` (favicon) va `app/apple-icon.svg` bilan bir xil
 * bo'lishi kerak — birini o'zgartirsangiz, boshqalarini ham yangilang.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      role="img"
      aria-label="PromptXona"
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient
          id="px-bubble"
          x1="96"
          y1="120"
          x2="424"
          y2="408"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2C6CBB" />
          <stop offset="1" stopColor="#0F3970" />
        </linearGradient>
        <linearGradient
          id="px-tail"
          x1="136"
          y1="400"
          x2="200"
          y2="491"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2A67B6" />
          <stop offset="1" stopColor="#16468C" />
        </linearGradient>
        <linearGradient
          id="px-page"
          x1="256"
          y1="196"
          x2="256"
          y2="322"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EEF2F7" />
          <stop offset="1" stopColor="#BCC7D6" />
        </linearGradient>
      </defs>

      {/* suhbat pufagi dumi */}
      <path d="M136 400h83L136 491Z" fill="url(#px-tail)" />
      {/* suhbat pufagi */}
      <rect
        x="71"
        y="111"
        width="370"
        height="301"
        rx="90"
        fill="url(#px-bubble)"
      />

      {/* ochiq kitob */}
      <path
        d="M136 206C176 202 218 199 256 199V320C218 319 176 310 136 297Z"
        fill="url(#px-page)"
      />
      <path
        d="M376 206C336 202 294 199 256 199V320C294 319 336 310 376 297Z"
        fill="url(#px-page)"
      />
      <rect
        x="254"
        y="203"
        width="4"
        height="112"
        rx="2"
        fill="#16345F"
        opacity=".85"
      />

      {/* bitiruv shapkasi */}
      <path d="M256 21 389 78 256 112 123 78Z" fill="#10294E" />
      <rect x="237" y="127" width="38" height="30" rx="6" fill="#10294E" />
      <path
        d="M386 76C392 98 392 124 391 144"
        stroke="#10294E"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="391" cy="153" r="10" fill="#BFC9D6" />
    </svg>
  );
}
