import React from "react";

type GhibliCloudProps = {
    className?: string;
    opacity?: number;
    id: string;
    isNight: boolean;
};

export const GhibliCloud: React.FC<GhibliCloudProps> = ({
    className,
    opacity = 0.4,
    id,
    isNight = false,
}) => {
    const blurId = `blur-${id}`;
    const grainId = `grain-${id}`;
    const gradId = `grad-${id}`;
    const maskId = `mask-${id}`;
    const gradientStops = isNight
        ? [
              { offset: "0%", color: "#f2f6ff" }, // moonlight highlight
              { offset: "70%", color: "#cfd8e6" }, // blue gray
              { offset: "100%", color: "#b3c0d4" }, // night shadow
          ]
        : [
              { offset: "0%", color: "#ffffff" }, // sun highlight
              { offset: "70%", color: "#fff3e4" },
              { offset: "100%", color: "#f5e6d3" },
          ];

    return (
        <svg
            viewBox="0 0 600 200"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-hidden="true"
        >
            <defs>
                {/* soft blur */}
                <filter id={blurId}>
                    <feGaussianBlur stdDeviation={10} />
                </filter>

                {/* subtle grain */}
                <filter id={grainId}>
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency={0.7}
                        numOctaves={2}
                    />
                    <feColorMatrix type="saturate" values={"0"} />
                    <feComponentTransfer>
                        <feFuncA type="linear" slope={0.035} />
                    </feComponentTransfer>
                </filter>

                {/* vertical soft shading */}
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                    {gradientStops.map((stop, i) => (
                        <stop
                            key={i}
                            offset={stop.offset}
                            stopColor={stop.color}
                        />
                    ))}
                </linearGradient>

                {/* mask to contain grain */}
                <mask id={maskId}>
                    <path
                        fill="white"
                        d="
              M90 130
              C70 90, 120 60, 170 80
              C200 40, 280 40, 310 80
              C360 60, 430 80, 420 120
              C480 140, 440 180, 360 170
              C330 190, 230 190, 200 165
              C140 185, 80 165, 90 130
              Z
            "
                    />
                </mask>
            </defs>

            {/* cloud body */}
            <path
                d="
          M90 130
          C70 90, 120 60, 170 80
          C200 40, 280 40, 310 80
          C360 60, 430 80, 420 120
          C480 140, 440 180, 360 170
          C330 190, 230 190, 200 165
          C140 185, 80 165, 90 130
          Z
        "
                fill={`url(#${gradId})`}
                opacity={opacity}
                filter={`url(#${blurId})`}
            />

            {/* grain overlay (masked) */}
            <g mask={`url(#${maskId})`}>
                <rect
                    width="100%"
                    height="100%"
                    filter={`url(#${grainId})`}
                    opacity={0.35}
                />
            </g>
        </svg>
    );
};
