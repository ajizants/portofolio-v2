export default function KalongNurseLogo({ size = 300 }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 600 300"
            width={size}
            height={(size * 300) / 600}
        >
            {/* LEFT WING */}
            <path
                d="
          M70 150
          C120 60, 200 60, 260 130
          C220 120, 200 150, 180 180
          C160 210, 130 230, 90 240
          C130 200, 120 170, 70 150
          Z
        "
                fill="#71717A"
            />

            {/* RIGHT WING */}
            <path
                d="
          M530 150
          C480 60, 400 60, 340 130
          C380 120, 400 150, 420 180
          C440 210, 470 230, 510 240
          C470 200, 480 170, 530 150
          Z
        "
                fill="#71717A"
            />

            {/* BODY */}
            <ellipse cx="300" cy="150" rx="40" ry="45" fill="#E5E7EB" />

            {/* MEDICAL CROSS */}
            <rect x="295" y="130" width="10" height="40" fill="#DC2626" />
            <rect x="280" y="145" width="40" height="10" fill="#DC2626" />

            {/* CODING SYMBOLS */}
            <path
                d="M235 125 L210 150 L235 175"
                stroke="#5887da"
                strokeWidth="20"
                fill="none"
                strokeLinecap="round"
            />
            <path
                d="M365 125 L390 150 L365 175"
                stroke="#5887da"
                strokeWidth="20"
                fill="none"
                strokeLinecap="round"
            />
            <line
                x1="300"
                y1="125"
                x2="300"
                y2="175"
                stroke="#A1A1AA"
                strokeWidth="3"
            />
        </svg>
    );
}
